import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const copyFiles = [
  "index.html",
  "src/pages/Index.tsx",
  "src/components/Hero.tsx",
  "src/components/About.tsx",
  "src/components/TransparentPricing.tsx",
  "src/components/Contact.tsx",
  "src/components/Footer.tsx",
  "src/components/IndustrialCooling.tsx",
  "src/components/MaintenanceTimeline.tsx",
  "src/pages/Fujitsu.tsx",
  "src/pages/Fisher.tsx",
  "src/pages/FisherHoszivattyu.tsx",
  "src/pages/Reszletek.tsx",
  "src/pages/LakossagiKlima.tsx",
  "src/components/fujitsu/FujitsuHero.tsx",
  "src/components/fujitsu/FujitsuSummary.tsx",
  "supabase/functions/_shared/contact-emails.ts",
] as const;

const sources = Object.fromEntries(
  copyFiles.map((path) => [
    path,
    readFileSync(resolve(process.cwd(), path), "utf8"),
  ]),
) as Record<(typeof copyFiles)[number], string>;

const allCopy = Object.values(sources).join("\n");
const canonicalExperienceTitle =
  "Klímaszerelés, hőszivattyú és ipari hűtés Budapest | Northwind – szakmai tapasztalat 1993 óta";
const canonicalExperienceDescription =
  "Klímaszerelés, hőszivattyú, klímamosás és ipari hűtéstechnika Budapesten és Pest vármegyében. Szakmai tapasztalat 1993 óta; tételes ajánlat helyszíni felmérés után.";

describe("professional-history copy", () => {
  it("does not use a hard-coded experience counter that becomes stale", () => {
    expect(allCopy).not.toMatch(/\b33(?:\+|\s+év(?:es)?)/iu);
  });

  it("does not claim the unsupported 2003 Northwind date", () => {
    expect(allCopy).not.toMatch(/Northwind(?:\s+néven)?[^\n]{0,40}\b2003\b/iu);
    expect(allCopy).not.toContain("foundingDate");
    expect(allCopy).not.toMatch(/Northwind Hűtéstechnika Kft\.?\s+1993 óta/iu);
  });

  it("states professional experience and the legal company history separately", () => {
    expect(sources["src/components/About.tsx"]).toContain(
      "Szakmai múltunk 1993-ig nyúlik vissza, a Northwind Hűtéstechnika Kft. pedig 2009 óta működik.",
    );
    expect(allCopy).toContain("Szakmai tapasztalat 1993 óta");
    expect(allCopy).toContain("A Northwind Hűtéstechnika Kft. 2009 óta");
  });

  it("keeps static and client-side SEO titles identical", () => {
    expect(sources["index.html"]).toContain(`<title>${canonicalExperienceTitle}</title>`);
    expect(sources["src/pages/Index.tsx"]).toContain(`title="${canonicalExperienceTitle}"`);
  });

  it("keeps static and client-side SEO descriptions identical", () => {
    expect(sources["index.html"]).toContain(
      `name="description" content="${canonicalExperienceDescription}"`,
    );
    expect(sources["src/pages/Index.tsx"]).toContain(
      `description="${canonicalExperienceDescription}"`,
    );
  });
});
