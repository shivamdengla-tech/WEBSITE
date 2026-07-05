// Generates sized WebP derivatives of the deck covers so the site never
// ships a 2 MB PNG into a 400px slot. Runs in prebuild, skips fresh files.
import { createCanvas, loadImage } from "@napi-rs/canvas";
import fs from "node:fs";
import path from "node:path";

const srcDir = "public/decks/covers";
const outDir = "public/decks/covers/opt";
const widths = [640, 1280];

fs.mkdirSync(outDir, { recursive: true });

const pngs = fs.readdirSync(srcDir).filter((f) => f.endsWith(".png"));
for (const file of pngs) {
  const src = path.join(srcDir, file);
  const stem = file.replace(/\.png$/, "");
  const srcM = fs.statSync(src).mtimeMs;
  const img = await loadImage(src);
  for (const w of widths) {
    const out = path.join(outDir, `${stem}-${w}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs > srcM) continue;
    const h = Math.round((img.height / img.width) * w);
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    fs.writeFileSync(out, await canvas.encode("webp", 82));
    console.log(`covers: ${out} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
  }
}
