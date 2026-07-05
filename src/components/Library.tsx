import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, coverSrc, decks, featuredDecks, DeckCategory } from "../data/decks";

function FeaturedEntry({ index }: { index: number }) {
  const d = featuredDecks[index];
  const mirrored = index % 2 === 1;
  return (
    <Link
      to={`/decks/${d.slug}/`}
      className="sticker reveal group grid grid-cols-12 items-center gap-x-6 gap-y-6 p-5 sm:p-7"
      style={{ "--deck-accent": d.accent } as React.CSSProperties}
    >
      <div
        className={`col-span-12 overflow-hidden rounded-media border-2 border-ink md:col-span-7 ${
          mirrored ? "md:order-2 md:col-start-6" : ""
        }`}
      >
        {/* 16:9 covers rendered at their native ratio — never cropped */}
        <img
          src={coverSrc(d, 1280)}
          srcSet={`${coverSrc(d, 640)} 640w, ${coverSrc(d, 1280)} 1280w`}
          sizes="(min-width: 768px) 600px, 100vw"
          alt={d.coverAlt}
          width={1280}
          height={720}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
      </div>
      <div className={`col-span-12 md:col-span-5 ${mirrored ? "md:order-1 md:col-start-1 md:pr-2" : "md:pl-2"}`}>
        <p className="font-mono text-label uppercase text-ink-soft">
          {d.edition ?? d.category}
        </p>
        <h3 className="mt-3 text-3xl font-extrabold">{d.title}</h3>
        <p className="mt-3 max-w-[52ch] font-serif text-lg italic text-ink-soft">
          {d.subtitle}
        </p>
        <p className="mt-5">
          <span
            className="inline-block rounded-ctl border-2 border-ink px-3 py-2 font-mono text-xl font-bold shadow-sticker-sm"
            style={{ background: d.accent }}
          >
            {d.stat.value}
          </span>
        </p>
        <p className="mt-3 max-w-[46ch] font-mono text-label uppercase text-ink-soft">
          {d.stat.caption}
        </p>
      </div>
    </Link>
  );
}

export default function Library() {
  const [filter, setFilter] = useState<DeckCategory | "All">("All");
  const rows = decks.filter((d) => filter === "All" || d.category === filter);

  return (
    <section id="work" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 md:py-28">
        <div className="reveal grid grid-cols-12 gap-x-6 gap-y-4">
          <p className="col-span-12 font-mono text-label uppercase text-ember-deep">
            The teardown library
          </p>
          <h2 className="col-span-12 max-w-[20ch] text-title font-black uppercase md:col-span-8">
            Industries, taken apart to see why they sell
          </h2>
          <p className="col-span-12 mt-2 max-w-[42ch] self-end font-serif text-lg text-ink-soft md:col-span-4 md:justify-self-end md:text-right">
            Long, slightly obsessive breakdowns of why everyday products are
            built exactly the way they are. An ongoing library — new decks ship
            every week.
          </p>
        </div>

        {/* featured casebooks */}
        <div className="mt-14 space-y-10">
          {featuredDecks.map((d, i) => (
            <FeaturedEntry key={d.slug} index={i} />
          ))}
        </div>

        {/* full index */}
        <div className="reveal mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <h3 className="font-mono text-label uppercase text-ink-soft">
              Full index
            </h3>
            <div role="radiogroup" aria-label="Filter teardowns" className="flex flex-wrap gap-2">
              {(["All", ...categories] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={filter === c}
                  onClick={() => setFilter(c)}
                  className={`rounded-badge border-2 border-ink px-3.5 py-2 font-mono text-label uppercase shadow-sticker-sm transition-colors duration-[140ms] ${
                    filter === c ? "bg-ink text-paper" : "bg-panel hover:bg-panel-dim"
                  }`}
                >
                  {c === "Brand & market teardown"
                    ? "Brands & markets"
                    : c === "Product investigation"
                      ? "Product"
                      : c === "Industry deep dive"
                        ? "Industries"
                        : c}
                </button>
              ))}
            </div>
          </div>

          <ul>
            {rows.map((d) => (
              <li key={d.slug} className="border-b border-line">
                <Link
                  to={`/decks/${d.slug}/`}
                  className="group -mx-3 grid grid-cols-[3rem_1fr] items-baseline gap-x-4 rounded-ctl px-3 py-5 transition-colors duration-[140ms] hover:bg-[var(--deck-accent)] sm:grid-cols-[4rem_1fr_auto] sm:gap-x-6"
                  style={{ "--deck-accent": d.accent } as React.CSSProperties}
                >
                  <span className="font-mono text-sm text-ink-soft group-hover:text-ink">
                    №{d.num}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xl font-semibold leading-snug sm:text-2xl">
                      {d.title}
                    </span>
                    <span className="mt-1 block font-mono text-label uppercase text-ink-soft group-hover:text-ink sm:hidden">
                      {d.category}
                    </span>
                  </span>
                  <span className="hidden items-baseline gap-6 sm:flex">
                    <span className="font-mono text-label uppercase text-ink-soft group-hover:text-ink">
                      {d.category}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 translate-y-0.5 opacity-0 transition-opacity duration-[140ms] group-hover:opacity-100"
                      strokeWidth={2}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-label uppercase text-ink-soft">
            The library grows weekly — the newest decks land on{" "}
            <a
              href="https://shivamdengla.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Substack
            </a>{" "}
            first.
          </p>
        </div>
      </div>
    </section>
  );
}
