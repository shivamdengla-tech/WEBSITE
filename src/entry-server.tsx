import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { metaForPath, staticRoutes } from "./routes";
import { headHtml } from "./lib/site";

export { staticRoutes };

export function render(url: string): { html: string; head: string } {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: headHtml(metaForPath(url)) };
}
