import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  NOT_FOUND_META,
  STATIC_PAGE_META,
  renderStaticPage,
} from "../../scripts/static-page-utils.mjs";

const template = readFileSync(resolve(process.cwd(), "index.html"), "utf8");

describe("static route metadata", () => {
  it("provides a unique canonical URL and page metadata for each public route", () => {
    const publicRoutes = STATIC_PAGE_META.filter((meta) => !meta.noindex);
    const canonicals = publicRoutes.map((meta) =>
      meta.path === "/" ? "https://northwind.hu/" : `https://northwind.hu${meta.path}`,
    );

    expect(new Set(canonicals).size).toBe(canonicals.length);

    for (const meta of publicRoutes) {
      const html = renderStaticPage(template, meta);
      const canonical = meta.path === "/" ? "https://northwind.hu/" : `https://northwind.hu${meta.path}`;
      expect(html).toContain(`<title>${meta.title}</title>`);
      expect(html).toContain(`rel="canonical" href="${canonical}"`);
      expect(html).toContain(`property="og:url" content="${canonical}"`);
      expect(html).not.toContain('name="robots" content="noindex, nofollow"');
    }
  });

  it("marks admin, authentication and 404 HTML as noindex", () => {
    const privatePages = [
      ...STATIC_PAGE_META.filter((meta) => meta.noindex),
      NOT_FOUND_META,
    ];

    for (const meta of privatePages) {
      const html = renderStaticPage(template, meta);
      expect(html).toContain('name="robots" content="noindex, nofollow"');
      expect(html).not.toContain('type="application/ld+json"');
    }
  });

  it("lets crawlers read the noindex directive instead of blocking it in robots.txt", () => {
    const robots = readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf8");
    expect(robots).not.toMatch(/Disallow:\s*\/(?:admin|auth)/i);
  });

  it("does not present the non-customer-facing registered office as a local business location", () => {
    expect(template).toContain('"@type": "Organization"');
    expect(template).not.toContain('"streetAddress"');
    expect(template).not.toContain('"addressRegion"');
    expect(template).toContain('"areaServed"');
  });

  it("keeps the generated sitemap aligned with every indexable static route", () => {
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");

    for (const meta of STATIC_PAGE_META.filter((item) => !item.noindex)) {
      const url = meta.path === "/" ? "https://northwind.hu/" : `https://northwind.hu${meta.path}`;
      expect(sitemap).toContain(`<loc>${url}</loc>`);
    }
    expect(sitemap).not.toContain("https://northwind.hu/admin");
    expect(sitemap).not.toContain("https://northwind.hu/auth");
  });
});
