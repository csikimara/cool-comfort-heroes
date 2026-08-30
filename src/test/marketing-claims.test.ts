import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const publicMarketingFiles = [
  "src/components/About.tsx",
  "src/components/Contact.tsx",
  "src/components/IndustrialCooling.tsx",
  "src/components/JapaneseTechnology.tsx",
  "src/components/MaintenanceTimeline.tsx",
  "src/components/Services.tsx",
  "src/components/TransparentPricing.tsx",
  "src/pages/Fisher.tsx",
  "src/pages/FisherHoszivattyu.tsx",
  "src/pages/Fujitsu.tsx",
  "src/pages/LakossagiKlima.tsx",
  "src/pages/Reszletek.tsx",
  "scripts/static-page-utils.mjs",
].map(read).join("\n");

describe("consumer-facing claims", () => {
  it("does not promise a free survey or quote without an approved price rule", () => {
    expect(publicMarketingFiles).not.toMatch(/ingyen(?:es)?/iu);
  });

  it("does not state absolute outcome or unsupported lifetime guarantees", () => {
    expect(publicMarketingFiles).not.toMatch(
      /garantáljuk|garantált élettartam|15-20 év múlva|az a végösszeg|egyetlen csepp|gyökerestől|allergiamentes|minimális rezsi|évekkel meghosszabbít|kiválthatja fűtési/iu,
    );
  });

  it("avoids time-sensitive or unprovable product superlatives", () => {
    expect(publicMarketingFiles).not.toMatch(
      /legkeresettebb|legkelendőbb|legújabb Fujitsu|legmagasabb hatékonyság/iu,
    );
    expect(publicMarketingFiles).not.toMatch(
      /csúcsmodell|komfort újdonság|bármilyen típusú|legyen szó bármilyen típusról|sarkvidéki fűtés/iu,
    );
  });

  it("links the extended warranties to the manufacturers' current conditions", () => {
    expect(read("src/pages/Fisher.tsx")).toContain("https://www.fisherklima.hu/tamogatas/kiterjesztett-garancia");
    expect(read("src/pages/Fisher.tsx")).toContain("Többszörös Business Superbrands");
    expect(read("src/pages/Fisher.tsx")).toContain("https://www.fisherklima.hu/");
    expect(read("src/pages/Fujitsu.tsx")).toContain("https://www.fujitsuklima.hu/termektamogatas/kiterjesztett-garancia");
    expect(read("src/components/fujitsu/FujitsuHero.tsx")).toContain("https://www.fujitsuklima.hu/hol-kaphato");
  });
});
