import { NavLink, Link } from "react-router-dom";
import { Sprout, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/crops", label: "Crops" },
  { to: "/pets", label: "Pets" },
  { to: "/mutations", label: "Mutations" },
  { to: "/calculator", label: "Calculator" },
  { to: "/compare", label: "Compare" },
  { to: "/systems", label: "Systems" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight shrink-0"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30 text-emerald-400">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline-block">
            Grow A Garden <span className="text-emerald-400">2</span>{" "}
            <span className="text-muted-foreground font-normal">Wiki</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60">
          <nav className="container py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-emerald-400 bg-emerald-400/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2 mt-2 border-t border-border/60 md:hidden">
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
