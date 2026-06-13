import { createContext, useContext, useEffect, useState } from "react";
import { trackOnce } from "@/lib/use-plausible";

export type Theme = "emerald" | "slate" | "garden";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "gag2.theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme !== "garden");
  root.style.colorScheme = theme === "garden" ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("emerald");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "emerald";
    setThemeState(stored);
    applyTheme(stored);
    // Don't fire a "Theme change" event on initial load — only on user-driven
    // changes via setTheme below. The dedupe signature prevents dupes from
    // programmatic re-applies too.
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    applyTheme(t);
    trackOnce("Theme change", `theme:${t}`, { theme: t });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
