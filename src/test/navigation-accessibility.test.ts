import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import * as ts from "typescript";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const collectTsxFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? collectTsxFiles(path)
      : entry.name.endsWith(".tsx")
        ? [path]
        : [];
  });

const jsxAttributes = (
  node: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
) => new Map(
  node.attributes.properties
    .filter(ts.isJsxAttribute)
    .map((attribute) => [attribute.name.getText(), attribute]),
);

describe("navigation and accessibility baseline", () => {
  it("provides a working skip link and a main-content target on every route", () => {
    const app = read("src/App.tsx");
    const skipLink = read("src/components/SkipLink.tsx");
    const routePages = [
      "Index",
      "PrivacyPolicy",
      "Impressum",
      "Fujitsu",
      "Reszletek",
      "LakossagiKlima",
      "Fisher",
      "FisherHoszivattyu",
      "Galeria",
      "Auth",
      "Admin",
      "NotFound",
    ];

    expect(app).toContain("<SkipLink />");
    expect(skipLink).toContain('href="#main-content"');
    for (const page of routePages) {
      const source = read(`src/pages/${page}.tsx`);
      expect(source, page).toContain('id="main-content"');
      expect(source, `${page} focus target`).toMatch(/id="main-content"[^>]*tabIndex=\{-1\}/);
    }
    expect(app).toMatch(/id="main-content"[^>]*tabIndex=\{-1\}/);
  });

  it("keeps every literal new-tab link isolated from window.opener", () => {
    const failures: string[] = [];
    for (const file of collectTsxFiles("src")) {
      const source = readFileSync(file, "utf8");
      const sourceFile = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      const visit = (node: ts.Node) => {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          if (node.tagName.getText(sourceFile) === "a") {
            const attributes = jsxAttributes(node);
            const target = attributes.get("target")?.initializer?.getText(sourceFile);
            if (target === '"_blank"') {
              const rel = attributes.get("rel")?.initializer?.getText(sourceFile) ?? "";
              if (!rel.includes("noopener") || !rel.includes("noreferrer")) {
                failures.push(file);
              }
            }
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(sourceFile);
    }
    expect(failures).toEqual([]);
  });

  it("gives native buttons an explicit type and every image alternative text", () => {
    const failures: string[] = [];
    for (const file of collectTsxFiles("src")) {
      const source = readFileSync(file, "utf8");
      const sourceFile = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      const visit = (node: ts.Node) => {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tag = node.tagName.getText(sourceFile);
          const attributes = jsxAttributes(node);
          if (tag === "button" && !attributes.has("type")) {
            failures.push(`${file}: button type`);
          }
          if (tag === "img" && !attributes.has("alt")) {
            failures.push(`${file}: image alt`);
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(sourceFile);
    }
    expect(failures).toEqual([]);
  });

  it("keeps published hash links backed by unique scroll targets", () => {
    const pricing = read("src/components/TransparentPricing.tsx");
    const details = read("src/pages/Reszletek.tsx");
    const industrial = read("src/components/IndustrialCooling.tsx");

    expect(pricing).toContain('id="arazas"');
    expect(industrial).toContain('id="ipari"');
    expect(details).not.toContain('id="ipari"');
    expect(industrial).toContain('id={`ipari-0${idx + 1}`}');
    expect(industrial).toContain("scroll-mt-28");
  });
});
