import { useMemo, useState } from "react";
import { TIERS, type TierId, CROPS, WIKI_STATS } from "@/data";
import { TierSection } from "@/components/crops/tier-section";
import { SearchFilter } from "@/components/crops/search-filter";

export function CropsPage() {
  const [query, setQuery] = useState("");
  const [activeTiers, setActiveTiers] = useState<Set<TierId>>(
    new Set(TIERS.map((t) => t.id))
  );
  const [showMultiOnly, setShowMultiOnly] = useState(false);

  const filteredByTier = useMemo(() => {
    const result: Record<TierId, typeof CROPS> = {} as Record<TierId, typeof CROPS>;
    for (const tier of TIERS) {
      if (!activeTiers.has(tier.id)) {
        result[tier.id] = [];
        continue;
      }
      result[tier.id] = CROPS.filter((c) => {
        if (c.tier !== tier.id) return false;
        if (showMultiOnly && !c.multiHarvest) return false;
        if (query) {
          const q = query.toLowerCase();
          const matches =
            c.name.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q)) ||
            c.blurb.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      });
    }
    return result;
  }, [query, activeTiers, showMultiOnly]);

  const visibleCount = Object.values(filteredByTier).reduce(
    (sum, list) => sum + list.length,
    0
  );

  const toggleTier = (tier: TierId) => {
    setActiveTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <span aria-hidden>🌽</span> Crops
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Every plantable crop in Grow A Garden 2. Click any card for full
          stats, growing tips, and stacking combos. Showing{" "}
          <span className="text-foreground font-medium">{visibleCount}</span>{" "}
          of {WIKI_STATS.totalCrops}.
        </p>
      </div>

      <div className="mb-8 sticky top-16 z-30 -mx-4 px-4 py-3 bg-background/80 backdrop-blur border-y border-border/60">
        <SearchFilter
          query={query}
          onQueryChange={setQuery}
          activeTiers={activeTiers}
          onToggleTier={toggleTier}
          showMultiOnly={showMultiOnly}
          onToggleMulti={() => setShowMultiOnly((v) => !v)}
        />
      </div>

      <div className="space-y-4">
        {TIERS.map((tier) => {
          const crops = filteredByTier[tier.id];
          return (
            <div key={tier.id} className={crops.length === 0 ? "hidden" : ""}>
              <TierSection tier={tier} crops={crops} query={query} />
            </div>
          );
        })}

        {visibleCount === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
            <div className="text-3xl mb-2">🪴</div>
            <h3 className="font-semibold">No crops match those filters</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different query or clear tier filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
