import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-10">
      <p>
        <span className="inline-block rounded-badge border-2 border-ink bg-yellow px-3.5 py-1.5 font-mono text-label uppercase shadow-sticker-sm">
          404
        </span>
      </p>
      <h1 className="mt-5 max-w-[16ch] text-title font-black uppercase">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-6 max-w-[44ch] font-serif text-lg text-ink-soft">
        The teardown you&apos;re after may have moved. Everything lives in the
        index.
      </p>
      <p className="mt-10">
        <Link to="/" className="btn-primary">
          Back to the index
        </Link>
      </p>
    </div>
  );
}
