import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent, AppProviders } from "./App";

const PRERENDER_TIMEOUT_MS = 30_000;

export const render = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    let settled = false;
    let renderError: unknown;
    const timer: { id?: ReturnType<typeof setTimeout> } = {};

    const finishWithError = (error: unknown) => {
      if (settled) return;
      settled = true;
      if (timer.id) clearTimeout(timer.id);
      reject(error instanceof Error ? error : new Error(String(error)));
    };

    const stream = renderToPipeableStream(
      <AppProviders>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </AppProviders>,
      {
        onAllReady() {
          const output = new PassThrough();
          let html = "";

          output.setEncoding("utf8");
          output.on("data", (chunk: string) => {
            html += chunk;
          });
          output.on("error", finishWithError);
          output.on("end", () => {
            if (renderError) {
              finishWithError(renderError);
              return;
            }
            if (settled) return;
            settled = true;
            if (timer.id) clearTimeout(timer.id);
            resolve(html);
          });

          stream.pipe(output);
        },
        onShellError: finishWithError,
        onError(error) {
          renderError ??= error;
        },
      },
    );

    timer.id = setTimeout(() => {
      stream.abort();
      finishWithError(new Error(`Prerender timed out for ${url}`));
    }, PRERENDER_TIMEOUT_MS);
  });
