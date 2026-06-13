import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      // Process both index.html and 404.html so GitHub Pages can serve
      // 404.html for any unknown route and the SPA picks up the original
      // URL. Both pages reference the same hashed JS bundle.
      input: {
        main: resolve(__dirname, "index.html"),
        "404": resolve(__dirname, "404.html"),
      },
    },
  },
});
