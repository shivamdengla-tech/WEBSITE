# DESIGN-SYSTEM.md — "Editorial Product Desk"

The system sharpens the site's existing DNA — burnt orange on near-black, one warm inverted mode, oversized grotesque display, index numbering, ledger rules — into tokens and rules. Source of truth: [`design-system/tokens.css`](design-system/tokens.css) (Tailwind v4 `@theme`; every utility class the app uses resolves to these variables). Component specs: [`design-system/components.md`](design-system/components.md).

**The governing rule: no raw values.** If a color, size, radius, or easing isn't a token, it doesn't ship.

---

## 1. Color

### Canvas & text (measured WCAG ratios)

| Token | Value | Role | Contrast |
|---|---|---|---|
| `ink` | `#0D0B09` | page canvas (warm near-black, replaces 9 ad-hoc blacks/browns) | — |
| `ink-raised` / `ink-card` | `#14110E` / `#171310` | panels, wells | — |
| `paper` / `paper-dim` | `#F3EFE7` / `#E9E3D7` | the single inverted mode | — |
| `cream` | `#F3EFE7` | primary text on ink | **17.1:1** |
| `gray` | `#C9C0B4` | secondary on ink | **10.9:1** (10.3:1 on `ink-card`) |
| `gray-dim` | `#9A8F81` | tertiary/metadata on ink | **6.2:1** |
| `ink-text` | `#141110` | primary on paper | **16.4:1** |
| `ink-soft` | `#5C554B` | secondary on paper | **6.4:1** |
| `ember` | `#FF5C1C` | the hot accent, on ink | **6.4:1** — AA at every size |
| `ember-deep` | `#B33A0A` | the accent, on paper | **5.2:1** |

Rules: ember appears **once per viewport region** (a marker, a stat, a hover — never a background wash). The old body-level ember radial gradient and `gradient-text` fill are retired. Hairlines use `line` (`cream @ 14%`) / `line-ink` — ledger rules are structure, not decoration, so they sit on real grid edges.

### Per-teardown accents

Each deck's cover already carries a color identity; the system formalizes it (Linear-style: systematic, not decorative). `--color-deck-*` tokens color that deck's index marker, key stat, and hover accent **only on its own surfaces**. All ≥ 4.5:1 on ink (measured: vapes 7.2, sachet 6.4, chip 8.9, bottle-product 6.3, bottle-scent 14.6, plastic 9.8, mokobara 10.6, birkenstock 9.1, scoop 11.7, makadi 10.1).

## 2. Typography

| Family | File (self-hosted, `public/fonts/`) | Role |
|---|---|---|
| **Archivo Variable** (wght axis) | 36 KB woff2, preloaded | display + UI. A grotesque with real character at heavy weights; used 500–800. |
| **Newsreader Variable** (opsz + wght, roman + italic) | 132/144 KB woff2, lazy | reading face: theses, narrative, about. Earns the editorial register; italic for pull-lines. |
| **Space Mono** 400/700 | 20 KB each | index numbers, metadata labels, stats captions — the ledger voice. |

Scale (tokens `--text-*`): 11 label / 14 / 16 / 19 body-serif / 22 lede / 28 / 36 / 48 / stat `clamp(44→72)` / title `clamp(40→76)` / display `clamp(52→136)`, with leading and tracking baked into the token (display 0.92 / −0.03em; serif body 1.65). **Measure:** reading text ≤ 65ch (`max-w-[62ch]` in practice).

**Capitalization — one rule:** Sentence case everywhere (headings, buttons, links). UPPERCASE exists only in `text-label` mono metadata (11px, +0.14em tracking). The old lowercase-heading affectation and Title Case headlines are both retired.

## 3. Spacing & grid

Base unit **4 px** (Tailwind scale). Named steps, used consistently: element 8–12, group 16–24, block 40–64, section 96–160 (`py-24`→`py-40` responsive). Sections share one container: `max-w-6xl` + `px-6/10`, structured by a 12-col grid (`grid-cols-12`) with ledger hairlines on column edges where composition calls for them. Asymmetry is the default: hero 7/5, case pages 8/4, range rows 3/6/3.

## 4. Radius, borders, elevation

- Radius: `ctl` 2 px (buttons, inputs, tags) and `media` 4 px (images, embeds). **Nothing else is rounded.** `rounded-2xl/3xl/full` are gone, including pill buttons.
- Borders: 1 px hairlines in `line`/`line-ink` only. No decorative borders.
- Elevation: none. Dark editorial surfaces separate by value (`ink` vs `ink-card`), not shadows. No glows.

## 5. Motion

**Contract: motion must explain or guide — orientation between pages, reading order within a section, state feedback on an control. Anything else is cut.**

- Tokens: `quick` 140ms (state feedback), `base` 280ms (menus/filters), `reveal` 640ms (scroll/page reveals); easings `out-expo` for reveals, `swift` for state.
- Scroll reveals: **group-level, once, small distance** (12 px rise + fade, IntersectionObserver adding `.is-in`); they sequence reading order, never per-character. The About reveal keeps its scroll-linked idea at *word* granularity with a floor of 35 % opacity (readable at rest).
- Page transitions: case-study pages enter with a single `reveal` rise; prev/next navigation keeps the reader oriented in the library sequence.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` collapses all reveals/transitions to opacity-only ≤ 1ms and disables scroll-linked effects. This is global CSS, not per-component opt-in.

## 6. Components (full specs in `design-system/components.md`)

Button (primary/quiet), inline link, nav (fixed, scroll-aware, mobile disclosure), teardown index row, featured casebook entry, key-stat block, case-study page template, tag/filter, subscribe embed, footer. Every interactive component defines default / hover / focus-visible / active; focus is a 2 px ember outline with 2 px offset, everywhere, no exceptions.

## 7. Iconography

Lucide (already in the stack), 1.5 px stroke, 16/20 px sizes, used sparingly (arrows, external-link, mail). No emoji anywhere.
