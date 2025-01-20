import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "wrapper-app",
      remotes: {
        remoteAuthApp:
          "https://d2s8ziqnavmq8u.cloudfront.net/assets/authRemoteEntry.js",
        remoteTaskManagerApp:
          "https://d3p735ri8iwner.cloudfront.net/assets/manageTaskRemoteEntry.js",
        angularApp: {
          external: "https://d36258l4iadhdx.cloudfront.net/remoteEntry.js",
          externalType: "url",
          format: "var",
        },
      },
      shared: ["react", "react-dom", "@tanstack/react-router"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ["angularApp/AngularTaskApp"],
    },
  },
});
