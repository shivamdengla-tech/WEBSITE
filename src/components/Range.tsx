const roles = [
  {
    num: "01",
    title: "Sales & business development",
    org: "Toffee Doodle",
    detail:
      "Business development intern — pipeline, outreach, and closing, learned by doing it.",
  },
  {
    num: "02",
    title: "Partnerships & sponsorships",
    org: "DOSM · BITS Goa · 2026–27",
    detail:
      "Head of Sponsorships, Department of Sponsorship & Marketing — full cycle, from outreach to on-ground activation.",
  },
  {
    num: "03",
    title: "Community building",
    org: "3,000+ member community",
    detail:
      "Discord engagement loops and retention systems, run day to day.",
  },
  {
    num: "04",
    title: "Industry research & writing",
    org: "The teardown library · Substack",
    detail:
      "Long consumer-industry teardowns, shipping weekly — the practice this site is built around.",
  },
];

export default function Range() {
  return (
    <section id="range" className="on-paper scroll-mt-16 border-b border-line bg-paper text-ink-text">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 md:py-32">
        <div className="reveal grid grid-cols-12 gap-x-6">
          <p className="col-span-12 font-mono text-label uppercase text-ember-deep">
            The range
          </p>
          <h2 className="col-span-12 mt-4 max-w-[24ch] text-title font-semibold md:col-span-9">
            The research is the thinking. These are the reps.
          </h2>
        </div>

        <ul className="mt-16">
          {roles.map((r, i) => (
            <li
              key={r.num}
              className="reveal grid grid-cols-12 gap-x-6 gap-y-2 border-t border-line-ink py-8 last:border-b"
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <span className="col-span-12 font-mono text-sm text-ink-soft md:col-span-1">
                {r.num}
              </span>
              <h3 className="col-span-12 text-2xl font-semibold md:col-span-5">
                {r.title}
              </h3>
              <div className="col-span-12 md:col-span-6">
                <p className="font-mono text-label uppercase text-ember-deep">
                  {r.org}
                </p>
                <p className="mt-2 max-w-[52ch] font-serif text-lg text-ink-soft">
                  {r.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
