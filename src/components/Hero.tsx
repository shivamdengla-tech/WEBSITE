import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import AvatarCanvas from "./AvatarCanvas";
import "../lib/gsapSetup";

gsap.registerPlugin(ScrambleTextPlugin);

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

const floatingLabels = ["Deal Closer", "Market Reader", "Builder"];

const TICKER_SPEED = 40; // px per second

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const avatarBoxRef = useRef<HTMLDivElement>(null);

  // Floating labels hide whenever the avatar canvas is narrower than 500px
  // so they never crowd the face
  useEffect(() => {
    const avatarBox = avatarBoxRef.current;
    if (!avatarBox) return;
    const labels =
      avatarBox.querySelectorAll<HTMLElement>("[data-float-label]");
    const observer = new ResizeObserver(([entry]) => {
      const wide = entry.contentRect.width >= 500;
      labels.forEach((label) => {
        label.style.display = wide ? "" : "none";
      });
    });
    observer.observe(avatarBox);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = tickerTrackRef.current;
    if (!root || !track) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Infinite marquee ticker, leftwards at a constant speed,
      // smoothly pausing on hover
      const marquee = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        repeat: -1,
        duration: track.scrollWidth / 2 / TICKER_SPEED,
        paused: reducedMotion,
      });
      const pause = () => gsap.to(marquee, { timeScale: 0, duration: 0.4 });
      const resume = () => gsap.to(marquee, { timeScale: 1, duration: 0.4 });
      track.parentElement?.addEventListener("mouseenter", pause);
      track.parentElement?.addEventListener("mouseleave", resume);

      if (reducedMotion) return;

      // Independent slow sine drift on the floating labels
      gsap.utils
        .toArray<HTMLElement>("[data-float-label]")
        .forEach((label, i) => {
          gsap.to(label, {
            y: "+=12",
            duration: 2.4 + i * 0.7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.5,
          });
        });

      // Page load sequence. On mobile the tweens are opacity-only —
      // no transform offsets — to keep the main thread light.
      const m = (value: number) => (isMobile ? 0 : value);
      const willChange = isMobile ? "opacity" : "transform, opacity";
      gsap.set("[data-hero-nav]", { y: m(-16), opacity: 0, willChange });
      gsap.set("[data-hero-intro]", { opacity: 0, y: m(12), willChange });
      gsap.set("[data-hero-avatar]", { opacity: 0, y: m(80), willChange });
      gsap.set("[data-hero-blurb]", { opacity: 0, x: m(-24), willChange });
      gsap.set("[data-hero-ticker]", { opacity: 0, y: m(24), willChange });
      gsap.set("[data-ticker-item]", { opacity: 0, y: m(10), willChange });
      gsap.set("[data-float-label]", {
        opacity: 0,
        scale: isMobile ? 1 : 0.8,
        willChange,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          // Drop the will-change hint once nothing is animating anymore
          gsap.set(
            "[data-hero-nav], [data-hero-intro], [data-hero-avatar], [data-hero-blurb], [data-hero-ticker], [data-ticker-item], [data-float-label]",
            { clearProps: "willChange" },
          );
        },
      });
      tl.to("[data-hero-nav]", { y: 0, opacity: 1, duration: 0.4 }, 0)
        .to("[data-hero-intro]", { y: 0, opacity: 1, duration: 0.5 }, 0.3);

      // Headline scramble: words stagger 0.15s apart, snappy resolve
      gsap.utils
        .toArray<HTMLElement>("[data-hero-word]")
        .forEach((word, i) => {
          tl.to(
            word,
            {
              duration: 1.2,
              scrambleText: {
                text: word.dataset.heroWord ?? word.textContent ?? "",
                chars: "upperCase",
                speed: 1.4,
              },
              ease: "none",
            },
            0.4 + i * 0.15,
          );
        });

      tl.to(
        "[data-hero-avatar]",
        { y: 0, opacity: 1, duration: 0.8 },
        0.8,
      )
        .to("[data-hero-blurb]", { x: 0, opacity: 1, duration: 0.6 }, 1.0)
        .to("[data-hero-ticker]", { y: 0, opacity: 1, duration: 0.5 }, 1.1)
        .to(
          "[data-ticker-item]",
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          1.15,
        )
        .to(
          "[data-float-label]",
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          1.5,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  // Duplicate the items so the marquee loops seamlessly
  const tickerItems = [...specialties, ...specialties];

  return (
    <section id="top" className="p-2 [transform:translateZ(0)] sm:p-3">
      <div
        ref={rootRef}
        className="relative flex min-h-[92vh] flex-col overflow-hidden rounded-[1.75rem] bg-[radial-gradient(130%_110%_at_50%_-5%,#ff8a3c_0%,#f04e06_32%,#9c2a03_60%,#3a1102_85%,#1c0801_100%)] sm:rounded-[2.25rem]"
      >
        {/* portrait, centered behind everything */}
        <div
          data-hero-avatar
          className="pointer-events-none absolute inset-x-0 top-[6%] z-0 flex justify-center"
        >
          <div ref={avatarBoxRef} className="relative">
            <AvatarCanvas className="hero-portrait h-[58vh] max-h-[600px] w-auto select-none aspect-[4/5]" />
            {/* floating pill labels drifting around the avatar, clear of the face */}
            <span
              data-float-label
              className="absolute left-5 top-5 rounded-full border border-ember/30 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
            >
              {floatingLabels[0]}
            </span>
            <span
              data-float-label
              className="absolute -right-6 top-1/2 -translate-y-1/2 rounded-full border border-ember/30 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
            >
              {floatingLabels[1]}
            </span>
            <span
              data-float-label
              className="absolute bottom-5 left-5 rounded-full border border-ember/30 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
            >
              {floatingLabels[2]}
            </span>
          </div>
        </div>

        {/* bottom fade so text stays readable over the portrait */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-t from-[#160601] via-[#160601]/70 to-transparent" />

        {/* nav */}
        <nav
          data-hero-nav
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
                  className="nav-link text-sm font-medium text-white/80 transition-colors hover:text-white"
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
        </nav>

        {/* headline + blurb */}
        <div className="relative z-10 mt-auto grid items-end gap-10 px-6 pb-10 sm:px-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p
              data-hero-intro
              className="mb-3 text-base font-medium text-white/85 sm:text-lg"
            >
              Hey, I&apos;m Shivam, a
            </p>
            <h1 className="text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">
              <span data-hero-word="Deal">Deal</span>
              <br />
              <span data-hero-word="Closer">Closer</span>
            </h1>
          </div>

          <div data-hero-blurb className="max-w-xs lg:justify-self-end">
            <p className="text-xl font-semibold leading-snug sm:text-2xl">
              Great products don&apos;t sell themselves.
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/70">
              From brand deals to 40-slide teardowns, I figure out why things
              sell. Then I sell them.
            </p>
          </div>
        </div>

        {/* numbered specialties: infinite marquee ticker */}
        <div
          data-hero-ticker
          className="relative z-10 overflow-hidden border-t border-ember-line py-7"
        >
          <div ref={tickerTrackRef} className="flex w-max items-center">
            {tickerItems.map((item, i) => (
              <div
                key={`${item.num}-${i}`}
                data-ticker-item={i < specialties.length ? "" : undefined}
                className="flex shrink-0 items-center gap-10 pr-10"
              >
                <div>
                  <p className="text-xs font-medium text-ember">
                    #{item.num}
                  </p>
                  <p className="mt-1.5 text-sm font-medium">{item.label}</p>
                </div>
                <span aria-hidden className="text-[0.5rem] text-ember">
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
