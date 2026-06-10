import { motion } from "framer-motion";
import { Mail, Linkedin, Newspaper, ArrowUpRight } from "lucide-react";

const links = [
  {
    label: "shivamdengla26@gmail.com",
    href: "mailto:shivamdengla26@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shivamdengla/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Substack",
    href: "https://shivamdengla.substack.com/",
    icon: Newspaper,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-white/10 px-6 py-32 scroll-mt-16">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="gradient-text mb-16 text-5xl font-bold tracking-tight sm:text-7xl"
        >
          let&apos;s talk
        </motion.h2>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {links.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between py-7 transition-colors hover:bg-white/5 sm:px-4"
              >
                <span className="flex items-center gap-4 text-lg font-medium sm:text-2xl">
                  <link.icon className="size-5 text-white/50 sm:size-6" />
                  {link.label}
                </span>
                <ArrowUpRight className="size-5 text-white/40 transition-transform group-hover:rotate-45 group-hover:text-white sm:size-6" />
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="mt-16 text-sm font-light text-white/40">
          Shivam Dengla. Built with React, Tailwind and Framer Motion.
        </p>
      </div>
    </section>
  );
}
