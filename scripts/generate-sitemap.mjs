// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { STATIC_PAGE_META } from "./static-page-utils.mjs";

const BASE_URL = "https://northwind.hu";

const sitemapDetails = (path) => {
  if (path === "/") return { changefreq: "weekly", priority: "1.0" };
  if (path === "/fujitsu" || path === "/lakossagi-klima") {
    return { changefreq: "monthly", priority: "0.9" };
  }
  if (path === "/fisher" || path === "/fisher-hoszivattyu") {
    return { changefreq: "monthly", priority: "0.8" };
  }
  if (path === "/reszletek") return { changefreq: "monthly", priority: "0.7" };
  if (path.startsWith("/referenciak/")) {
    return { changefreq: "monthly", priority: "0.6" };
  }
  return { changefreq: "yearly", priority: "0.3" };
};

const entries = STATIC_PAGE_META
  .filter((meta) => !meta.noindex)
  .map((meta) => ({ path: meta.path, ...sitemapDetails(meta.path) }));

function generateSitemap(list) {
  const urls = list.map((entry) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${entry.path}</loc>`,
      entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
      entry.priority ? `    <priority>${entry.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
