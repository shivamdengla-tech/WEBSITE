# Component specifications

Shared conventions: focus-visible = `outline: 2px solid var(--color-ember); outline-offset: 2px` on every interactive element (`--color-ember-deep` on paper surfaces). All transitions use `--duration-quick` + `--ease-swift` unless noted. Sentence case labels. No emoji, no glows, no scale-zoom hovers.

## Button
- **Primary** (`.btn-primary`): mono 14px, `bg-cream text-ink`, radius `ctl`, padding 12×20, arrow icon 16px.
  - hover: `bg-ember text-cream`, arrow nudges 2px right (transform on icon only).
  - active: translate-y 1px. focus-visible: standard ring. disabled: 40% opacity, no pointer.
- **Quiet** (`.btn-quiet`): same metrics, transparent bg, 1px `line-strong` border, `text-cream`.
  - hover: border-color `cream`, bg `ink-card`. Same active/focus/disabled.
- On paper surfaces: swap cream↔ink-text, border `line-ink`.

## Inline link (`.link`)
Underline `1px` offset 3px in `line-strong`; hover: underline-color `ember`, text stays. External links append 14px arrow-up-right. Focus-visible standard.

## Nav
Fixed top, 64px tall, `max-w-6xl` container. Transparent over hero; after 24px scroll gains `bg-ink/85 + backdrop-blur + bottom hairline` (class toggle, `--duration-base`).
- Left: wordmark "Shivam Dengla" (Archivo 600, 16px).
- Right ≥768px: Work / About / Writing / Contact links (14px, `gray` → hover `cream`, underline-draw 1px) + Email quiet button.
- <768px: "Menu" button (44×44 target) toggling a full-width panel under the bar (`bg-ink`, hairline top, links at 22px, 48px row height). Aria: `aria-expanded`, `aria-controls`; Esc closes; focus trapped within while open.
- Skip link: visually-hidden "Skip to content", visible on focus, first tabbable.

## Teardown index row (`.deck-row`)
Ledger row: hairline top (last row hairline bottom), grid `[64px 1fr auto auto]`; mono № in `gray-dim`, title Archivo 500 22px, category + year mono 11px caps `gray-dim`. Entire row is one link.
- hover/focus-within: № and title→ deck accent color; 16px arrow fades in at right; background `ink-raised`.
- Mobile: № + title on line 1, meta on line 2; min height 64px.

## Featured casebook entry (`.deck-feature`)
Asymmetric 12-col: cover (cols 1–7, 16:9, radius `media`, `object-contain` on `ink-card` — covers are never cropped) + text block (cols 8–12): mono metadata line, title 36px, one-line thesis (serif italic 19px `gray`), key stat in deck accent (mono 700). Whole entry linked; hover: cover lifts brightness 105% + title underline-draw in accent. Alternate sides per entry (odd entries mirror).

## Key-stat block (`.stat`)
`text-stat` Archivo 700 in deck accent (or ember), mono 11px caps caption in `gray-dim` under it, hairline above. Used once per case page; never in rows of three equal cards.

## Case-study page template
1. Breadcrumb (mono 11px: "Index / Teardowns").
2. Meta line: casebook №, category, year, page count — mono caps separated by "·".
3. Title (`text-title`) + deck's own subtitle (serif italic 22px, `gray`, ≤ 62ch).
4. Key stat block.
5. Cover (16:9, `media` radius, full column width, lazy, explicit dimensions — no CLS).
6. "Inside the deck": 3–5 numbered beats — mono № + Archivo 600 heading 22px + serif 19px body ≤ 62ch.
7. Takeaway: serif italic 28px pull-line with ember hairline left border 2px.
8. CTA row: primary button "Open the full deck" + mono size label ("PDF · 19 MB") + quiet button "Back to index".
9. Prev/next: two-cell hairline grid, mono "Previous/Next" caption + title, whole cells linked.

## Tag / filter (`.tag`)
Mono 11px caps, 1px hairline border, radius `ctl`, 8×12 padding, 44px touch target via padding.
- selected: `bg-cream text-ink border-cream` (on paper: inverted). hover: border `line-strong`→`cream`. Behaves as `role="radio"` group for category filtering.

## Subscribe embed
Substack iframe (lazy, `title` set) inside a paper panel with serif lede and mono caption; fallback link "Read on Substack" always present under it.

## Footer
Hairline top; 12-col: left = name + one-line thesis (serif italic), right = mono link columns (Email / LinkedIn / Substack / Source). Bottom row: mono 11px `gray-dim` copyright + "Set in Archivo, Newsreader & Space Mono".

## Reveal (scroll)
`.reveal` elements start `opacity 0 / translateY(12px)` **only when JS is present** (`html.js .reveal`), animate to visible via IO at 15% visibility, once, `--duration-reveal` + `--ease-out-expo`, stagger via `--reveal-delay`. Without JS or with reduced motion: fully visible, no transform. SSG markup is therefore always readable.
