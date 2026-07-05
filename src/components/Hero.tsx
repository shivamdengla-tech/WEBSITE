import { ArrowDownRight, Eye, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { coverSrc, featuredDecks } from "../data/decks";
import { SITE } from "../lib/site";

/** The featured covers, tilted like stickers — the work does the talking. */
function CoverStack() {
  const tilt = ["-rotate-6", "rotate-3", "-rotate-2"];
  const pos = [
    "left-0 top-0 w-[72%] z-10",
    "right-0 top-[26%] w-[70%] z-20",
    "left-[6%] top-[56%] w-[68%] z-30",
  ];
  return (
    <div aria-label="Latest teardowns" className="relative mx-auto aspect-[5/6] w-full max-w-md">
      {featuredDecks.map((d, i) => (
        <Link
          key={d.slug}
          to={`/decks/${d.slug}/`}
          className={`drift absolute ${pos[i]} ${tilt[i]} overflow-hidden rounded-media border-2 border-ink bg-panel shadow-sticker transition-transform duration-[140ms] hover:scale-[1.03] focus-visible:scale-[1.03]`}
          style={{ "--drift-delay": `${i * 1.1}s` } as React.CSSProperties}
        >
          <img
            src={coverSrc(d, 640)}
            alt={`${d.title} — open the teardown`}
            width={640}
            height={360}
            className="aspect-video w-full object-cover"
            {...(i > 0 ? { loading: "lazy" } : ({ fetchpriority: "high" } as object))}
          />
        </Link>
      ))}
      {/* sticker accents */}
      <span
        aria-hidden
        className="drift absolute -left-4 top-[44%] z-40 flex size-12 items-center justify-center rounded-full border-2 border-ink bg-yellow shadow-sticker-sm"
        style={{ "--drift-delay": "0.6s" } as React.CSSProperties}
      >
        <Eye className="size-6" strokeWidth={2} />
      </span>
      <span
        aria-hidden
        className="drift absolute -right-2 -top-4 z-40 flex size-12 items-center justify-center rounded-ctl border-2 border-ink bg-teal shadow-sticker-sm"
        style={{ "--drift-delay": "1.8s" } as React.CSSProperties}
      >
        <TrendingUp className="size-6" strokeWidth={2} />
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative">
      {/* edge doodles */}
      <span
        aria-hidden
        className="absolute -left-10 top-40 hidden size-24 rounded-full border-2 border-ink bg-pink shadow-sticker lg:block"
      />
      <span
        aria-hidden
        className="absolute -right-12 top-[60%] hidden size-28 rotate-12 rounded-card border-2 border-ink bg-purple shadow-sticker lg:block"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-x-6 px-6 pb-16 pt-28 sm:px-10 md:pt-36">
        <div className="col-span-12 md:col-span-7">
          <p className="enter text-lg font-medium">Hi, my name is Shivam.</p>

          <h1
            className="enter mt-5 font-black uppercase text-display"
            style={{ "--enter-delay": "60ms" } as React.CSSProperties}
          >
            I figure out why things sell<span className="text-ember-deep">.</span>
          </h1>

          <div
            className="enter mt-7"
            style={{ "--enter-delay": "120ms" } as React.CSSProperties}
          >
            <p className="max-w-[40ch] font-serif text-xl text-ink-soft">
              Great products don&apos;t sell themselves — I take consumer
              industries apart to learn why they sell, then I sell them.
            </p>
            <p className="mt-4 max-w-[52ch] font-mono text-label uppercase text-ink-soft">
              Head of Sponsorships, DOSM · BITS Goa — BD @ Toffee Doodle — 3,000+
              community — new teardown decks weekly
            </p>
            <p className="mt-6">
              <span className="badge">
                <span aria-hidden className="size-2 rounded-full border border-ink bg-panel" />
                Open to product roles &amp; internships
              </span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="/#work" className="btn-primary">
                Read the teardowns
                <ArrowDownRight aria-hidden className="size-4" strokeWidth={2} />
              </a>
              <a href={`mailto:${SITE.email}`} className="btn-quiet">
                Email me
              </a>
            </div>
          </div>
        </div>

        <div
          className="enter col-span-12 mt-14 md:col-span-5 md:mt-0"
          style={{ "--enter-delay": "180ms" } as React.CSSProperties}
        >
          <CoverStack />
        </div>

        {/* identity strip */}
        <p
          className="enter col-span-12 mt-16 border-t-2 border-ink pt-5 font-mono text-label uppercase text-ink-soft"
          style={{ "--enter-delay": "240ms" } as React.CSSProperties}
        >
          Deal closer by instinct · product person by choice · chemist by degree
          · BITS Pilani, Goa
        </p>
      </div>
    </section>
  );
}
