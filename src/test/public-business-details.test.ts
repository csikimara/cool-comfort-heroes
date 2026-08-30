import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("public business details", () => {
  it("keeps the registered office off non-legal marketing surfaces", () => {
    const publicFiles = [
      "index.html",
      "src/pages/Index.tsx",
      "src/components/Contact.tsx",
      "src/components/ContactLocationCard.tsx",
      "src/components/Footer.tsx",
      "src/lib/external.ts",
    ];
    const publicCopy = publicFiles.map(read).join("\n");

    expect(publicCopy).not.toContain("Torbágy");
    expect(publicCopy).not.toContain("NORTHWIND_MAP");
    expect(read("src/pages/PrivacyPolicy.tsx")).toContain(
      "1118 Budapest, Torbágy utca 16. 2. em. 6. ajtó",
    );
  });

  it("describes the company as a service-area business", () => {
    const contact = read("src/components/ContactLocationCard.tsx");
    const footer = read("src/components/Footer.tsx");

    expect(contact).toContain("Ügyfélfogadási helyet nem tartunk fenn");
    expect(contact).toContain("Budapest és Pest vármegye");
    expect(footer).toContain("Helyszíni kiszállás");
  });

  it("does not publish unsupported numeric trust claims", () => {
    const hero = read("src/components/Hero.tsx");
    const maintenance = read("src/components/MaintenanceTimeline.tsx");

    expect(hero).not.toContain("2000+");
    expect(hero).not.toContain("100%");
    expect(maintenance).not.toContain("25%-kal");
  });

  it("does not invent public opening hours, a price band or an X account", () => {
    const homepage = read("index.html");
    expect(homepage).not.toContain("openingHoursSpecification");
    expect(homepage).not.toContain('"priceRange"');
    expect(homepage).not.toContain('name="twitter:site"');
  });

  it("explains that pricing follows the on-site survey", () => {
    const pricing = read("src/components/TransparentPricing.tsx");
    const homepage = read("index.html");

    expect(pricing).toContain("Előzetes árat látatlanban nem adunk");
    expect(pricing).toContain("ezek alapján tételes ajánlatot");
    expect(homepage).not.toContain("fix árak");
  });

  it("uses working, destination-specific footer links", () => {
    const footer = read("src/components/Footer.tsx");

    expect(footer).toContain('href="mailto:northwind@northwind.hu"');
    expect(footer).toContain('href="/#rolunk"');
    expect(footer).toContain('to="/fisher-hoszivattyu"');
    expect(footer).not.toContain('href="#"');
    expect(footer).not.toContain('/reszletek#rolunk');
  });
});
