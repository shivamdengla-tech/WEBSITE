import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const SWAY_MAX = THREE.MathUtils.degToRad(6); // gentle auto left-right sway
const SWAY_PERIOD = 8; // seconds for a full sway cycle
const LOOK_MAX = THREE.MathUtils.degToRad(12); // cursor-tracking rotation limit
const FRAME_PADDING = 1.32; // headroom so the jump stays inside the frame

export default function AvatarCanvas({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      alpha: true, // transparent canvas so the hero gradient shows through
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // filmic, premium falloff
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Soft, warm three-point lighting tuned to the ember hero
    scene.add(new THREE.HemisphereLight(0xfff1e0, 0x2a0d04, 0.9));
    const keyLight = new THREE.DirectionalLight(0xffe9d0, 2.4);
    keyLight.position.set(2.5, 4, 4);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xff7a32, 2.2);
    rimLight.position.set(-3.5, 2, -4);
    scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-2, 1, 3);
    scene.add(fillLight);

    // swayGroup carries the model so rotations pivot around its centre
    const swayGroup = new THREE.Group();
    scene.add(swayGroup);

    let mixer: THREE.AnimationMixer | undefined;
    let modelSize = new THREE.Vector3(1, 2, 1);

    // Fit the camera to the model's height (or width) with headroom for the jump
    const frame = () => {
      const fitH = modelSize.y / 2 / Math.tan((camera.fov * Math.PI) / 360);
      const fitW =
        modelSize.x / 2 / Math.tan((camera.fov * Math.PI) / 360) / camera.aspect;
      const dist = Math.max(fitH, fitW) * FRAME_PADDING;
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);
    };

    let disposed = false;
    new GLTFLoader().load("/avatar.glb", (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) o.frustumCulled = false; // jump can exit bbox
      });

      // Centre the model on all axes so it sits dead-centre in the frame
      const box = new THREE.Box3().setFromObject(model);
      modelSize = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      swayGroup.add(model);

      frame();

      // Play the avatar's baked animation (the idle/jump motion)
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
      }
    });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      frame();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    // Cursor / touch tracking, normalised to -1..1 around the viewport centre
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointer = new THREE.Vector2(0, 0);
    const trackPoint = (clientX: number, clientY: number) => {
      pointerTarget.set(
        (clientX / window.innerWidth) * 2 - 1,
        (clientY / window.innerHeight) * 2 - 1,
      );
    };
    const onMouseMove = (e: MouseEvent) => trackPoint(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) trackPoint(t.clientX, t.clientY);
    };
    const onPointerEnd = () => pointerTarget.set(0, 0);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onPointerEnd);
    document.documentElement.addEventListener("mouseleave", onPointerEnd);

    const clock = new THREE.Clock();
    let elapsed = 0;
    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      elapsed += dt;
      if (mixer) mixer.update(dt);

      // Smoothly ease the look rotation toward the cursor, plus a slow idle sway
      pointer.lerp(pointerTarget, 0.05);
      const sway = Math.sin((elapsed * Math.PI * 2) / SWAY_PERIOD) * SWAY_MAX;
      swayGroup.rotation.y = sway + pointer.x * LOOK_MAX;
      swayGroup.rotation.x = pointer.y * LOOK_MAX * 0.35;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onPointerEnd);
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
