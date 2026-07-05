import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { coverSrc, deckBySlug, decks } from "../data/decks";
import NotFound from "./NotFound";
import { SITE } from "../lib/site";

export default function DeckPage() {
  const { slug } = useParams();
  const deck = slug ? deckBySlug(slug) : undefined;
  if (!deck) return <NotFound />;

  const i = decks.indexOf(deck);
  const prev = decks[(i - 1 + decks.length) % decks.length];
  const next = decks[(i + 1) % decks.length];

  return (
    <article
      className="page-enter"
      style={{ "--deck-accent": deck.accent } as React.CSSProperties}
    >
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10 md:pt-32">
        {/* breadcrumb + meta */}
        <nav aria-label="Breadcrumb" className="font-mono text-label uppercase text-ink-soft">
          <Link to="/" className="link">
            Index
          </Link>
          <span aria-hidden> / </span>
          <a href="/#work" className="link">
            Teardowns
          </a>
        </nav>
        <p className="mt-8">
          <span className="inline-block rounded-badge border-2 border-ink px-3.5 py-1.5 font-mono text-label uppercase" style={{ background: deck.accent }}>
            {[deck.edition ?? deck.category, deck.year, `${deck.pages} pages`]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </p>

        {/* title block */}
        <div className="grid grid-cols-12 gap-x-6">
          <h1 className="col-span-12 mt-5 text-title font-black uppercase md:col-span-10">
            {deck.title}
          </h1>
          <p className="col-span-12 mt-6 max-w-[52ch] font-serif text-xl italic text-ink-soft md:col-span-8">
            {deck.subtitle}
          </p>
        </div>

        {/* key stat */}
        <div className="mt-12 grid grid-cols-12 items-end gap-x-6 gap-y-4">
          <p className="col-span-12 md:col-span-7">
            <span
              className="inline-block rounded-ctl border-2 border-ink px-5 py-3 font-mono text-stat font-bold shadow-sticker"
              style={{ background: deck.accent }}
            >
              {deck.stat.value}
            </span>
          </p>
          <p className="col-span-12 max-w-[40ch] font-mono text-label uppercase text-ink-soft md:col-span-5 md:justify-self-end md:text-right">
            {deck.stat.caption}
          </p>
        </div>

        {/* cover */}
        <div className="mt-12 overflow-hidden rounded-card border-2 border-ink shadow-sticker">
          <img
            src={coverSrc(deck, 1280)}
            srcSet={`${coverSrc(deck, 640)} 640w, ${coverSrc(deck, 1280)} 1280w`}
            sizes="(min-width: 1152px) 1104px, 100vw"
            alt={deck.coverAlt}
            width={1280}
            height={720}
            className="aspect-video w-full object-cover"
          />
        </div>

        {/* thesis */}
        <div className="mt-16 grid grid-cols-12 gap-x-6">
          <p className="col-span-12 font-mono text-label uppercase text-ink-soft md:col-span-3">
            The thesis
          </p>
          <p className="col-span-12 mt-4 max-w-[62ch] font-serif text-xl md:col-span-8 md:col-start-5 md:mt-0">
            {deck.thesis}
          </p>
        </div>

        {/* inside the deck */}
        {deck.beats.length > 0 && (
          <div className="mt-16">
            <h2 className="border-b-2 border-ink pb-4 font-mono text-label uppercase text-ink-soft">
              Inside the deck
            </h2>
            <ol>
              {deck.beats.map((b, n) => (
                <li
                  key={n}
                  className="reveal grid grid-cols-12 gap-x-6 gap-y-3 border-b border-line py-9"
                >
                  <span className="col-span-12 md:col-span-1">
                    <span
                      className="flex size-9 items-center justify-center rounded-full border-2 border-ink font-mono text-sm font-bold"
                      style={{ background: deck.accent }}
                    >
                      {String(n + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="col-span-12 text-2xl font-extrabold md:col-span-4">
                    {b.heading}
                  </h3>
                  <p className="col-span-12 max-w-[62ch] font-serif text-lg text-ink-soft md:col-span-7 md:col-start-6">
                    {b.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* takeaway */}
        {deck.takeaway && (
          <blockquote
            className="mt-16 max-w-[48ch] rounded-r-ctl border-l-4 border-ink py-2 pl-6 font-serif text-2xl italic"
            style={{ borderColor: deck.accent }}
          >
            {deck.takeaway}
          </blockquote>
        )}

        {/* CTA */}
        <div className="mt-16 flex flex-wrap items-center gap-x-5 gap-y-4 border-t-2 border-ink pt-10">
          <a
            href={deck.file}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open the full deck
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
          </a>
          <span className="font-mono text-label uppercase text-ink-soft">
            {deck.sizeLabel} · opens in a new tab
          </span>
        </div>
        <p className="mt-8 max-w-[52ch] font-serif text-lg text-ink-soft">
          Reading this and hiring for product?{" "}
          <a href={`mailto:${SITE.email}`} className="link text-ink">
            Email me
          </a>{" "}
          — say what you disagreed with.
        </p>

        {/* prev / next */}
        <nav aria-label="More teardowns" className="mt-16 grid gap-5 sm:grid-cols-2">
          <Link to={`/decks/${prev.slug}/`} className="sticker flex flex-col gap-2 p-6">
            <span className="inline-flex items-center gap-2 font-mono text-label uppercase text-ink-soft">
              <ArrowLeft aria-hidden className="size-3.5" strokeWidth={2} />
              Previous
            </span>
            <span className="text-xl font-bold">{prev.title}</span>
          </Link>
          <Link
            to={`/decks/${next.slug}/`}
            className="sticker flex flex-col gap-2 p-6 text-right"
          >
            <span className="inline-flex items-center justify-end gap-2 font-mono text-label uppercase text-ink-soft">
              Next
              <ArrowRight aria-hidden className="size-3.5" strokeWidth={2} />
            </span>
            <span className="text-xl font-bold">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
