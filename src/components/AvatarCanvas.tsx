import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import "../lib/gsapSetup";

const LOOK_MAX = THREE.MathUtils.degToRad(8); // cursor-parallax limit
const SCROLL_ROT_MAX = Math.PI; // never spin past 180deg
const SCROLL_SCALE_MIN = 0.5; // never disappear completely
const FLOAT_AMPLITUDE = 0.05; // clamped idle bob, world units

export default function AvatarCanvas({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true, // transparent canvas so the hero gradient shows through
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Fade the canvas in once the model is ready instead of popping mid-frame
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 0.6s ease";
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

    const setSize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    setSize();

    let disposed = false;
    let mixer: THREE.AnimationMixer | null = null;
    let loadedModel: THREE.Group | null = null;
    let modelSize: THREE.Vector3 | null = null;

    // Full-body auto-fit: head gets ~15% breathing room at the top,
    // feet land near the bottom, ~10% side padding — never cropped
    const frameModel = () => {
      if (!loadedModel || !modelSize) return;
      const size = modelSize;
      const maxDim = Math.max(size.x, size.y, size.z);
      const halfFov = (camera.fov * Math.PI) / 360;
      const distHeight = (size.y * 1.2) / 2 / Math.tan(halfFov);
      const distWidth =
        (size.x * 1.1) / 2 / (Math.tan(halfFov) * Math.max(camera.aspect, 0.1));
      camera.position.set(
        0,
        0,
        Math.max(maxDim * 1.6, distHeight, distWidth),
      );
      camera.lookAt(0, 0, 0);

      const visible = 2 * Math.tan(halfFov) * camera.position.z;
      // Lift by the float amplitude so the feet never dip below the canvas
      loadedModel.position.y =
        loadedModel.userData.centerOffsetY +
        (visible * 0.35 - size.y / 2) +
        FLOAT_AMPLITUDE;
    };

    const manager = new THREE.LoadingManager(() => {
      if (!disposed) renderer.domElement.style.opacity = "1";
    });
    new GLTFLoader(manager).load("/avatar.glb", (gltf) => {
      if (disposed) return;
      const model = gltf.scene;

      // Baked-in animations: play the idle clip (or the first one) on loop
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

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      model.position.sub(center);
      model.userData.centerOffsetY = model.position.y;

      loadedModel = model;
      modelSize = size;
      swayGroup.add(model);
      frameModel();
    });

    // Re-fit on container resize, debounced 200ms
    let resizeTimer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setSize();
        frameModel();
      }, 200);
    });
    observer.observe(container);

    // Scroll-linked motion, scrubbed by ScrollTrigger against page scroll:
    // 0-40% of the page rotates Y 0 -> 180deg, 40-60% scales 1 -> 0.6.
    // The render loop lerps toward these so there are no instant jumps.
    const scrollState = { rotY: 0, scale: 1 };
    const smooth = { rotY: 0, scale: 1 };
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
      .to(scrollState, { rotY: SCROLL_ROT_MAX, duration: 40, ease: "none" }, 0)
      .to(scrollState, { scale: 0.6, duration: 20, ease: "none" }, 40);

    // Cursor parallax (window-level, the canvas stays pointer-events: none),
    // desktop only — disabled on mobile alongside the other heavy effects
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointer = new THREE.Vector2(0, 0);
    const onMouseMove = (e: MouseEvent) => {
      pointerTarget.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };
    const onPointerEnd = () => pointerTarget.set(0, 0);
    const parallaxEnabled =
      !isMobile && window.matchMedia("(pointer: fine)").matches;
    if (parallaxEnabled) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerEnd);
    }

    const clock = new THREE.Clock();
    let elapsed = 0;
    let lastFrame = 0;
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      // Cap at 60fps so high-refresh displays don't burn extra frames
      const now = performance.now();
      if (now - lastFrame < 16) return;
      lastFrame = now;

      const delta = clock.getDelta();
      elapsed += delta;

      // Drive the baked GLB animation
      mixer?.update(delta);

      // Clamped idle float and sway — small world units, never off-screen
      floatGroup.position.y = Math.sin(elapsed * 0.8) * FLOAT_AMPLITUDE;
      const sway = Math.sin(elapsed * 0.4) * 0.15;

      // Ease scroll values and clamp them hard
      smooth.rotY = THREE.MathUtils.clamp(
        THREE.MathUtils.lerp(smooth.rotY, scrollState.rotY, 0.1),
        0,
        SCROLL_ROT_MAX,
      );
      smooth.scale = THREE.MathUtils.clamp(
        THREE.MathUtils.lerp(smooth.scale, scrollState.scale, 0.1),
        SCROLL_SCALE_MIN,
        1,
      );

      pointer.lerp(pointerTarget, 0.06);
      swayGroup.rotation.y = smooth.rotY + sway + pointer.x * LOOK_MAX;
      swayGroup.rotation.x = pointer.y * LOOK_MAX * 0.6;
      swayGroup.scale.setScalar(smooth.scale);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
      window.removeEventListener("mousemove", onMouseMove);
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
