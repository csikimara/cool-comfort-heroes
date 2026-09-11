import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "node:url";
import { componentTagger } from "lovable-tagger";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // Keep the development server loopback-only by default. An intentional,
    // isolated remote preview may override this at the command line with
    // `vite --host 0.0.0.0`; production is always the static `dist/` build.
    host: "127.0.0.1",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "./src"),
    },
  },
}));
