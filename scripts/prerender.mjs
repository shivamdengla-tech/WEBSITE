// Static site generation: renders every route to real HTML using the SSR
// bundle, injects per-page head tags, and emits sitemap.xml + robots.txt.
// Runs after `vite build` (client → dist/) and `vite build --ssr` (→ dist-server/).
import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://shivamdengla.in";
const template = fs.readFileSync("dist/index.html", "utf8");
const { render, staticRoutes } = await import("../dist-server/entry-server.js");

for (const route of staticRoutes) {
  const { html, head } = render(route === "/404/" ? "/__not_found__" : route);
  const page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  const outFile =
    route === "/"
      ? "dist/index.html"
      : route === "/404/"
        ? "dist/404.html" // hosting convention for not-found
        : path.join("dist", route, "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  console.log(`prerender: ${outFile}`);
}

const urls = staticRoutes
  .filter((r) => r !== "/404/")
  .map((r) => `  <url><loc>${ORIGIN}${r}</loc></url>`)
  .join("\n");
fs.writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
fs.writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
console.log("prerender: sitemap.xml, robots.txt");
