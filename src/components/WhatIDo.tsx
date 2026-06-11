import { motion } from "framer-motion";

const items = [
  {
    num: "01",
    title: "Market Research & Teardowns",
    desc: "vapes, chips, fragrances — if it has a hidden logic, I find it",
  },
  {
    num: "02",
    title: "Product Thinking",
    desc: "figuring out what should be built, and why it'll actually sell",
  },
  {
    num: "03",
    title: "Partnerships & BD",
    desc: "9 national brands, Taj Goa, all closed from cold outreach",
  },
  {
    num: "04",
    title: "Community Building",
    desc: "3,000+ students, Discord systems, retention loops that work",
  },
  {
    num: "05",
    title: "VC & Investing",
    desc: "early obsession — learning the pattern recognition",
  },
];

export default function WhatIDo() {
  return (
    <section
      id="what-i-do"
      className="bg-white px-6 py-32 text-[#0C0C0C] scroll-mt-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-5xl font-bold tracking-tight sm:text-6xl"
        >
          what i do
        </motion.h2>

        <ul>
          {items.map((item, i) => (
            <motion.li
              key={item.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="group flex flex-col gap-2 border-t border-[#0C0C0C]/15 py-8 last:border-b sm:flex-row sm:items-baseline sm:gap-10"
            >
              <span className="text-sm font-semibold text-[#0C0C0C]/40">
                {item.num}
              </span>
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-2xl font-semibold transition-transform group-hover:translate-x-2 sm:text-3xl">
                  {item.title}
                </h3>
                <p className="max-w-sm text-base font-light text-[#0C0C0C]/60 sm:text-right">
                  {item.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
