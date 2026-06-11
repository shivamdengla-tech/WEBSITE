import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const DOT = 8;
const HOVER = 36;
const MAGNET_RADIUS = 80;
const MAGNET_PULL = 0.35;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Desktop only — touch devices and small screens keep native behaviour
    setEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(max-width: 768px)").matches,
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    // Slight inertia lag on the follow
    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });

    let interactives: { el: Element; cx: number; cy: number }[] = [];
    const collect = () => {
      interactives = Array.from(
        document.querySelectorAll("a, button"),
      ).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      });
    };
    collect();
    let recollect = 0;
    const scheduleCollect = () => {
      window.clearTimeout(recollect);
      recollect = window.setTimeout(collect, 150);
    };
    window.addEventListener("scroll", scheduleCollect, { passive: true });
    window.addEventListener("resize", scheduleCollect);

    const onMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;
      // Magnetic pull toward the nearest interactive element within range
      let best: { d: number; cx: number; cy: number } | null = null;
      for (const it of interactives) {
        const d = Math.hypot(it.cx - x, it.cy - y);
        if (d < MAGNET_RADIUS && (!best || d < best.d)) best = { d, ...it };
      }
      if (best) {
        x += (best.cx - x) * MAGNET_PULL * (1 - best.d / MAGNET_RADIUS);
        y += (best.cy - y) * MAGNET_PULL * (1 - best.d / MAGNET_RADIUS);
      }
      xTo(x);
      yTo(y);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && t.closest("a, button") != null;
    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target))
        gsap.to(dot, { width: HOVER, height: HOVER, duration: 0.25 });
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target))
        gsap.to(dot, { width: DOT, height: DOT, duration: 0.25 });
    };
    const onDown = () => {
      gsap
        .timeline()
        .to(dot, { scale: 1.5, duration: 0.1, ease: "power2.out" })
        .to(dot, { scale: 1, duration: 0.15, ease: "power2.in" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);

    return () => {
      window.clearTimeout(recollect);
      window.removeEventListener("scroll", scheduleCollect);
      window.removeEventListener("resize", scheduleCollect);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference"
      style={{
        width: DOT,
        height: DOT,
        translate: "-50% -50%",
      }}
    />
  );
}
