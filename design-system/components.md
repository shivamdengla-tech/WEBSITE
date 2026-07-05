# Component specifications — "Sticker Desk"

Shared conventions: every interactive element has default / hover / focus-visible / active states. Focus = 3px `ember-deep` outline, 2px offset, everywhere. All component surfaces: 2px `ink` border. Hover lifts (translate −2,−2, shadow `sticker`→`sticker-lg`); active presses (translate +2,+2, shadow `sticker-sm`). No emoji, no blur shadows, no zoom-only hovers.

## Button
- **Primary** (`.btn-primary`): `ember` fill, ink text, 2px ink border, radius `ctl`, `shadow-sticker`, Archivo 650 16px, 14×22 padding, optional 16px arrow.
- **Quiet** (`.btn-quiet`): same metrics, `panel` fill. May take a palette fill via utility (e.g. nav "Email me" = violet).
- States: lift / press / focus ring; disabled 40% opacity.

## Badge (`.badge`)
Mint pill, 2px ink border, `shadow-sticker-sm`, mono 11px caps. Reserved for the availability status ("Open to product roles & internships"). Contains a small panel dot.

## Sticker card (`.sticker`)
`panel` fill, 2px ink border, radius `card`, `shadow-sticker`. When it's a link, it lifts/presses. Variants by fill utility (contact panel = `bg-violet`).

## Icon badge (`.icon-badge`)
3.25rem square, radius `ctl`, 2px ink border, `shadow-sticker-sm`, palette fill per use (violet/yellow/mint/pink in Range), lucide icon 24px ink.

## Nav
Fixed, 64px. Transparent over hero; after 24px scroll: `paper/90` blur + 2px ink bottom border. Wordmark = violet monogram square + name. Links with 2px underline-draw. "Email me" = violet quiet button. <768px: Menu button (44px target) → full-width paper panel, 2px ink top border, Esc closes, `aria-expanded`/`aria-controls`. Skip link first-tabbable.

## Hero cover stack
Three featured covers, absolutely positioned in a 5:6 field, rotated −6°/3°/−2°, `media` radius, 2px ink borders, `shadow-sticker`, slow `drift` idle (staggered delays; off under reduced motion). Each cover links to its teardown; hover scales 1.03. Two aria-hidden icon stickers (yellow circle Eye, teal square TrendingUp). First cover is the LCP image: preloaded + `fetchpriority=high`, never lazy.

## Featured casebook entry
`.sticker` link, 12-col grid: cover (cols 1–7, native 16:9, 2px ink border, never cropped) + text (cols 8–12): mono edition line, Archivo 800 title, serif italic subtitle, **stat chip** (deck-accent fill, 2px border, `shadow-sticker-sm`, mono bold) + mono caption. Odd entries mirror.

## Teardown index row
Hairline-separated rows: mono №, semibold title, mono category. Hover/focus: whole row fills with the deck's accent (ink text keeps ≥8.3:1), arrow fades in, secondary text darkens to ink. Mobile: two-line, ≥64px.

## Filter tag
Mono 11px caps pill, 2px ink border, `shadow-sticker-sm`. Selected: `ink` fill + `paper` text. Behaves as `role="radio"` group.

## Case-study template (calm temperature)
Breadcrumb (mono) → meta pill (accent fill, badge radius) → UPPERCASE black title → serif italic subtitle → **stat chip** (accent fill, `text-stat`, `shadow-sticker`) + mono caption → cover (radius `card`, 2px border, `shadow-sticker`) → thesis (serif 22px, 3/8 asymmetric grid) → "Inside the deck" numbered beats (accent-filled number circles, 2px borders) → takeaway blockquote (4px accent left border, serif italic 28px) → CTA row (primary button + honest size label) → hire prompt → prev/next `.sticker` cards.

## Subscribe embed
Substack iframe inside a `.sticker` with 8px padding; mono caption below; fallback link always present.

## Footer
`panel` fill, 2px ink top border. Monogram + name, serif italic thesis line, mono bold link row, mono colophon.

## Reveal (scroll) & enters
`.reveal` (IO, once, 12px rise) below the fold; `.enter` (pure CSS, staggered) in the hero; `.page-enter` on route change; `.drift` on the stack. All disabled under `prefers-reduced-motion`. SSG markup is always fully visible without JS.
