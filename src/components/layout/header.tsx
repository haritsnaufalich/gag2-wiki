import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Sprout, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

type NavItem = { to: string; label: string };

const NAV: NavItem[] = [
  { to: "/crops",      label: "Crops" },
  { to: "/calculator", label: "Calculator" },
  { to: "/mutations",  label: "Mutations" },
  { to: "/compare",    label: "Compare" },
  { to: "/pets",       label: "Pets" },
  { to: "/gears",      label: "Gears" },
  { to: "/systems",    label: "Systems" },
];

const ALL: NavItem[] = [
  ...NAV,
  { to: "/sprinklers", label: "Sprinklers" },
  { to: "/eggs",       label: "Eggs" },
  { to: "/seed-packs", label: "Seed Packs" },
  { to: "/currencies", label: "Currencies" },
];

function NavItemLink({ to, label, onNavigate }: NavItem & { onNavigate?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "relative inline-flex items-center px-4 h-16 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:text-foreground",
          isActive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <span
              className="absolute left-3 right-3 bottom-0 h-0.5 bg-emerald-500 rounded-full"
              aria-hidden
            />
          )}
        </>
      )}
    </NavLink>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-white/80 dark:bg-zinc-950/80",
        "backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-950/70",
        "border-b border-zinc-200/60 dark:border-zinc-800/60"
      )}
    >
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
          onClick={() => setOpen(false)}
        >
          <Sprout className="h-5 w-5 text-emerald-500" aria-hidden />
          <span className="text-[15px] tracking-tight">
            GAG<span className="text-emerald-500">2</span>{" "}
            <span className="text-zinc-500 dark:text-zinc-400 font-normal">Wiki</span>
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center"
          aria-label="Primary navigation"
        >
          {NAV.map((item) => (
            <NavItemLink key={item.to} {...item} />
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
          className="md:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950"
        >
          <nav
            className="container max-w-7xl mx-auto py-2 flex flex-col"
            aria-label="Primary navigation (mobile)"
          >
            {ALL.map((item) => (
              <NavItemLink
                key={item.to}
                {...item}
                onNavigate={() => setOpen(false)}
              />
            ))}
            <div className="pt-2 mt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
