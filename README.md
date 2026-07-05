# shivamdengla.in — personal site

Editorial, statically generated portfolio built around the consumer-industry teardown library.

**Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + React Router 7, prerendered to static HTML at build time (no server needed). Fonts (Archivo, Newsreader, Space Mono) are self-hosted from `public/fonts/`.

## Commands

```bash
npm install
npm run dev      # local dev server (client-rendered)
npm run build    # covers → webp derivatives → typecheck → client build → SSR build → prerender all routes
npm run preview  # serve the production build from dist/
```

## Structure

- `design-system/tokens.css` — every color/type/spacing/motion token (single source of truth; see `DESIGN-SYSTEM.md`)
- `src/data/decks.ts` — the teardown library: slugs, theses, stats, beats (all sourced from the PDFs — don't invent content)
- `src/pages/` — Home, per-deck case study (`/decks/<slug>/`), 404
- `scripts/generate-covers.mjs` — renders page 1 of each PDF in `public/decks/` to a cover PNG
- `scripts/optimize-covers.mjs` — 640/1280w WebP derivatives of the covers
- `scripts/prerender.mjs` — SSG: renders every route to `dist/`, emits `sitemap.xml` + `robots.txt`

## Adding a new deck

1. Drop the PDF into `public/decks/`.
2. `npm run covers` to generate + optimize its cover.
3. Add an entry to `src/data/decks.ts` (slug, title/subtitle from the deck's own cover, category, size label, accent token in `design-system/tokens.css`, key stat/thesis/beats/takeaway from the deck itself).
4. Build — the case-study page, sitemap entry, and index row all derive from that one entry.

## Docs

`AUDIT.md` (forensic audit of the previous build) → `STRATEGY.md` (IA & journey) → `DESIGN-SYSTEM.md` (+`design-system/components.md`) → `RATIONALE.md` (before/after, decisions, deferred backlog).
