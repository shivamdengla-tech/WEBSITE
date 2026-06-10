import { motion } from "framer-motion";

const stats = [
  "$40K+ in sales",
  "9 national brands closed",
  "3,000+ community led",
  "6 industry decks",
];

export default function StatsStrip() {
  return (
    <section className="border-y border-white/10 px-6 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.p
            key={stat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="gradient-text text-3xl font-bold tracking-tight md:text-4xl"
          >
            {stat}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
