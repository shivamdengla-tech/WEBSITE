import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const FLOAT_PERIOD = 3; // seconds per up/down loop
const FLOAT_AMPLITUDE_PX = 2; // pixels of vertical travel
const SWAY_MAX = THREE.MathUtils.degToRad(15); // auto left-right sway
const SWAY_PERIOD = 6; // seconds for a full sway cycle
const LOOK_MAX = THREE.MathUtils.degToRad(10); // cursor-tracking limit

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

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const keyLight = new THREE.DirectionalLight(0xffd9b0, 2.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xff6a2a, 1.4);
    rimLight.position.set(-3, 1, -3);
    scene.add(rimLight);

    // floatGroup handles the vertical idle bob, swayGroup the rotations
    const floatGroup = new THREE.Group();
    const swayGroup = new THREE.Group();
    floatGroup.add(swayGroup);
    scene.add(floatGroup);

    let disposed = false;
    new GLTFLoader().load("/avatar.glb", (gltf) => {
      if (disposed) return;
      const model = gltf.scene;

      // Center the model and frame the camera around it
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      swayGroup.add(model);

      const fitDistance =
        (size.y / 2 / Math.tan((camera.fov * Math.PI) / 360)) * 1.15;
      camera.position.set(0, 0, Math.max(fitDistance, size.z));
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

    // Cursor / touch tracking, normalized to -1..1 around the viewport center
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
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Idle float: convert the pixel amplitude into world units at the camera
      const visibleHeight =
        2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const worldPerPixel = visibleHeight / (container.clientHeight || 1);
      floatGroup.position.y =
        Math.sin((t * Math.PI * 2) / FLOAT_PERIOD) *
        FLOAT_AMPLITUDE_PX *
        worldPerPixel;

      // Smoothly ease the look rotation toward the cursor
      pointer.lerp(pointerTarget, 0.06);
      const sway = Math.sin((t * Math.PI * 2) / SWAY_PERIOD) * SWAY_MAX;
      swayGroup.rotation.y = sway + pointer.x * LOOK_MAX;
      swayGroup.rotation.x = pointer.y * LOOK_MAX * 0.6;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onPointerEnd);
      document.documentElement.removeEventListener("mouseleave", onPointerEnd);
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
