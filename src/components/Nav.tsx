import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[280ms] ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10"
      >
        <Link to="/" className="font-semibold tracking-tight text-cream">
          Shivam Dengla
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="navlink text-sm text-gray hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="mailto:shivamdengla26@gmail.com" className="btn-quiet !px-4 !py-2.5">
            Email me
          </a>
        </div>

        <button
          type="button"
          className="btn-quiet !px-4 !py-2.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-ink md:hidden"
      >
        <ul className="px-6 py-4">
          {links.map((l) => (
            <li key={l.href} className="border-b border-line last:border-b-0">
              <a
                href={l.href}
                className="block py-4 text-2xl text-cream"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-5 pb-2">
            <a href="mailto:shivamdengla26@gmail.com" className="btn-primary">
              Email me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
