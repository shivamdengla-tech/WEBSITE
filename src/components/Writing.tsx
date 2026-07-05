import { ArrowUpRight } from "lucide-react";
import { SITE } from "../lib/site";

export default function Writing() {
  return (
    <section id="writing" className="scroll-mt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-x-6 gap-y-10 px-6 py-20 sm:px-10 md:py-28">
        <div className="reveal col-span-12 md:col-span-6">
          <p className="font-mono text-label uppercase text-ember-deep">Writing</p>
          <h2 className="mt-4 max-w-[14ch] text-title font-black uppercase">
            The desk, in your inbox
          </h2>
          <p className="mt-6 max-w-[44ch] font-serif text-lg text-ink-soft">
            Every teardown starts as a letter: the question, the research, the
            argument. New decks ship every week — subscribers read them first.
          </p>
          <a
            href={SITE.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="link mt-6 inline-flex items-center gap-1.5 font-mono text-sm"
          >
            Browse the archive on Substack
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
          </a>
        </div>
        <div className="reveal col-span-12 md:col-span-5 md:col-start-8">
          <div className="sticker p-2">
            {/* Inline subscribe — the conversion stays on the page */}
            <iframe
              src="https://shivamdengla.substack.com/embed"
              title="Subscribe to Shivam Dengla's Substack"
              loading="lazy"
              className="h-[300px] w-full rounded-media border-0 bg-panel"
            />
          </div>
          <p className="mt-3 font-mono text-label uppercase text-ink-soft">
            No spam — just the decks, weekly.
          </p>
        </div>
      </div>
    </section>
  );
}
