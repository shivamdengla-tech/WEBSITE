import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredDecks } from "../data/decks";
import { SITE } from "../lib/site";

export default function Hero() {
  return (
    <section className="relative border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-x-6 px-6 pb-16 pt-32 sm:px-10 md:pt-40">
        {/* status line */}
        <p className="enter col-span-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-label uppercase text-gray-dim">
          <span>Consumer research · Partnerships · Community</span>
          <span className="inline-flex items-center gap-2 text-cream">
            <span aria-hidden className="size-1.5 rounded-full bg-ember" />
            Open to product roles &amp; internships
          </span>
        </p>

        {/* display headline — the POV, not a job title */}
        <h1
          className="enter col-span-12 mt-10 font-semibold text-display text-cream md:col-span-11"
          style={{ "--enter-delay": "60ms" } as React.CSSProperties}
        >
          Why things sell<span className="text-ember">.</span>
        </h1>

        {/* thesis + identity, asymmetric 7/4 */}
        <div
          className="enter col-span-12 mt-12 md:col-span-7"
          style={{ "--enter-delay": "120ms" } as React.CSSProperties}
        >
          <p className="max-w-[36ch] font-serif text-xl text-gray">
            Great products don&apos;t sell themselves. I take consumer industries
            apart to figure out why they sell — then I sell them.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="/#work" className="btn-primary">
              Read the teardowns
              <ArrowDownRight aria-hidden className="size-4" strokeWidth={1.5} />
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-quiet">
              Email me
            </a>
          </div>
        </div>

        {/* desk index — fills the old dead space with the actual work */}
        <aside
          className="enter col-span-12 mt-14 md:col-span-4 md:col-start-9 md:mt-12"
          style={{ "--enter-delay": "180ms" } as React.CSSProperties}
          aria-label="Latest from the desk"
        >
          <p className="border-b border-line pb-3 font-mono text-label uppercase text-gray-dim">
            Latest from the desk — new decks weekly
          </p>
          <ul>
            {featuredDecks.map((d) => (
              <li key={d.slug} className="border-b border-line">
                <Link
                  to={`/decks/${d.slug}/`}
                  className="group flex items-baseline justify-between gap-4 py-3.5"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-gray-dim">{d.num}</span>
                    <span
                      className="text-base font-medium text-cream transition-colors duration-[140ms] group-hover:text-[var(--deck-accent)]"
                      style={{ "--deck-accent": d.accent } as React.CSSProperties}
                    >
                      {d.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 shrink-0 text-gray-dim opacity-0 transition-opacity duration-[140ms] group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* identity strip */}
        <p
          className="enter col-span-12 mt-16 border-t border-line pt-6 font-mono text-label uppercase text-gray-dim"
          style={{ "--enter-delay": "240ms" } as React.CSSProperties}
        >
          Shivam Dengla — deal closer by instinct · product person by choice ·
          chemist by degree · BITS Pilani, Goa
        </p>
      </div>
    </section>
  );
}
