import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { decks } from "../data/decks";

function Row({
  items,
  progress,
  reverse = false,
}: {
  items: typeof decks;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reverse?: boolean;
}) {
  const x = useTransform(
    progress,
    [0, 1],
    reverse ? ["-12%", "4%"] : ["4%", "-12%"],
  );

  return (
    <motion.div style={{ x }} className="flex w-max gap-5">
      {[...items, ...items].map((deck, i) => (
        <div
          key={`${deck.num}-${i}`}
          className="h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-ember/10 bg-white/5 sm:h-56 sm:w-80"
        >
          <img
            src={deck.cover}
            alt={`${deck.title} deck cover`}
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="space-y-5 overflow-hidden py-20">
      <Row items={decks.slice(0, 3)} progress={scrollYProgress} />
      <Row items={decks.slice(3)} progress={scrollYProgress} reverse />
    </section>
  );
}
