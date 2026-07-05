# RATIONALE.md — before/after, decisions, and the deferred backlog

Companion to [`AUDIT.md`](AUDIT.md) (what was wrong), [`STRATEGY.md`](STRATEGY.md) (why this order), and [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) (the rules everything ships under).

**Branch note:** the brief named `redesign/editorial-desk`; this environment designates `claude/shivamdengla-rebuild-342okp` as the only branch this session may push to, so the rebuild ships there. Rename/merge at will — history is clean either way.

---

## Measured outcome

| | Before (audited) | After (built) |
|---|---|---|
| Rendering | client-only SPA, empty `<div>` for crawlers | static-generated HTML for all 12 pages + sitemap + robots + OG/Twitter/JSON-LD |
| Deck URLs | none (10 PDFs behind one anchor) | 10 indexable case-study pages |
| Lighthouse (mobile-throttled) | not measured, but 4.8 MB avatar + three.js on the critical path | home **98 / 100 / 100 / 100**, deck page **95 / 100 / 100 / 100**, CLS 0 |
| JS payload | react + framer-motion + three.js (~500 KB min) + 4.8 MB `avatar.glb` | react + router only — **75 KB gz**, no 3D, no motion lib |
| Cover imagery | up to 2.3 MB PNG each, cropped mid-title | 10–60 KB WebP at 640/1280w via `srcset`, never cropped |
| Fonts | Google-hosted Hanken Grotesk, 8 files, render-blocking CSS | 5 self-hosted subset woff2 (~200 KB total), 3 preloaded |
| Contrast | multiple AA failures (`white/40` ≈ 2.9:1) | every token pair measured ≥ 4.5:1 (documented in DESIGN-SYSTEM.md) |
| Reduced motion | ignored | global CSS contract, verified |
| Mobile nav | none below 640 px | disclosure menu, 44 px targets, Esc-closes, aria-wired |

## Section-by-section: before → after → why

**Nav.** *Before:* two competing navs (one unused), 3 links, none on mobile. *After:* one fixed scroll-aware header — transparent over the hero, ink+hairline after 24 px — Work/About/Writing/Contact + quiet email button, skip-link, real mobile panel. *Why:* full coverage and wayfinding (Linear's pattern), and the CTA present but quiet per the Swiss brief.

**Hero.** *Before:* centered T-pose 3D avatar on an ember radial, "Deal Closer", ~40 % dead space, no status, no CTA path into the work. *After:* asymmetric type-led composition — mono status line ("Open to product roles & internships" with the one ember dot), display headline **"Why things sell."** (Archivo, clamp to 136 px), serif thesis keeping the original positioning verbatim, two CTAs ("Read the teardowns" primary — the convincer, per STRATEGY §6), and a "Latest from the desk" mini-index occupying the old dead zone with actual work. Identity strip retains the Deal Closer voice as evidence, not title. *Why:* the first screen now answers who/what/what-he-wants in one glance; the editorial-award-portfolio pattern (type-as-hero, ledger rules, asymmetry) replaces the centered-gradient tell.

**The avatar (the decision).** Retired, not refined. Reasons: (1) evidence — a jumping T-pose reads uncanny and juvenile against a hiring-manager audience, and no idle-motion polish changes what it *communicates*; (2) cost — 4.8 MB GLB + ~150 KB gz of three.js sat on the critical path of every visit for a decorative element (AUDIT §11); (3) brand — the Editorial Product Desk direction gets its signature moment from typography and the per-deck accent system instead, which scale to every page, while the avatar only ever lived in the hero. The stronger editorial device that replaced it is the desk index: real titles, real numbers, in the hero. `AvatarCanvas.tsx`, `avatar.glb`, and the three.js dependency are deleted. (If a 3D moment ever returns, the bar from the brief stands: cursor/scroll-driven, off the critical path, never a loop that ignores `prefers-reduced-motion`.)

**Teardown library (the spine).** *Before:* ten identical sticky-stacked cards, cropped covers, filename titles ("Icecream"), PDF-or-nothing. *After:* two tiers — three featured casebooks (uncropped cover, deck's own subtitle, one killer stat in that deck's accent, alternating left/right) and a ledger-rule full index (mono №, title, category, filterable via a `role="radiogroup"`). Titles corrected to the decks' own covers ("The New Scoop", "Vapes: a beginner's complete reference"). *Why:* hierarchy where there was none; the strongest artifacts (Mokobara, Birkenstock, New Scoop) now carry the featured weight, and his own "Casebook № 01/02" naming became the system.

**Case-study pages (new).** Ten `/decks/<slug>/` pages on the Stripe/Mercury arc: meta line → title → the deck's own subtitle → key stat → cover → thesis → "Inside the deck" numbered beats → takeaway pull-quote → "Open the full deck" with the PDF size labelled honestly (19 MB is a fact the reader deserves before tapping) → prev/next. **Every thesis, stat, beat and takeaway was extracted from the actual PDFs** — nothing invented. The vape deck is image-only, so its page carries only its own cover language and the PDF link rather than a fabricated narrative. Per-deck accent tokens color the metadata, stat, and hovers — the old random cover colors, systematized.

**Range (was "what i do").** *Before:* five capability lines including an unapproved claim ("HORECA accounts like Taj Goa"), no roles. *After:* four ledger rows on the single inverted paper surface, led by the real roles (Toffee Doodle BD internship; Head of Sponsorships, DOSM BITS Goa 2026–27; the 3,000+ community; the weekly research practice). No metrics that don't exist. *Why:* honest specificity converts better than unverifiable numbers, and the retired $40K/9-brands/6-decks strip is gone everywhere (StatsStrip deleted, About copy rewritten).

**About.** *Before:* per-character scroll reveal (~600 motion spans) with a 12 % opacity floor — unreadable at rest, janky, and clipping on short viewports. *After:* the same scroll-linked reading idea at *word* granularity, rAF-throttled, with a 0.5 opacity floor (4.79:1 — AA at rest), disabled under reduced motion, fully visible without JS. Voice kept ("If a market has a hidden logic, I want to find it"), retired numbers removed, headline "Reads things nobody assigned".

**Writing.** *Before:* one external "Read on Substack" button. *After:* inline Substack subscribe embed (lazy iframe + always-present fallback link) beside a serif pitch; the weekly cadence stated, never a count. *Why:* the "impressed but not hiring today" visitor converts to a recurring touch instead of leaking to a cold tab (STRATEGY §5).

**Contact + footer.** *Before:* "let's talk" list + one-line footer inside the section. *After:* status-signal restated, "Hiring for product? Let's talk." with a role-shaped email prompt ("say which deck you read and what you disagreed with" — a conversation starter, not a mailto void), LinkedIn/Substack, and a real footer (name + thesis line, link columns, colophon). A branded 404 exists because routes now exist.

**Motion system.** Three mechanisms, all with a job: CSS-only hero entrance (zero JS dependency — moving the hero off the hydration path took LCP from 3.5 s → 2.3 s), IO-driven group reveals that sequence reading order (once, 12 px, below the fold only), and a route-enter rise + prev/next chain for orientation between case studies. `prefers-reduced-motion` collapses all of it globally. Framer-motion became unnecessary and was removed — fewer bytes, and the springs live in CSS easing tokens.

**SEO/rendering.** Hand-rolled SSG: `vite build` (client) + `vite build --ssr` + `scripts/prerender.mjs` render every route to static HTML with per-page title/description/canonical/OG/Twitter/JSON-LD (Person + Article), `sitemap.xml`, `robots.txt`, and a `404.html`. Client hydrates; unknown paths client-render cleanly (no hydration mismatch — verified). Deck covers double as OG images, so a shared teardown link unfurls with his actual work.

## Deferred backlog

**P0 — content only Shivam can supply**
- Resume PDF: slot exists in the contact story; do not fabricate. Add `public/resume.pdf` + link in Nav/Contact.
- One real social-proof quote (DOSM colleague, Toffee Doodle, or a reader) for the layout-ready quote block.

**P1**
- Analytics (Plausible or similar) to see which teardowns convert — account decision, not added unilaterally.
- PDF slimming: `MOKOBARA CASE STUDY.pdf` and `Birkenstock Teardown.pdf` are 19 MB each; re-exporting at web quality would roughly halve first-read cost. (Sizes are honestly labelled meanwhile.)
- `Cache-Control` headers for `/fonts` and `/decks/covers/opt` once the hosting layer is known.

**P2**
- "Now / reading" page — great personality signal, but a stale one is worse than none; needs an upkeep habit.
- View-Transitions API for cross-page cover morphs (progressive enhancement where supported).
- Per-deck OG images with the accent + stat baked in (the raw covers are already good).
- `public/image.png` / `public/portrait.png` are now unused (1.9 MB combined) — kept in-repo deliberately in case the portrait returns in About; delete if not.
