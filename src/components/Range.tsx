import { Briefcase, Megaphone, MessagesSquare, NotebookPen } from "lucide-react";

const roles = [
  {
    num: "01",
    title: "Sales & business development",
    org: "Toffee Doodle",
    detail:
      "Business development intern — pipeline, outreach, and closing, learned by doing it.",
    icon: Briefcase,
    fill: "var(--color-violet)",
  },
  {
    num: "02",
    title: "Partnerships & sponsorships",
    org: "DOSM · BITS Goa · 2026–27",
    detail:
      "Head of Sponsorships, Department of Sponsorship & Marketing — full cycle, from outreach to on-ground activation.",
    icon: Megaphone,
    fill: "var(--color-yellow)",
  },
  {
    num: "03",
    title: "Community building",
    org: "3,000+ member community",
    detail: "Discord engagement loops and retention systems, run day to day.",
    icon: MessagesSquare,
    fill: "var(--color-mint)",
  },
  {
    num: "04",
    title: "Industry research & writing",
    org: "The teardown library · Substack",
    detail:
      "Long consumer-industry teardowns, shipping weekly — the practice this site is built around.",
    icon: NotebookPen,
    fill: "var(--color-pink)",
  },
];

export default function Range() {
  return (
    <section id="range" className="scroll-mt-16 border-y-2 border-ink bg-panel">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 md:py-28">
        <div className="reveal grid grid-cols-12 gap-x-6">
          <p className="col-span-12 font-mono text-label uppercase text-ember-deep">
            The range
          </p>
          <h2 className="col-span-12 mt-4 max-w-[22ch] text-title font-black uppercase md:col-span-9">
            The research is the thinking. These are the reps.
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {roles.map((r, i) => (
            <li
              key={r.num}
              className="sticker reveal flex flex-col gap-4 p-6 sm:p-7"
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="icon-badge" style={{ background: r.fill }}>
                  <r.icon aria-hidden className="size-6" strokeWidth={2} />
                </span>
                <span className="font-mono text-sm text-ink-soft">{r.num}</span>
              </div>
              <h3 className="text-2xl font-extrabold">{r.title}</h3>
              <p className="-mt-2 font-mono text-label uppercase text-ember-deep">
                {r.org}
              </p>
              <p className="max-w-[52ch] font-serif text-lg text-ink-soft">
                {r.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
