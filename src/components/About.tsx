import { useEffect, useRef } from "react";

const BODY =
  "I'm a dual-degree student at BITS Pilani, Goa — a chemist by degree and a product person by choice. Most of what I do happens outside the classroom, in two habits that look unrelated until you watch them together: closing deals, and taking industries apart to understand how they actually work. I sell sponsorships for my campus, I've done business development at a startup, and I run a three-thousand-strong community day to day. The rest of my time goes into the decks — long, slightly obsessive breakdowns of why vapes, fragrances, sachets and potato chips are built exactly the way they are. If a market has a hidden logic, I want to find it.";

/**
 * Scroll-linked word reveal. SSG markup renders every word at full
 * opacity; when JS runs, each word's opacity tracks scroll progress with
 * a 35% floor so the paragraph is always readable (the old build used a
 * 12% per-character floor — invisible at rest and ~600 DOM spans; words
 * cut the span count ~5x and never fail contrast).
 */
function ScrollProse({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("span"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0→1 as the paragraph travels from 85% to 40% of viewport
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.45)));
      const lit = Math.floor(p * words.length);
      words.forEach((w, i) => {
        w.style.setProperty("--p", i < lit ? "1" : "0");
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p
      ref={ref}
      className="word-reveal max-w-[36ch] font-serif text-xl text-cream sm:text-2xl"
    >
      {text.split(" ").map((word, i) => (
        <span key={i}>{word} </span>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-x-6 px-6 py-24 sm:px-10 md:py-32">
        <div className="reveal col-span-12 md:col-span-3">
          <p className="font-mono text-label uppercase text-ember">About</p>
          <h2 className="mt-4 text-3xl font-semibold text-cream">
            Reads things nobody assigned
          </h2>
        </div>
        <div className="col-span-12 mt-10 md:col-span-8 md:col-start-5 md:mt-0">
          <ScrollProse text={BODY} />
        </div>
      </div>
    </section>
  );
}
