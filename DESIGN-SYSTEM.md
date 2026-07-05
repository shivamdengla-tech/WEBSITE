# DESIGN-SYSTEM.md — "Sticker Desk"

A warm, colorful neo-brutalist system: cream canvas, ink outlines, hard offset shadows, a multi-color sticker palette — playful on the home page, calmer on the case-study pages, one language everywhere. It keeps the editorial bones of the first system (mono index numbering, ledger rows, serif reading face, per-teardown accents) and re-dresses them.

Source of truth: [`design-system/tokens.css`](design-system/tokens.css) (Tailwind v4 `@theme`). Component specs: [`design-system/components.md`](design-system/components.md).

**Governing rules:**
1. **No raw values.** If a color, size, radius, shadow, or easing isn't a token, it doesn't ship.
2. **Accents are fills, not text.** Every colored surface carries ink text and an ink outline; accent colors never appear as small text on the canvas. This is what keeps a 10-color palette AA-safe.

## 1. Color (measured WCAG ratios)

| Token | Value | Role | Contrast |
|---|---|---|---|
| `paper` | `#FAF3E9` | page canvas (warm cream) | — |
| `panel` / `panel-dim` | `#FFFDF7` / `#F3EAD9` | cards, wells | — |
| `ink` | `#17140F` | text **and** all outlines | **16.7:1** on paper |
| `ink-soft` | `#5D564A` | secondary text | **6.6:1** |
| `ember` | `#FF5C1C` | primary CTA fill | ink text on it: **6.0:1** |
| `ember-deep` | `#B33A0A` | accent text on cream, focus ring | **5.4:1** |
| `violet · pink · yellow · mint · teal · purple` | see tokens | sticker fills (nav pill, badges, icon squares, contact panel) | ink on each ≥ **6.7:1** |

**Per-teardown accents** (`--color-deck-*`): each deck keeps its cover-derived identity as a *fill* — stat chips, meta pills, beat numbers, index-row hover fills. All carry ink text at ≥ **8.3:1**. The mint `badge` is reserved for the availability status; ember is reserved for the primary action.

## 2. Typography

Same three families as before (self-hosted, `public/fonts/`, ~200 KB total, three preloaded):

- **Archivo Variable** — display + UI. Display and section headings are now **font-black UPPERCASE** (the chunky poster voice); weights 500–900 in UI.
- **Newsreader Variable** — reading face for theses, narrative, about; italic for subtitles and pull-quotes. Keeps the research register so the playfulness never reads as unserious.
- **Space Mono** — index numbers, metadata labels (11px, +0.14em, uppercase), stat chips.

Scale tokens unchanged in structure; display/title clamp lower (`display` 44→88px, `title` 36→68px) because uppercase black weight carries more optical size. Reading measure stays ≤ 65ch.

**Capitalization rule:** UPPERCASE for display/section headings (H1/H2) and mono labels; sentence case for everything else (H3s, buttons, links, body).

## 3. Shape, borders, elevation

- **Borders:** 2px ink outlines on every component surface; 2px section rules; hairline (`line`, ink @ 15%) only inside lists.
- **Radius:** `ctl` 12px (buttons, chips), `media` 14px (images), `card` 20px (panels), `badge` 999px (pills).
- **Elevation = hard offset shadows**, never blur: `sticker-sm` 2px, `sticker` 4px, `sticker-lg` 7px — all pure ink. Interactive surfaces lift on hover (translate −2,−2 + `sticker-lg`) and press on active (translate +2,+2 + `sticker-sm`).

## 4. Motion

Contract unchanged: motion must explain or guide. Tokens: `quick` 140ms / `base` 280ms / `reveal` 640ms; `out-expo` for reveals, `swift` for state.

- Hero entrance: pure CSS (`.enter`), staggered, zero JS dependency (protects LCP).
- Scroll reveals: IO-driven, group-level, once (`.reveal`).
- Route enter + prev/next chain orients movement through the library.
- Sticker stack `drift`: 7s idle float, ±8px — the one decorative exception, earned by being the hero's signature.
- **Reduced motion** collapses all of the above globally, including `drift`.
- About word-reveal floor: **0.6 opacity = 4.66:1 (AA) at rest**.

## 5. Page temperature

- **Home:** full sticker energy — tilted cover stack, icon badges, edge doodles, colored cards, violet contact panel.
- **Case-study pages:** same language, lower temperature — cream canvas, one meta pill + one stat chip + numbered beats in the deck's accent, no doodles. The teardown reads like research; the system just frames it.

## 6. Iconography

Lucide, 2px stroke, 16–24px, always inside `icon-badge` squares or inline with text. No emoji.
