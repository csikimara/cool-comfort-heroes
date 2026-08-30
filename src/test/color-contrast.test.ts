import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Hsl = [number, number, number];
type Rgb = [number, number, number];

const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

const selectorBody = (selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`));
  if (!match) throw new Error(`Missing CSS selector: ${selector}`);
  return match[1];
};

const token = (body: string, name: string): Hsl => {
  const match = body.match(
    new RegExp(`--${name}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`),
  );
  if (!match) throw new Error(`Missing HSL token: ${name}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const gradientStops = (body: string, name: string): Hsl[] => {
  const value = body.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1] ?? "";
  return [...value.matchAll(/hsl\(([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g)]
    .map((match) => [Number(match[1]), Number(match[2]), Number(match[3])] as Hsl);
};

const hslToRgb = ([h, saturation, lightness]: Hsl): Rgb => {
  const s = saturation / 100;
  const l = lightness / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - chroma / 2;
  let rgb: Rgb;

  if (h < 60) rgb = [chroma, x, 0];
  else if (h < 120) rgb = [x, chroma, 0];
  else if (h < 180) rgb = [0, chroma, x];
  else if (h < 240) rgb = [0, x, chroma];
  else if (h < 300) rgb = [x, 0, chroma];
  else rgb = [chroma, 0, x];

  return rgb.map((channel) => channel + m) as Rgb;
};

const luminance = (rgb: Rgb) =>
  rgb
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (sum, channel, index) =>
        sum + channel * ([0.2126, 0.7152, 0.0722][index] ?? 0),
      0,
    );

const contrast = (foreground: Hsl, background: Hsl) => {
  const first = luminance(hslToRgb(foreground));
  const second = luminance(hslToRgb(background));
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

describe("WCAG colour-token contrast", () => {
  it.each([
    [":root", "primary", "primary-foreground"],
    [":root", "accent", "accent-foreground"],
    [":root", "destructive", "destructive-foreground"],
    [":root", "muted-foreground", "muted"],
    [".dark", "primary", "primary-foreground"],
    [".dark", "accent", "accent-foreground"],
    [".dark", "destructive", "destructive-foreground"],
    [".dark", "muted-foreground", "muted"],
    [".fujitsu-brand", "primary", "primary-foreground"],
    [".fujitsu-brand", "accent", "accent-foreground"],
    [".fujitsu-brand", "muted-foreground", "muted"],
    [".fisher-brand", "primary", "primary-foreground"],
    [".fisher-brand", "accent", "accent-foreground"],
    [".fisher-brand", "muted-foreground", "muted"],
  ])("keeps %s %s/%s at AA contrast", (selector, foreground, background) => {
    const body = selectorBody(selector);
    expect(contrast(token(body, foreground), token(body, background))).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps the default accent usable as text on the page background", () => {
    const root = selectorBody(":root");
    expect(contrast(token(root, "accent"), token(root, "background"))).toBeGreaterThanOrEqual(4.5);
  });

  it.each([":root", ".dark", ".fujitsu-brand", ".fisher-brand"])(
    "keeps every %s hero-gradient stop readable",
    (selector) => {
      const body = selectorBody(selector);
      const stops = gradientStops(body, "gradient-hero");
      expect(stops.length).toBeGreaterThanOrEqual(2);
      for (const stop of stops) {
        expect(contrast(token(body, "primary-foreground"), stop)).toBeGreaterThanOrEqual(4.5);
      }
    },
  );

  it("does not dim normal-size copy placed on hero gradients", () => {
    const files = [
      "src/components/Hero.tsx",
      "src/components/About.tsx",
      "src/pages/LakossagiKlima.tsx",
      "src/pages/Reszletek.tsx",
    ].map((path) => readFileSync(resolve(process.cwd(), path), "utf8"));

    expect(files.join("\n")).not.toMatch(/text-primary-foreground\/(?:70|80)\b/);
  });

  it("uses accessible model-card gradients for text and buttons", () => {
    const fujitsu = readFileSync(resolve(process.cwd(), "src/pages/Fujitsu.tsx"), "utf8");
    expect(fujitsu).not.toMatch(
      /accentClass: "from-(?:sky|amber|orange|red|emerald|indigo|purple|fuchsia)-(?:400|500|600)/,
    );
  });
});
