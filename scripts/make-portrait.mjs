// One-off helper: turns public/image.png (solid light background) into
// public/portrait.png with the background made transparent so it blends
// into the dark theme. Background is detected by flood fill from the
// image borders so the white shirt is left untouched.
import { createCanvas, loadImage } from "@napi-rs/canvas";
import fs from "node:fs/promises";

const img = await loadImage("public/image.png");
const { width: w, height: h } = img;
const canvas = createCanvas(w, h);
const ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);
const data = ctx.getImageData(0, 0, w, h);
const px = data.data;

const tolerance = 28;
const isBg = (i) => {
  const r = px[i], g = px[i + 1], b = px[i + 2];
  return 255 - r < tolerance && 255 - g < tolerance && 255 - b < tolerance;
};

const visited = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, x + (h - 1) * w);
for (let y = 0; y < h; y++) stack.push(y * w, w - 1 + y * w);

while (stack.length) {
  const p = stack.pop();
  if (visited[p]) continue;
  visited[p] = 1;
  const i = p * 4;
  if (!isBg(i)) continue;
  px[i + 3] = 0;
  const x = p % w, y = (p / w) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < w - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - w);
  if (y < h - 1) stack.push(p + w);
}

ctx.putImageData(data, 0, 0);
await fs.writeFile("public/portrait.png", await canvas.encode("png"));
console.log("wrote public/portrait.png");
