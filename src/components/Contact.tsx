import { ArrowUpRight } from "lucide-react";
import { SITE } from "../lib/site";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 md:py-32">
        <div className="reveal grid grid-cols-12 gap-x-6">
          <p className="col-span-12 flex items-center gap-2 font-mono text-label uppercase text-gray-dim">
            <span aria-hidden className="size-1.5 rounded-full bg-ember" />
            Open to product roles &amp; internships
          </p>
          <h2 className="col-span-12 mt-6 max-w-[18ch] text-title font-semibold text-cream">
            Hiring for product? Let&apos;s talk.
          </h2>
          <p className="col-span-12 mt-6 max-w-[46ch] font-serif text-lg text-gray md:col-span-7">
            The fastest way to evaluate me is a teardown and a conversation.
            Email works best — say which deck you read and what you disagreed
            with.
          </p>
        </div>

        <div className="reveal mt-12">
          <a
            href={`mailto:${SITE.email}`}
            className="group inline-block border-b-2 border-line-strong pb-2 text-2xl font-semibold tracking-tight text-cream transition-colors duration-[140ms] hover:border-ember sm:text-4xl"
          >
            {SITE.email}
          </a>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1.5 font-mono text-sm text-gray hover:text-cream"
              >
                LinkedIn
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
              </a>
            </li>
            <li>
              <a
                href={SITE.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1.5 font-mono text-sm text-gray hover:text-cream"
              >
                Substack
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
