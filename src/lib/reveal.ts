import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Group-level scroll reveals. Elements carry `.reveal`; SSG markup is
 * fully visible (the hidden initial state only applies under html.js —
 * see index.css) and this observer flips `.is-in` once per element.
 */
export function useReveals() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (reduced) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}
