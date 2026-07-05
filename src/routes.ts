import { decks } from "./data/decks";
import { PageMeta, SITE } from "./lib/site";

/** All statically generated routes (consumed by scripts/prerender.mjs). */
export const staticRoutes: string[] = [
  "/",
  ...decks.map((d) => `/decks/${d.slug}/`),
  "/404/",
];

export function metaForPath(path: string): PageMeta {
  const norm = path.endsWith("/") ? path : `${path}/`;
  const deck = decks.find((d) => norm === `/decks/${d.slug}/`);
  if (deck) {
    return {
      title: `${deck.title} — teardown by Shivam Dengla`,
      description: deck.subtitle,
      path: `/decks/${deck.slug}/`,
      ogImage: deck.cover,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: deck.title,
          description: deck.subtitle,
          image: SITE.origin + deck.cover,
          url: `${SITE.origin}/decks/${deck.slug}/`,
          author: { "@type": "Person", name: "Shivam Dengla", url: SITE.origin },
          genre: deck.category,
        },
      ],
    };
  }
  if (norm === "/") {
    return {
      title: "Shivam Dengla — why things sell",
      description: SITE.description,
      path: "/",
    };
  }
  return {
    title: "Page not found — Shivam Dengla",
    description: "This page doesn't exist. Everything lives in the index.",
    path: norm,
  };
}
