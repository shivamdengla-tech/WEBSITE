// Renders page 1 of every deck PDF in public/decks to a PNG cover in
// public/decks/covers. Runs automatically before `vite build` (prebuild).
import { pdf } from "pdf-to-img";
import fs from "node:fs/promises";
import path from "node:path";

const decks = [
  ["BEGINNERS DECK TO VAPE.pdf", "beginners-deck-to-vape"],
  ["Beyond_The_Sachet.pdf", "beyond-the-sachet"],
  ["Reimagining_The_Potato_Chip_PM_Handbook.pdf", "reimagining-the-potato-chip"],
  ["The Bottle Is the Product.pdf", "the-bottle-is-the-product"],
  ["The Bottle That Sells the Scent.pdf", "the-bottle-that-sells-the-scent"],
  ["The Plastic Wait - Shivam Dengla.pdf", "the-plastic-wait"],
];

const outDir = path.resolve("public/decks/covers");
await fs.mkdir(outDir, { recursive: true });

for (const [file, slug] of decks) {
  const out = path.join(outDir, `${slug}.png`);
  const src = path.resolve("public/decks", file);
  const [pdfStat, coverStat] = await Promise.all([
    fs.stat(src),
    fs.stat(out).catch(() => null),
  ]);
  if (coverStat && coverStat.mtimeMs > pdfStat.mtimeMs) {
    console.log(`covers: ${slug}.png up to date`);
    continue;
  }
  const doc = await pdf(src, { scale: 2 });
  for await (const page of doc) {
    await fs.writeFile(out, page);
    break;
  }
  console.log(`covers: rendered ${slug}.png`);
}
