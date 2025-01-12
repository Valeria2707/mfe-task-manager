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
        remoteAuthApp: "http://localhost:5001/assets/authRemoteEntry.js",
        remoteTaskManagerApp:
          "http://localhost:5002/assets/manageTaskRemoteEntry.js",
        angularApp: {
          external: "http://localhost:4201/remoteEntry.js",
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
      external: ["angularApp/Tasklist"],
    },
  },
});
