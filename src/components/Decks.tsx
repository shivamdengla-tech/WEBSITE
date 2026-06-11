import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { decks, Deck } from "../data/decks";

function DeckCard({
  deck,
  index,
  total,
  progress,
}: {
  deck: Deck;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      className="sticky flex items-center justify-center"
      style={{ top: `calc(10vh + ${index * 22}px)` }}
    >
      <motion.article
        style={{ scale }}
        className="grid w-full max-w-5xl origin-top grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-ember/10 bg-[#181009] p-8 shadow-2xl md:grid-cols-2 md:p-12"
      >
        <div className="flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-ember">
                {deck.num}
              </span>
              <span className="chip-sweep rounded-full border border-ember/25 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/60">
                Research
              </span>
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              {deck.title}
            </h3>
          </div>
          <a
            href={deck.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#0C0C0C]"
          >
            Read Deck
            <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ember/10">
          <img
            src={deck.cover}
            alt={`${deck.title} deck cover`}
            className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-80"
            loading="lazy"
            draggable={false}
          />
        </div>
      </motion.article>
    </div>
  );
}

export default function Decks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="decks" ref={ref} className="px-6 py-32 scroll-mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="gradient-text mx-auto mb-20 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl"
      >
        decks
      </motion.h2>

      <div className="space-y-24">
        {decks.map((deck, i) => (
          <DeckCard
            key={deck.num}
            deck={deck}
            index={i}
            total={decks.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
