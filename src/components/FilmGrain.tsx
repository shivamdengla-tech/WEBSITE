import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const turbulence = turbulenceRef.current;
    if (!turbulence) return;
    let frame = 0;
    let last = 0;
    const start = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      // Throttle to ~12fps and drift the frequency slowly: living grain
      // without burning the main thread
      if (now - last < 80) return;
      last = now;
      const t = (now - start) / 1000;
      const freq = 0.8 + Math.sin(t * 0.7) * 0.05;
      turbulence.setAttribute("baseFrequency", `${freq}`);
      turbulence.setAttribute("seed", `${Math.floor(t * 12) % 100}`);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

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
