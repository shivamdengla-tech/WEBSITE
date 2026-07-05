# CLAUDE.md — project context (read this first in any new session)

Personal site of **Shivam Dengla** (shivamdengla.in). Third-year dual-degree student, BITS Pilani Goa. The site's one job: **land him product/internship roles** at consumer companies. The teardown decks are the proof he thinks like a PM — they are the spine of the site, not a footer.

**Working branch: `claude/shivamdengla-rebuild-342okp`** — the full redesign lives here (main still has the old dark site). Merge to `main` to go live. All work so far was done in the session ending 2026-07-05.

## Current state (done, shipped, verified)

Full rebuild + restyle is complete and pushed. Two design passes happened:
1. Dark "Editorial Product Desk" (Swiss/editorial) — replaced after user feedback ("all black looks so dull").
2. **"Sticker Desk" — the CURRENT design.** Colorful neo-brutalist light theme (reference: kristi.digital-style — cream canvas, ink outlines, hard offset shadows, sticker shapes). User approved: "everything's extremely cool."

Measured at ship: Lighthouse (throttled mobile) home **99/100/100/100**, deck page ~95/100/100/100, LCP 2.1s, CLS 0, zero console/hydration errors, keyboard/reduced-motion/mobile-menu passes green.

## Design thesis — "Sticker Desk"

- **Cream canvas** (`#FAF3E9`), warm-white panels, **ink** (`#17140F`) for ALL text and ALL 2px outlines.
- **Hard offset shadows** (2/4/7px, pure ink, no blur). Hover lifts (translate −2,−2, bigger shadow), active presses (+2,+2, smaller).
- **Multi-color sticker palette** (violet, pink, yellow, mint, teal, purple) + **ember `#FF5C1C` reserved for the primary CTA**; mint reserved for the availability badge.
- **THE contrast rule: accents are FILLS carrying ink text — never small colored text on the canvas.** Every fill measured ≥5.9:1 with ink. Don't break this.
- Per-teardown accent tokens (`--color-deck-*`): each deck's cover color used for its stat chips, meta pills, beat numbers, index-row hover fills.
- Type: **Archivo Variable** (display/UI; H1/H2 = font-black UPPERCASE), **Newsreader Variable** (serif reading face — theses, narrative, about), **Space Mono** (labels 11px tracked caps, index №s, stat chips). Self-hosted in `public/fonts/`, three preloaded.
- **Page temperature:** home = full playful (tilted cover-sticker hero stack with idle drift, icon-badge cards, violet contact panel, edge doodles); deck pages = same language, calmer (no doodles, accent used sparingly).
- Motion contract: must explain or guide. Hero enter = pure CSS (protects LCP — never gate above-fold content on JS/hydration). Scroll reveals = IO, group-level, once. Everything collapses under `prefers-reduced-motion`.
- All tokens in `design-system/tokens.css` (Tailwind v4 `@theme`). **No raw values in src/ — if it's not a token, it doesn't ship.** Full rules: `DESIGN-SYSTEM.md`, component specs: `design-system/components.md`.

## Content truth rules (CRITICAL — never violate)

- **Never fabricate**: no invented metrics, clients, quotes, or role details. Every deck-page thesis/stat/beat/takeaway was **extracted from the actual PDFs** in `public/decks/` (a text-extraction of all decks was used; re-extract with pdfjs-dist if needed).
- **Retired framing (never bring back):** "$40K in sales", "9 national brands", "6 industry decks", "HORECA accounts like Taj Goa".
- **The library is never a fixed count** — always "new decks ship weekly / ongoing library".
- Approved facts: **Growth @ MathonGo** (user-provided 2026-07-05, no other detail known — don't embellish); Head of Sponsorships, DOSM, BITS Goa 2026–27; **Toffee Doodle BD internship** (user removed it from the hero — it still appears in the Range section card #1; swapping that card to MathonGo is PENDING — needs one line from Shivam about the role first); 3,000+ Discord community; Substack: shivamdengla.substack.com; email: shivamdengla26@gmail.com; LinkedIn: /in/shivamdengla.
- **No photos** — user deleted his photo and said skip photos for now. Hero visual = the three featured deck covers as tilted stickers.
- Positioning kept verbatim: "Great products don't sell themselves — I figure out why things sell, then I sell them." Hero greeting: "Hi, my name is Shivam." H1: "I figure out why things sell."

## Architecture (don't regress these)

- Vite 6 + React 18 + TS + Tailwind v4 + React Router 7. **No framer-motion, no three.js** (deliberately removed; motion is CSS + IntersectionObserver).
- **SSG**: `npm run build` = covers → webp derivatives → tsc → client build → SSR build (`src/entry-server.tsx` → `dist-server/`) → `scripts/prerender.mjs` renders every route to static HTML in `dist/` + sitemap.xml + robots.txt + 404.html. Per-page meta/OG/Twitter/JSON-LD built in `src/lib/site.ts` + `src/routes.ts`.
- Routes: `/` and `/decks/<slug>/` ×10 (each deck = indexable case-study page; covers double as OG images). Deck data lives in **`src/data/decks.ts`** — single source; index rows, case pages, sitemap all derive from it. New-deck workflow is in README.md.
- Hydration: prerendered routes hydrate; unknown paths client-render (see `src/main.tsx`) — avoids hydration mismatch on SPA fallback.
- QA tooling used (scratchpad, recreate if needed): playwright-core with executablePath `/opt/pw-browsers/chromium-*/chrome-linux/chrome`, screenshots at 320/375/768/1024/1440/1920, Lighthouse via `CHROME_PATH=... npx lighthouse`.

## Docs trail

`AUDIT.md` (forensic audit of the original site) → `STRATEGY.md` (hiring-manager journey, IA) → `DESIGN-SYSTEM.md` + `design-system/` (tokens + specs) → `RATIONALE.md` (before/after, avatar decision, Sticker Desk addendum, deferred backlog).

## Pending / next steps (user-confirmed interest)

1. **Range card #1 swap**: Toffee Doodle → Growth @ MathonGo — waiting on one line from Shivam describing the MathonGo role. Do not invent it.
2. **Integrations discussed, not yet chosen** (user said "we can do that after the redesign"): Plausible/Umami analytics (recommended first); Supabase newsletter capture (own the email list; needs his project URL + anon key); Supabase per-deck reactions ("what did you disagree with?" box); later: private upload dashboard for new decks.
3. **Content only Shivam can supply**: resume PDF (`public/resume.pdf` + nav/contact link slot), one real testimonial quote.
4. P2 backlog in RATIONALE.md: PDF slimming (two 19MB decks), cache headers, "now/reading" page, View Transitions, baked OG images.
