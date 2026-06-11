import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FLOAT_PERIOD = 3; // seconds per up/down loop
const FLOAT_AMPLITUDE_PX = 2; // pixels of vertical travel
const LOOK_MAX = THREE.MathUtils.degToRad(8); // cursor-parallax limit

export default function AvatarCanvas({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true, // transparent canvas so the hero gradient shows through
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Neutral lights — the warm duotone comes from the .hero-portrait
    // CSS filter, same treatment the original photo had
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(-3, 1, -3);
    scene.add(rimLight);

    // floatGroup handles the vertical idle bob, swayGroup the rotations
    const floatGroup = new THREE.Group();
    const swayGroup = new THREE.Group();
    floatGroup.add(swayGroup);
    scene.add(floatGroup);

    let disposed = false;
    let mixer: THREE.AnimationMixer | null = null;
    new GLTFLoader().load("/avatar.glb", (gltf) => {
      if (disposed) return;
      const model = gltf.scene;

      // Baked-in animations: play the idle clip (or the first one) on loop
      console.log(gltf.animations);
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const idle =
          gltf.animations.find((clip) => /idle|stand/i.test(clip.name)) ??
          gltf.animations[0];
        gltf.animations.forEach((clip) => {
          const action = mixer!.clipAction(clip);
          action.setLoop(THREE.LoopRepeat, Infinity);
          if (clip === idle) action.play();
        });
      }

      // Center the model, then frame head-to-waist (top 58% of the body)
      // to match the crop of the original portrait photo
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const visibleFraction = 0.58;
      const framedHeight = size.y * visibleFraction;
      // Shift the model down so the framed region is centered at the origin
      model.position.y -= (size.y - framedHeight) / 2;
      swayGroup.add(model);

      const halfFov = (camera.fov * Math.PI) / 360;
      const fitHeight = (framedHeight / 2 / Math.tan(halfFov)) * 1.08;
      const fitWidth =
        (size.x / 2 / Math.tan(halfFov) / Math.max(camera.aspect, 0.1)) * 1.05;
      camera.position.set(0, 0, Math.max(fitHeight, fitWidth, size.z));
      camera.lookAt(0, 0, 0);
    });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    // Scroll-linked motion, scrubbed by ScrollTrigger against page scroll:
    // 0-40% of the page rotates Y 0 -> 180deg, 40-60% scales 1 -> 0.6
    const scrollState = { rotY: 0, scale: 1 };
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () =>
          "+=" +
          Math.max(
            1,
            (document.documentElement.scrollHeight - window.innerHeight) * 0.6,
          ),
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    scrollTl
      .to(scrollState, { rotY: Math.PI, duration: 40, ease: "none" }, 0)
      .to(scrollState, { scale: 0.6, duration: 20, ease: "none" }, 40);

    // Cursor parallax (window-level, the canvas stays pointer-events: none),
    // normalized to -1..1 around the viewport center. On touch devices the
    // gyroscope drives it instead.
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointer = new THREE.Vector2(0, 0);
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const trackPoint = (clientX: number, clientY: number) => {
      pointerTarget.set(
        (clientX / window.innerWidth) * 2 - 1,
        (clientY / window.innerHeight) * 2 - 1,
      );
    };
    const onMouseMove = (e: MouseEvent) => trackPoint(e.clientX, e.clientY);
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      pointerTarget.set(
        THREE.MathUtils.clamp(e.gamma / 30, -1, 1),
        THREE.MathUtils.clamp((e.beta - 45) / 30, -1, 1),
      );
    };
    const onPointerEnd = () => pointerTarget.set(0, 0);
    if (finePointer) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerEnd);
    } else if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onOrientation, {
        passive: true,
      });
    }

    const clock = new THREE.Clock();
    let elapsed = 0;
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      elapsed += delta;

      // Drive the baked GLB animation
      mixer?.update(delta);

      // Idle float: convert the pixel amplitude into world units at the camera
      const visibleHeight =
        2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const worldPerPixel = visibleHeight / (container.clientHeight || 1);
      floatGroup.position.y =
        Math.sin((elapsed * Math.PI * 2) / FLOAT_PERIOD) *
        FLOAT_AMPLITUDE_PX *
        worldPerPixel;

      // Whole-model tilt (no bone manipulation): scroll rotation + parallax
      pointer.lerp(pointerTarget, 0.06);
      swayGroup.rotation.y = scrollState.rotY + pointer.x * LOOK_MAX;
      swayGroup.rotation.x = pointer.y * LOOK_MAX * 0.6;
      swayGroup.scale.setScalar(scrollState.scale);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onOrientation);
      document.documentElement.removeEventListener("mouseleave", onPointerEnd);
      mixer?.stopAllAction();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          materials.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="3D avatar of Shivam Dengla"
      role="img"
    />
  );
}
