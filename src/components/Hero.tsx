import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
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
    const max = 36;
    x.set(Math.max(-max, Math.min(max, (e.clientX - centerX) * 0.08)));
    y.set(Math.max(-max, Math.min(max, (e.clientY - centerY) * 0.08)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24"
    >
      <motion.div
        ref={portraitRef}
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none relative z-0"
      >
        <img
          src="/portrait.png"
          alt="Portrait of Shivam Dengla"
          className="h-[52vh] max-h-[560px] w-auto select-none object-contain"
          draggable={false}
        />
      </motion.div>

      <div className="relative z-10 -mt-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="gradient-text text-6xl font-bold tracking-tight sm:text-8xl md:text-9xl"
        >
          hi, i&apos;m shivam
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-xl text-base font-light text-white/60 sm:text-lg"
        >
          i sell stuff, then write 40 slides on why it sells.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="mt-9"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0C0C0C] transition-transform hover:scale-105"
          >
            let&apos;s talk
            <ArrowDownRight className="size-4 transition-transform group-hover:rotate-45" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
