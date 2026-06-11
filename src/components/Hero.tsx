import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Decks", href: "#decks" },
];

const specialties = [
  { num: "01", label: "Sales & Partnerships" },
  { num: "02", label: "Community Building" },
  { num: "03", label: "Industry Teardowns" },
  { num: "04", label: "Brand Strategy" },
];

export default function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 16, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 16, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const portrait = portraitRef.current;
    if (!portrait) return;
    const rect = portrait.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const max = 24;
    x.set(Math.max(-max, Math.min(max, (e.clientX - centerX) * 0.05)));
    y.set(Math.max(-max, Math.min(max, (e.clientY - centerY) * 0.05)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="top" className="p-2 sm:p-3">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex min-h-[92vh] flex-col overflow-hidden rounded-[1.75rem] bg-[radial-gradient(130%_110%_at_50%_-5%,#ff8a3c_0%,#f04e06_32%,#9c2a03_60%,#3a1102_85%,#1c0801_100%)] sm:rounded-[2.25rem]"
      >
        {/* portrait, centered behind everything */}
        <motion.div
          ref={portraitRef}
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 top-[6%] z-0 flex justify-center"
        >
          <img
            src="/portrait.png"
            alt="Portrait of Shivam Dengla"
            className="hero-portrait h-[58vh] max-h-[600px] w-auto select-none object-contain"
            draggable={false}
          />
        </motion.div>

        {/* bottom fade so text stays readable over the portrait */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-t from-[#160601] via-[#160601]/70 to-transparent" />

        {/* nav */}
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10"
        >
          <a href="#top" className="text-lg font-bold tracking-tight">
            shivam<span className="text-white/50">.</span>
          </a>
          <ul className="hidden items-center gap-8 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-[#0C0C0C] transition-transform hover:scale-105"
          >
            Get in touch
            <span className="flex size-7 items-center justify-center rounded-full bg-ember text-white">
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </span>
          </a>
        </motion.nav>

        {/* headline + blurb */}
        <div className="relative z-10 mt-auto grid items-end gap-10 px-6 pb-10 sm:px-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="mb-3 text-base font-medium text-white/85 sm:text-lg"
            >
              Hey, I&apos;m Shivam — a
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl"
            >
              Deal
              <br />
              Closer
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="max-w-xs lg:justify-self-end"
          >
            <p className="text-xl font-semibold leading-snug sm:text-2xl">
              Great products don&apos;t sell themselves.
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/70">
              From brand deals to 40-slide teardowns, I figure out why things
              sell — then I sell them.
            </p>
          </motion.div>
        </div>

        {/* numbered specialties */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="relative z-10 grid grid-cols-2 gap-6 border-t border-white/15 px-6 py-7 sm:px-10 lg:grid-cols-4"
        >
          {specialties.map((item) => (
            <div key={item.num}>
              <p className="text-xs font-medium text-white/60">
                <span className="text-ember">#</span>
                {item.num}
              </p>
              <p className="mt-1.5 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
