import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { decks } from "../data/decks";

const featured = [decks[2], decks[3], decks[5]];

export default function BehindTheDecks() {
  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-5 text-base font-semibold text-ember"
          >
            Behind the Decks
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            Taking Industries Apart To See Why They Sell
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <p className="max-w-md text-xl font-semibold leading-snug sm:text-2xl">
            I write long, slightly obsessive breakdowns of why everyday
            products are built exactly the way they are.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="text-xs font-light leading-relaxed text-white/60">
              Let&apos;s Build Something
              <br />
              Meaningful Together
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ember py-2 pl-5 pr-2 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Get in touch
              <span className="flex size-7 items-center justify-center rounded-full bg-white text-ember">
                <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {featured.map((deck, i) => (
          <motion.a
            key={deck.num}
            href={deck.file}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <img
              src={deck.cover}
              alt={`${deck.title} deck cover`}
              className="aspect-video w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              loading="lazy"
              draggable={false}
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
