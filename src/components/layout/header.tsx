import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  Coins,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

type NavItem = {
  to: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
};

const PRIMARY: NavItem[] = [
  { to: "/crops",      label: "Crops",      desc: "36-crop catalog",       Icon: Sprout },
  { to: "/calculator", label: "Calculator", desc: "Yield + mutation calc", Icon: Calculator },
  { to: "/mutations",  label: "Mutations",  desc: "Stack & combo matrix",  Icon: Sparkles },
  { to: "/compare",    label: "Compare",    desc: "Side-by-side crops",    Icon: GitCompare },
  { to: "/pets",       label: "Pets",       desc: "12 companions",         Icon: PawPrint },
];

const MORE_BROWSE: NavItem[] = [
  { to: "/gears",       label: "Gears",       desc: "27 tools & sprinklers", Icon: Wrench },
  { to: "/sprinklers",  label: "Sprinklers",  desc: "Auto-watering gear",    Icon: Wrench },
  { to: "/eggs",        label: "Eggs",        desc: "3 hatchable types",     Icon: Egg },
  { to: "/seed-packs",  label: "Seed Packs",  desc: "4 Robux bundles",       Icon: Package },
];

const MORE_REFERENCE: NavItem[] = [
  { to: "/currencies",  label: "Currencies",  desc: "Sheckle & Robux economy", Icon: Coins },
  { to: "/systems",     label: "Systems",     desc: "Time, weather, NPCs",   Icon: Settings2 },
];

function NavPill({
  to,
  label,
  Icon,
  end,
  onNavigate,
}: {
  to: string;
  label: string;
  Icon: LucideIcon;
  end?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
          isActive
            ? "text-emerald-400"
            : "text-muted-foreground hover:text-foreground"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="h-3.5 w-3.5" aria-hidden />
          <span>{label}</span>
          <span
            className={cn(
              "absolute inset-x-2 -bottom-[1px] h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-opacity",
              isActive ? "opacity-100" : "opacity-0"
            )}
            aria-hidden
          />
        </>
      )}
    </NavLink>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open && !moreOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setMoreOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, moreOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60",
        "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        "shadow-[0_1px_0_0_rgba(16,185,129,0.04)]"
      )}
    >
      <div className="container flex h-16 items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 rounded-md"
          onClick={() => { setOpen(false); setMoreOpen(false); }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-emerald-400/20 to-emerald-400/5 ring-1 ring-emerald-400/30 text-emerald-400">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline-block text-[15px]">
            <span className="text-foreground">GAG</span>
            <span className="text-emerald-400">2</span>
            <span className="text-muted-foreground font-normal ml-1">Wiki</span>
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-0.5"
          aria-label="Primary navigation"
        >
          {PRIMARY.map((item) => (
            <NavPill key={item.to} {...item} />
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
                moreOpen
                  ? "text-foreground bg-secondary/60"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              More
              <ChevronDown
                className={cn("h-3 w-3 transition-transform", moreOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-[480px] rounded-xl border border-border/60 bg-popover/95 backdrop-blur p-3 shadow-xl shadow-black/20 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="grid grid-cols-2 gap-1">
                  <p className="col-span-2 px-2 pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Browse
                  </p>
                  {MORE_BROWSE.map((item) => (
                    <DropdownLink key={item.to} item={item} onNavigate={() => setMoreOpen(false)} />
                  ))}
                  <p className="col-span-2 px-2 pt-3 pb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Reference
                  </p>
                  {MORE_REFERENCE.map((item) => (
                    <DropdownLink key={item.to} item={item} onNavigate={() => setMoreOpen(false)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            onClick={() => { setOpen((v) => !v); setMoreOpen(false); }}
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
            className="container py-3 flex flex-col gap-0.5"
            aria-label="Primary navigation (mobile)"
          >
            <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Browse
            </p>
            {[{ to: "/", label: "Home", desc: "Wiki home", Icon: Home, end: true } as NavItem & { end: boolean }, ...PRIMARY, ...MORE_BROWSE].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={(item as { end?: boolean }).end}
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
                <item.Icon className="h-4 w-4 shrink-0" aria-hidden />
                {item.label}
              </NavLink>
            ))}
            <p className="px-3 pt-3 pb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Reference
            </p>
            {MORE_REFERENCE.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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
                <item.Icon className="h-4 w-4 shrink-0" aria-hidden />
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

function DropdownLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      role="menuitem"
      className={({ isActive }) =>
        cn(
          "group flex items-start gap-2.5 rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
          isActive ? "bg-emerald-400/10" : "hover:bg-secondary/60"
        )
      }
    >
      {({ isActive }) => (
        <>
          <item.Icon
            className={cn(
              "h-4 w-4 mt-0.5 shrink-0 transition-colors",
              isActive ? "text-emerald-400" : "text-muted-foreground group-hover:text-foreground"
            )}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className={cn("text-sm font-medium leading-tight", isActive ? "text-emerald-400" : "text-foreground")}>
              {item.label}
            </p>
            <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
          </div>
        </>
      )}
    </NavLink>
  );
}
