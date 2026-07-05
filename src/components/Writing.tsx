import { ArrowUpRight } from "lucide-react";
import { SITE } from "../lib/site";

export default function Writing() {
  return (
    <section id="writing" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-x-6 gap-y-10 px-6 py-24 sm:px-10 md:py-32">
        <div className="reveal col-span-12 md:col-span-6">
          <p className="font-mono text-label uppercase text-ember">Writing</p>
          <h2 className="mt-4 max-w-[16ch] text-title font-semibold text-cream">
            The desk, in your inbox
          </h2>
          <p className="mt-6 max-w-[44ch] font-serif text-lg text-gray">
            Every teardown starts as a letter: the question, the research, the
            argument. New decks ship every week — subscribers read them first.
          </p>
          <a
            href={SITE.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-gray hover:text-cream"
          >
            Browse the archive on Substack
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
          </a>
        </div>
        <div className="reveal col-span-12 md:col-span-5 md:col-start-8">
          <div className="rounded-media border border-line bg-ink-card p-2">
            {/* Inline subscribe — the conversion stays on the page */}
            <iframe
              src="https://shivamdengla.substack.com/embed"
              title="Subscribe to Shivam Dengla's Substack"
              loading="lazy"
              className="h-[300px] w-full rounded-[2px] border-0 bg-ink-card"
            />
          </div>
          <p className="mt-3 font-mono text-label uppercase text-gray-dim">
            No spam — just the decks, weekly.
          </p>
        </div>
      </div>
    </section>
  );
}
