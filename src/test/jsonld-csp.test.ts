import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { fisherJsonLd } from "../pages/Fisher";
import { fujitsuJsonLd } from "../pages/Fujitsu";
import { GALLERY_META, galleryJsonLd } from "../pages/Galeria";
import {
  fisherHeatPumpServiceJsonLd,
  industrialCoolingServiceJsonLd,
  residentialClimateServiceJsonLd,
} from "../lib/structured-data";

const sha256Source = (value: unknown) => {
  const hash = createHash("sha256")
    .update(JSON.stringify(value))
    .digest("base64");
  return `'sha256-${hash}'`;
};

describe("dynamic JSON-LD CSP allow-list", () => {
  it("does not publish duplicate breadcrumb destinations", () => {
    for (const [slug, meta] of Object.entries(GALLERY_META)) {
      const breadcrumb = galleryJsonLd(slug, meta.title);
      expect(breadcrumb.itemListElement).toHaveLength(2);
      expect(new Set(breadcrumb.itemListElement.map((item) => item.item)).size).toBe(2);
    }
  });

  it("contains the exact hash of every JSON-LD data block injected at runtime", () => {
    const headers = readFileSync(
      resolve(process.cwd(), "public/.htaccess"),
      "utf8",
    );
    const scriptPolicy = headers.match(/script-src[^;]+/)?.[0] ?? "";
    const values = [
      fisherJsonLd,
      fujitsuJsonLd,
      residentialClimateServiceJsonLd,
      industrialCoolingServiceJsonLd,
      fisherHeatPumpServiceJsonLd,
      ...Object.entries(GALLERY_META).map(([slug, meta]) =>
        galleryJsonLd(slug, meta.title),
      ),
    ];

    for (const value of values) {
      expect(scriptPolicy).toContain(sha256Source(value));
    }
  });
});
