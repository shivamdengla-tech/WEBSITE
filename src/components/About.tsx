import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { decks } from "../data/decks";

const BODY =
  "I'm a dual degree student at BITS Pilani, Goa, but most of what I do happens outside the classroom. I spend my time on two things that look unrelated until you watch me do them: closing deals and taking industries apart to understand how they actually work. I've generated over $40K in sales as a student, closed 9 national brand sponsorships before the end of my sophomore year, and I run a 3,000+ student community day to day. The rest of my time goes into writing, long and slightly obsessive breakdowns of why vapes, fragrances, sachets and potato chips are built exactly the way they are. If a market has a hidden logic, I want to find it.";

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

function RevealParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const chars = text.split("");

  return (
    <p
      ref={ref}
      className="text-xl font-light leading-relaxed text-white sm:text-2xl md:text-3xl"
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
    <section id="about" className="relative px-6 py-32 scroll-mt-16">
      <motion.img
        src={decks[1].cover}
        alt=""
        aria-hidden
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
        <RevealParagraph text={BODY} />
      </div>
    </section>
  );
}
