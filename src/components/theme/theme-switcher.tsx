import { Sun, Moon, Leaf } from "lucide-react";
import { useTheme, type Theme } from "./theme-provider";
import { cn } from "@/lib/utils";

const OPTIONS: { id: Theme; label: string; desc: string }[] = [
  { id: "emerald", label: "Emerald", desc: "Dark · Supabase" },
  { id: "slate", label: "Slate", desc: "Dark · Greyscale" },
  { id: "garden", label: "Garden", desc: "Light · Greens" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
          {OPTIONS.map(({ id, label, desc }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            onClick={() => setTheme(id)}
            title={`${label} — ${desc}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {id === "garden" ? (
              <Sun className="h-3 w-3" />
            ) : id === "emerald" ? (
              <Leaf className="h-3 w-3" />
            ) : (
              <Moon className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
