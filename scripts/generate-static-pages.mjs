import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  NOT_FOUND_META,
  STATIC_PAGE_META,
  renderStaticPage,
} from "./static-page-utils.mjs";

const distDir = resolve("dist");
const ssrDir = resolve(".ssr-dist");
const template = readFileSync(resolve(distDir, "index.html"), "utf8");
const { render } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

const assertRenderedPage = (markup, meta) => {
  if (!markup.trim()) {
    throw new Error(`Empty prerender output for ${meta.path}`);
  }
  if (meta.noindex) return;
  if (!/<main\b/i.test(markup) || !/<h1\b/i.test(markup)) {
    throw new Error(`Missing semantic page content for ${meta.path}`);
  }
};

try {
  for (const meta of STATIC_PAGE_META) {
    const markup = await render(meta.path);
    assertRenderedPage(markup, meta);
    const output =
      meta.path === "/"
        ? resolve(distDir, "index.html")
        : resolve(distDir, `${meta.path.slice(1)}.html`);
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, renderStaticPage(template, meta, markup));
  }

  const notFoundMarkup = await render(NOT_FOUND_META.path);
  assertRenderedPage(notFoundMarkup, NOT_FOUND_META);
  writeFileSync(
    resolve(distDir, "404.html"),
    renderStaticPage(template, NOT_FOUND_META, notFoundMarkup),
  );
} finally {
  rmSync(ssrDir, { recursive: true, force: true });
}

console.log(`fully prerendered HTML written (${STATIC_PAGE_META.length + 1} pages)`);
