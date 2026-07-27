// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://northwind.hu";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const gallerySlugs = [
  "lakossagi-split",
  "hoszivattyu",
  "legcsatornazhato",
  "karbantartas",
  "ipari-hutes",
  "legtechnika",
  "fujitsu-lakossagi",
  "fujitsu-waterstage",
  "fujitsu-legcsatornazhato",
  "fujitsu-vrf",
];

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/fujitsu", changefreq: "monthly", priority: "0.9" },
  { path: "/lakossagi-klima", changefreq: "monthly", priority: "0.9" },
  { path: "/fisher", changefreq: "monthly", priority: "0.8" },
  { path: "/fisher-hoszivattyu", changefreq: "monthly", priority: "0.8" },
  { path: "/reszletek", changefreq: "monthly", priority: "0.7" },
  ...gallerySlugs.map((slug) => ({
    path: `/referenciak/${slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
  { path: "/adatvedelem", changefreq: "yearly", priority: "0.3" },
];

function generateSitemap(list: SitemapEntry[]) {
  const urls = list.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);