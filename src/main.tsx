import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./components/theme/theme-provider";
import { UpdatePrompt } from "./components/update-prompt";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <UpdatePrompt />
    </ThemeProvider>
  </React.StrictMode>
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then((reg) => {
        // Detect a new SW that finishes installing while the app is open.
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) {
              // Notify the UpdatePrompt component.
              navigator.serviceWorker.controller?.postMessage({
                type: "UPDATE_AVAILABLE",
              });
            }
          });
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn("[sw] registration failed:", err);
      });
  });
}
