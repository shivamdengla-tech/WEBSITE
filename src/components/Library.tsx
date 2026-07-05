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
      className="reveal group grid grid-cols-12 items-center gap-x-6 gap-y-6 border-t border-line py-10"
      style={{ "--deck-accent": d.accent } as React.CSSProperties}
    >
      <div
        className={`col-span-12 overflow-hidden rounded-media border border-line bg-ink-card md:col-span-7 ${
          mirrored ? "md:order-2 md:col-start-6" : ""
        }`}
      >
        {/* 16:9 covers rendered at their native ratio — never cropped */}
        <img
          src={coverSrc(d, 1280)}
          srcSet={`${coverSrc(d, 640)} 640w, ${coverSrc(d, 1280)} 1280w`}
          sizes="(min-width: 768px) 640px, 100vw"
          alt={d.coverAlt}
          width={1280}
          height={720}
          loading="lazy"
          className="aspect-video w-full object-cover transition-[filter] duration-[280ms] group-hover:brightness-105"
        />
      </div>
      <div className={`col-span-12 md:col-span-5 ${mirrored ? "md:order-1 md:col-start-1 md:pr-4" : "md:pl-4"}`}>
        <p className="font-mono text-label uppercase text-gray-dim">
          {d.edition ?? d.category}
        </p>
        <h3 className="mt-3 text-3xl font-semibold text-cream">
          <span className="bg-gradient-to-r from-[var(--deck-accent)] to-[var(--deck-accent)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-[280ms] group-hover:bg-[length:100%_1px]">
            {d.title}
          </span>
        </h3>
        <p className="mt-4 max-w-[52ch] font-serif text-lg italic text-gray">
          {d.subtitle}
        </p>
        <p className="mt-6 font-mono text-2xl font-bold" style={{ color: d.accent }}>
          {d.stat.value}
        </p>
        <p className="mt-1 max-w-[46ch] font-mono text-label uppercase text-gray-dim">
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
    <section id="work" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 md:py-32">
        <div className="reveal grid grid-cols-12 gap-x-6 gap-y-4">
          <p className="col-span-12 font-mono text-label uppercase text-ember">
            The teardown library
          </p>
          <h2 className="col-span-12 max-w-[22ch] text-title font-semibold text-cream md:col-span-8">
            Industries, taken apart to see why they sell
          </h2>
          <p className="col-span-12 mt-2 max-w-[42ch] self-end font-serif text-lg text-gray md:col-span-4 md:justify-self-end md:text-right">
            Long, slightly obsessive breakdowns of why everyday products are
            built exactly the way they are. An ongoing library — new decks ship
            every week.
          </p>
        </div>

        {/* featured casebooks */}
        <div className="mt-16">
          {featuredDecks.map((d, i) => (
            <FeaturedEntry key={d.slug} index={i} />
          ))}
        </div>

        {/* full index */}
        <div className="reveal mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-strong pb-4">
            <h3 className="font-mono text-label uppercase text-gray-dim">
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
                  className={`rounded-ctl border px-3 py-2 font-mono text-label uppercase transition-colors duration-[140ms] ${
                    filter === c
                      ? "border-cream bg-cream text-ink-text"
                      : "border-line text-gray hover:border-line-strong hover:text-cream"
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
                  className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 py-5 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-6"
                  style={{ "--deck-accent": d.accent } as React.CSSProperties}
                >
                  <span className="font-mono text-sm text-gray-dim transition-colors duration-[140ms] group-hover:text-[var(--deck-accent)]">
                    №{d.num}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xl font-medium leading-snug text-cream transition-colors duration-[140ms] group-hover:text-[var(--deck-accent)] sm:text-2xl">
                      {d.title}
                    </span>
                    <span className="mt-1 block font-mono text-label uppercase text-gray-dim sm:hidden">
                      {d.category}
                    </span>
                  </span>
                  <span className="hidden items-baseline gap-6 sm:flex">
                    <span className="font-mono text-label uppercase text-gray-dim">
                      {d.category}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 translate-y-0.5 text-gray-dim opacity-0 transition-opacity duration-[140ms] group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-label uppercase text-gray-dim">
            The library grows weekly — the newest decks land on{" "}
            <a
              href="https://shivamdengla.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link text-gray"
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
