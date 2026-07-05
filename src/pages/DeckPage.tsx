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
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10 md:pt-36">
        {/* breadcrumb + meta */}
        <nav aria-label="Breadcrumb" className="font-mono text-label uppercase text-gray-dim">
          <Link to="/" className="link">
            Index
          </Link>
          <span aria-hidden> / </span>
          <a href="/#work" className="link">
            Teardowns
          </a>
        </nav>
        <p className="mt-8 font-mono text-label uppercase" style={{ color: deck.accent }}>
          {[deck.edition ?? deck.category, deck.year, `${deck.pages} pages`]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {/* title block */}
        <div className="grid grid-cols-12 gap-x-6">
          <h1 className="col-span-12 mt-4 text-title font-semibold text-cream md:col-span-10">
            {deck.title}
          </h1>
          <p className="col-span-12 mt-6 max-w-[52ch] font-serif text-xl italic text-gray md:col-span-8">
            {deck.subtitle}
          </p>
        </div>

        {/* key stat */}
        <div className="mt-14 grid grid-cols-12 gap-x-6 border-t border-line pt-8">
          <p
            className="col-span-12 font-mono text-stat font-bold md:col-span-6"
            style={{ color: deck.accent }}
          >
            {deck.stat.value}
          </p>
          <p className="col-span-12 mt-3 max-w-[40ch] self-end font-mono text-label uppercase text-gray-dim md:col-span-5 md:col-start-8">
            {deck.stat.caption}
          </p>
        </div>

        {/* cover */}
        <div className="mt-14 overflow-hidden rounded-media border border-line bg-ink-card">
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
          <p className="col-span-12 font-mono text-label uppercase text-gray-dim md:col-span-3">
            The thesis
          </p>
          <p className="col-span-12 mt-4 max-w-[62ch] font-serif text-xl text-cream md:col-span-8 md:col-start-5 md:mt-0">
            {deck.thesis}
          </p>
        </div>

        {/* inside the deck */}
        {deck.beats.length > 0 && (
          <div className="mt-20">
            <h2 className="border-b border-line-strong pb-4 font-mono text-label uppercase text-gray-dim">
              Inside the deck
            </h2>
            <ol>
              {deck.beats.map((b, n) => (
                <li
                  key={n}
                  className="reveal grid grid-cols-12 gap-x-6 gap-y-3 border-b border-line py-10"
                >
                  <span className="col-span-12 font-mono text-sm md:col-span-1" style={{ color: deck.accent }}>
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <h3 className="col-span-12 text-2xl font-semibold text-cream md:col-span-4">
                    {b.heading}
                  </h3>
                  <p className="col-span-12 max-w-[62ch] font-serif text-lg text-gray md:col-span-7 md:col-start-6">
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
            className="mt-20 max-w-[46ch] border-l-2 py-1 pl-6 font-serif text-2xl italic text-cream"
            style={{ borderColor: deck.accent }}
          >
            {deck.takeaway}
          </blockquote>
        )}

        {/* CTA */}
        <div className="mt-20 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-line pt-10">
          <a
            href={deck.file}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open the full deck
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
          </a>
          <span className="font-mono text-label uppercase text-gray-dim">
            {deck.sizeLabel} · opens in a new tab
          </span>
        </div>
        <p className="mt-8 max-w-[52ch] font-serif text-lg text-gray">
          Reading this and hiring for product?{" "}
          <a href={`mailto:${SITE.email}`} className="link text-cream">
            Email me
          </a>{" "}
          — say what you disagreed with.
        </p>

        {/* prev / next */}
        <nav
          aria-label="More teardowns"
          className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2"
        >
          <Link
            to={`/decks/${prev.slug}/`}
            className="group flex flex-col gap-2 bg-ink p-6 transition-colors duration-[140ms] hover:bg-ink-raised"
          >
            <span className="inline-flex items-center gap-2 font-mono text-label uppercase text-gray-dim">
              <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.5} />
              Previous
            </span>
            <span className="text-xl font-medium text-cream">{prev.title}</span>
          </Link>
          <Link
            to={`/decks/${next.slug}/`}
            className="group flex flex-col gap-2 bg-ink p-6 text-right transition-colors duration-[140ms] hover:bg-ink-raised"
          >
            <span className="inline-flex items-center justify-end gap-2 font-mono text-label uppercase text-gray-dim">
              Next
              <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.5} />
            </span>
            <span className="text-xl font-medium text-cream">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
