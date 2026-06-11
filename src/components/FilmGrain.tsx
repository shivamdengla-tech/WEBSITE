import { useEffect, useRef, useState } from "react";

export default function FilmGrain() {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Film grain is desktop-only; it's pure overhead on mobile GPUs
    setEnabled(!window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const turbulence = turbulenceRef.current;
    if (!turbulence) return;

    let frame = 0;
    let last = 0;
    let running = true;
    const start = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      // ~6fps refresh with a slow frequency drift: living grain
      // without burning the main thread
      if (now - last < 160) return;
      last = now;
      const t = (now - start) / 1000;
      const freq = 0.8 + Math.sin(t * 0.35) * 0.05;
      turbulence.setAttribute("baseFrequency", `${freq}`);
      turbulence.setAttribute("seed", `${Math.floor(t * 6) % 100}`);
    };

    const play = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const onVisibility = () => {
      if (document.hidden) pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full opacity-[0.04]"
    >
      <filter id="film-grain">
        <feTurbulence
          ref={turbulenceRef}
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-grain)" />
    </svg>
  );
}
