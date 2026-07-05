import { SITE } from "../lib/site";

const cols = [
  { label: "Email", href: `mailto:${SITE.email}`, external: false },
  { label: "LinkedIn", href: SITE.linkedin, external: true },
  { label: "Substack", href: SITE.substack, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-semibold text-cream">Shivam Dengla</p>
          <p className="mt-2 max-w-md font-serif text-lg italic text-gray">
            Taking consumer industries apart to find out why things sell.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-5">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
            {cols.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="link font-mono text-sm text-gray hover:text-cream"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-2 border-t border-line pt-6 font-mono text-label uppercase tracking-[0.14em] text-gray-dim md:col-span-12 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Shivam Dengla · BITS Pilani, Goa</p>
          <p>Set in Archivo, Newsreader &amp; Space Mono</p>
        </div>
      </div>
    </footer>
  );
}
