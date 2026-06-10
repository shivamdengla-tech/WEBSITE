# Shivam Dengla, personal portfolio

React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide, Kanit font, dark theme (#0C0C0C).

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # renders deck covers from the PDFs, then builds to dist/
npm run preview  # serve the production build
```

## Deck covers

`scripts/generate-covers.mjs` renders page 1 of every PDF in `public/decks/` to a PNG in `public/decks/covers/`. It runs automatically before `npm run build` and skips covers that are newer than their PDF.

## Portrait

`public/portrait.png` is generated from `public/image.png` by `scripts/make-portrait.mjs`, which makes the background transparent so the photo blends into the dark theme. Re-run it with `node scripts/make-portrait.mjs` if you replace the source photo.
