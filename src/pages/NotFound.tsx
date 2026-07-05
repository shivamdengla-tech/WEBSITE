import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-40 sm:px-10">
      <p className="font-mono text-label uppercase text-ember">404</p>
      <h1 className="mt-4 max-w-[20ch] text-title font-semibold text-cream">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-6 max-w-[44ch] font-serif text-lg text-gray">
        The teardown you&apos;re after may have moved. Everything lives in the
        index.
      </p>
      <Link to="/" className="btn-primary mt-10">
        Back to the index
      </Link>
    </div>
  );
}
