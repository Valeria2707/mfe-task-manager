import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "manageTask",
      filename: "manageTaskRemoteEntry.js",
      exposes: {
        "./ManageTask": "./src/App",
      },
      shared: ["react", "react-dom"],
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
  },
  server: {
    port: 5002,
  },
});
