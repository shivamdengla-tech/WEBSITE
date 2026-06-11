import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { decks } from "../data/decks";

const PARAGRAPHS = [
  "Third year at BITS Pilani, Goa. Chemist by degree. Product person by choice. Overthinker by default.",
  "Spends most of his time reading things nobody assigned, writing teardowns on industries nobody asked about, watching Netflix with too much analysis, and buying fragrances with money that should go elsewhere. Gym or long drives. Coffee always.",
];

const PARAGRAPH_MUTED =
  "The hustle chapter was fun. Now on the product and markets chapter and it is considerably more interesting.";

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1 / total);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

function RevealParagraph({
  text,
  muted = false,
}: {
  text: string;
  muted?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const chars = text.split("");

  return (
    <p
      ref={ref}
      className={`text-xl font-light leading-relaxed sm:text-2xl md:text-3xl ${
        muted ? "text-white/50" : "text-white"
      }`}
    >
      {chars.map((char, i) => (
        <Char
          key={i}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[radial-gradient(55%_45%_at_0%_0%,rgba(255,92,28,0.07),transparent_70%)] px-6 py-32 scroll-mt-16"
    >
      <motion.img
        src={decks[1].cover}
        alt=""
        aria-hidden
        loading="lazy"
        initial={{ opacity: 0, rotate: -12 }}
        whileInView={{ opacity: 1, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute left-4 top-10 hidden w-36 rounded-xl border border-white/10 opacity-80 lg:block"
      />
      <motion.img
        src={decks[4].cover}
        alt=""
        aria-hidden
        loading="lazy"
        initial={{ opacity: 0, rotate: 12 }}
        whileInView={{ opacity: 1, rotate: 8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-10 right-4 hidden w-36 rounded-xl border border-white/10 opacity-80 lg:block"
      />

      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="gradient-text mb-12 text-5xl font-bold tracking-tight sm:text-6xl"
        >
          about me
        </motion.h2>
        <div className="space-y-10">
          {PARAGRAPHS.map((text) => (
            <RevealParagraph key={text} text={text} />
          ))}
          <RevealParagraph text={PARAGRAPH_MUTED} muted />
        </div>
      </div>
    </section>
  );
}
