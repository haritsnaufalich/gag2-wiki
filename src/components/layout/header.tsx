import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sprout,
  Menu,
  X,
  Home,
  PawPrint,
  Wrench,
  Egg,
  Package,
  Sparkles,
  Calculator,
  GitCompare,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
  Icon: LucideIcon;
};

const NAV: NavItem[] = [
  { to: "/", label: "Home", end: true, Icon: Home },
  { to: "/crops", label: "Crops", Icon: Sprout },
  { to: "/pets", label: "Pets", Icon: PawPrint },
  { to: "/gears", label: "Gears", Icon: Wrench },
  { to: "/sprinklers", label: "Sprinklers", Icon: Wrench },
  { to: "/eggs", label: "Eggs", Icon: Egg },
  { to: "/seed-packs", label: "Packs", Icon: Package },
  { to: "/mutations", label: "Mutations", Icon: Sparkles },
  { to: "/calculator", label: "Calculator", Icon: Calculator },
  { to: "/compare", label: "Compare", Icon: GitCompare },
  { to: "/currencies", label: "Coins", Icon: Settings2 },
  { to: "/systems", label: "Systems", Icon: Settings2 },
];

export function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape (a11y nicety; mobile menu is a focus trap
  // candidate but Escape alone is the cheap-win).
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30 text-emerald-400">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline-block">
            Grow A Garden <span className="text-emerald-400">2</span>{" "}
            <span className="text-muted-foreground font-normal">Wiki</span>
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )
              }
            >
              <item.Icon className="h-3.5 w-3.5" aria-hidden />
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
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur"
        >
          <nav
            className="container py-3 flex flex-col gap-1"
            aria-label="Primary navigation (mobile)"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-emerald-400 bg-emerald-400/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )
                }
              >
                <item.Icon
                  className="h-4 w-4 shrink-0"
                  aria-hidden
                />
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
