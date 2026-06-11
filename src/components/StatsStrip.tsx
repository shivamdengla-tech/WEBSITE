import { motion } from "framer-motion";

const stats = [
  "$40K+ in Sales",
  "9 National Brands",
  "3,000+ Community",
  "6 Industry Decks",
];

export default function StatsStrip() {
  return (
    <section className="border-b border-white/10 px-6 py-12 sm:px-10">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[10rem] shrink-0 text-xs font-bold uppercase leading-relaxed tracking-wide text-white/80"
        >
          The numbers behind the hustle
        </motion.p>
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.p
              key={stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="text-lg font-bold tracking-tight sm:text-xl"
            >
              <span className="mr-2 inline-block size-2 rounded-full bg-ember align-middle" />
              {stat}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
