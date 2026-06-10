import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Writing() {
  return (
    <section id="writing" className="px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="gradient-text text-5xl font-bold tracking-tight sm:text-6xl"
        >
          writing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-xl font-light text-white/70 sm:text-2xl"
        >
          I write long, obsessive breakdowns of how consumer industries
          actually work.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-10"
        >
          <a
            href="https://shivamdengla.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0C0C0C] transition-transform hover:scale-105"
          >
            Read on Substack
            <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
