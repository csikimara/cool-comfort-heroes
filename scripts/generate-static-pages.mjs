import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  NOT_FOUND_META,
  STATIC_PAGE_META,
  renderStaticPage,
} from "./static-page-utils.mjs";

const distDir = resolve("dist");
const template = readFileSync(resolve(distDir, "index.html"), "utf8");

for (const meta of STATIC_PAGE_META) {
  const output =
    meta.path === "/"
      ? resolve(distDir, "index.html")
      : resolve(distDir, `${meta.path.slice(1)}.html`);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, renderStaticPage(template, meta));
}

writeFileSync(
  resolve(distDir, "404.html"),
  renderStaticPage(template, NOT_FOUND_META),
);

console.log(`static HTML written (${STATIC_PAGE_META.length + 1} pages)`);
