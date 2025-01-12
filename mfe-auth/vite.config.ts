import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "auth",
      filename: "authRemoteEntry.js",
      exposes: {
        "./Auth": "./src/App",
      },
      shared: ["react", "react-dom", "@tanstack/react-router"],
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
  },
});
