import { ArrowUpRight } from "lucide-react";
import { SITE } from "../lib/site";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-4 sm:px-10 md:pb-32">
        <div className="sticker reveal bg-violet p-7 sm:p-12">
          <p className="badge">
            <span aria-hidden className="size-2 rounded-full border border-ink bg-panel" />
            Open to product roles &amp; internships
          </p>
          <h2 className="mt-6 max-w-[16ch] text-title font-black uppercase">
            Hiring for product? Let&apos;s talk.
          </h2>
          <p className="mt-5 max-w-[46ch] font-serif text-lg">
            The fastest way to evaluate me is a teardown and a conversation.
            Email works best — say which deck you read and what you disagreed
            with.
          </p>

          <div className="mt-9">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-block break-all border-b-4 border-ink pb-1 text-2xl font-extrabold tracking-tight transition-colors duration-[140ms] hover:border-ember-deep sm:text-4xl"
            >
              {SITE.email}
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1.5 font-mono text-sm font-bold"
              >
                LinkedIn
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
              </a>
            </li>
            <li>
              <a
                href={SITE.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1.5 font-mono text-sm font-bold"
              >
                Substack
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
