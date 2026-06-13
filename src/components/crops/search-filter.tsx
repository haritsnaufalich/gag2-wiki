import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TIERS, type TierId } from "@/data/tiers";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeTiers: Set<TierId>;
  onToggleTier: (t: TierId) => void;
  showMultiOnly: boolean;
  onToggleMulti: () => void;
}

export function SearchFilter({
  query,
  onQueryChange,
  activeTiers,
  onToggleTier,
  showMultiOnly,
  onToggleMulti,
}: SearchFilterProps) {
  const allTiersSelected = activeTiers.size === TIERS.length;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search crops, tags…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-9 pr-9 h-11"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Button
          size="sm"
          variant={allTiersSelected ? "default" : "outline"}
          onClick={() => {
            if (allTiersSelected) {
              TIERS.forEach((t) => {
                if (activeTiers.has(t.id)) onToggleTier(t.id);
              });
            } else {
              TIERS.forEach((t) => {
                if (!activeTiers.has(t.id)) onToggleTier(t.id);
              });
            }
          }}
        >
          {allTiersSelected ? "Hide all" : "Show all"}
        </Button>

        <div className="h-5 w-px bg-border mx-1" />

        {TIERS.map((t) => {
          const active = activeTiers.has(t.id);
          return (
            <button
              key={t.id}
              onClick={() => onToggleTier(t.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                active
                  ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground hover:border-border/80"
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", t.dotClass)} />
              {t.label}
            </button>
          );
        })}

        <div className="h-5 w-px bg-border mx-1" />

        <button
          onClick={onToggleMulti}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
            showMultiOnly
              ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
              : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
          )}
        >
          Multi-harvest only
        </button>
      </div>
    </div>
  );
}
