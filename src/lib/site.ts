export const SITE = {
  origin: "https://shivamdengla.in",
  name: "Shivam Dengla",
  email: "shivamdengla26@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivamdengla/",
  substack: "https://shivamdengla.substack.com/",
  description:
    "Consumer-industry teardowns, partnerships and community. Shivam Dengla takes industries apart to find out why things sell — and is open to product roles.",
} as const;

export interface PageMeta {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/decks/mokobara/". */
  path: string;
  ogImage?: string;
  /** Image to <link rel="preload"> (the LCP element, if it's an image). */
  preloadImage?: string;
  /** Extra JSON-LD blocks. */
  jsonLd?: object[];
}

export function headHtml(meta: PageMeta): string {
  const url = SITE.origin + meta.path;
  const img = SITE.origin + (meta.ogImage ?? "/decks/covers/mokobara-case-study.png");
  const esc = (s: string) =>
    s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shivam Dengla",
    url: SITE.origin,
    email: `mailto:${SITE.email}`,
    sameAs: [SITE.linkedin, SITE.substack],
    affiliation: { "@type": "CollegeOrUniversity", name: "BITS Pilani, Goa" },
    description: SITE.description,
  };
  const blocks = [person, ...(meta.jsonLd ?? [])]
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b).replaceAll("</", "<\\/")}</script>`,
    )
    .join("\n    ");
  return [
    ...(meta.preloadImage
      ? [`<link rel="preload" as="image" href="${meta.preloadImage}" />`]
      : []),
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    blocks,
  ].join("\n    ");
}
