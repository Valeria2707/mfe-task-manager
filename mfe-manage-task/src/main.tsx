import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      onNavigate={(path: string) => {
        console.log("Navigate to ", path);
      }}
    />
  </StrictMode>
);
