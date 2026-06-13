import { useEffect, useMemo, useState } from "react";
import { CROPS, MUTATIONS } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Sparkles, Calculator as CalcIcon, X, Timer, TrendingUp, User } from "lucide-react";
import { TIER_MAP } from "@/data/tiers";
import { TierBadge } from "@/components/crops/tier-badge";
import { trackOnce } from "@/lib/use-plausible";

export function CalculatorPage() {
  const [cropSlug, setCropSlug] = useState(CROPS[12].slug);
  const [quantity, setQuantity] = useState(1);
  const [weightG, setWeightG] = useState<number>(1);
  const [friendCount, setFriendCount] = useState<number>(0);
  // Canonical: each friend in the same server grants +10% Sheckle boost,
  // capped at 4 friends (+40% max).
  const friendBoostPct = friendCount * 10;
  const [active, setActive] = useState<Set<string>>(new Set());

  const crop = CROPS.find((c) => c.slug === cropSlug) ?? CROPS[0];

  const { effective, multiplier, activatedMutations } = useMemo(() => {
    const activated = MUTATIONS.filter((m) => active.has(m.slug));
    // Canonical formula: variant × (1 + Σ weather). Strongest variant wins;
    // weather mutations stack additively.
    const variantMult = activated
      .filter((m) => m.kind === "variant")
      .reduce(
        (best, m) =>
          typeof m.multiplier === "number" ? Math.max(best, m.multiplier) : best,
        1
      );
    const weatherMult = activated
      .filter((m) => m.kind === "mutation")
      .reduce((sum, m) => sum + (m.multiplier ?? 0), 0);
    const mult = variantMult * (1 + weatherMult);
    const boostMult = 1 + friendBoostPct / 100;
    // Per-weight value, in priority order:
    //   1. Fitted value curve (multi-point calibration)
    //   2. Per-gram override (single observation)
    //   3. valueAvg/weightAvgG ratio
    //   4. flat baseValue fallback
    const baseValueAtWeight = crop.valueCurve
      ? crop.valueCurve.a * Math.pow(weightG, crop.valueCurve.alpha)
      : crop.valuePerGram
        ? crop.valuePerGram * weightG
        : crop.weightAvgG && crop.valueAvg
          ? (crop.valueAvg / crop.weightAvgG) * weightG
          : crop.baseValue;
    const boosted = baseValueAtWeight * mult * boostMult;
    return {
      effective: boosted * quantity,
      multiplier: mult,
      activatedMutations: activated,
    };
  }, [crop, quantity, weightG, friendBoostPct, active]);

  // Fire one Plausible event per distinct (crop, mutations, qty, weight, friends) combo
  // — repeated clicks on the same setup don't spam the dashboard.
  useEffect(() => {
    trackOnce(
      "Calculator use",
      `calc:${crop.slug}:${quantity}:${weightG}:${friendCount}:${[...active].sort().join(",")}`,
      {
        crop: crop.slug,
        quantity,
        weight: weightG,
        friends: friendCount,
        friendBoostPct,
        mutations: active.size,
        tier: crop.tier,
      }
    );
  }, [crop.slug, quantity, weightG, friendCount, friendBoostPct, active, crop.tier]);

  const shecklesPerHour =
    crop.growTimeSec && crop.growTimeSec != null && crop.growTimeSec > 0
      ? ((3600 / crop.growTimeSec) * effective) / quantity
      : 0;

  const toggleMutation = (slug: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="container py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <CalcIcon className="h-7 w-7 text-emerald-400" /> Value Calculator
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Pick a crop, set a weight, pick your mutations, watch the math.
          Multipliers compound multiplicatively — your effective value grows fast.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-6 space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Crop
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 max-h-80 overflow-y-auto scrollbar-thin pr-1">
                {CROPS.map((c) => {
                  const isActive = c.slug === cropSlug;
                  return (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setCropSlug(c.slug);
                        // Snap weight to canonical avg if known
                        if (c.weightAvgG) setWeightG(c.weightAvgG);
                      }}
                      className={cn(
                        "flex items-center gap-2 rounded-md border p-2 text-left text-sm transition-colors",
                        isActive
                          ? "border-emerald-400/60 bg-emerald-400/10"
                          : "border-border bg-background/30 hover:border-border/80"
                      )}
                    >
                      <span className="text-xl">{c.emoji}</span>
                      <span className="truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                Quantity
              </label>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value) || 1))
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Weight (g)</span>
                {crop.weightAvgG && (
                  <span className="text-emerald-400 normal-case tracking-normal text-[10px]">
                    avg {crop.weightAvgG}g
                  </span>
                )}
              </label>
              <Input
                type="number"
                min={0.1}
                step={0.1}
                value={weightG}
                onChange={(e) =>
                  setWeightG(Math.max(0.1, Number(e.target.value) || 0.1))
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Friends in server</span>
                <span className="text-emerald-400 normal-case tracking-normal text-[10px]">
                  +{friendBoostPct}%
                </span>
              </label>
              <div
                className="mt-3 grid grid-cols-4 gap-2"
                role="group"
                aria-label="Friends in server (each +10% boost, max 4)"
              >
                {[1, 2, 3, 4].map((n) => {
                  const isActive = friendCount === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFriendCount(isActive ? 0 : n)}
                      aria-pressed={isActive}
                      aria-label={`${n} friend${n === 1 ? "" : "s"}`}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 rounded-lg border p-3 text-xs transition-colors",
                        isActive
                          ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                          : "border-border bg-background/40 text-muted-foreground hover:border-emerald-400/30 hover:text-foreground"
                      )}
                    >
                      <User className="h-4 w-4" />
                      <span className="font-medium">{n}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                Each friend grants +10% Sheckle boost, capped at 4 friends
                (+40% max). Click the active friend to clear.
              </p>
            </div>

            <div className="pt-3 border-t border-border/40 space-y-1.5 text-xs">
              <Row label="Tier" value={TIER_MAP[crop.tier].label} />
              <Row label="Grow time" value={crop.growTimeSec && crop.growTimeSec != null && crop.growTimeSec > 0 ? `${crop.growTimeSec}s` : "TBD"} />
              <Row
                label="Multi-harvest"
                value={
                  crop.multiHarvest === "multi"
                    ? "Yes"
                    : crop.multiHarvest === "single"
                      ? "No"
                      : "—"
                }
              />
              <Row label="Avg weight" value={crop.weightAvgG !== null ? `${crop.weightAvgG}g` : "TBD"} />
              <Row label="Huge chance" value={crop.hugeChancePct !== null ? `${crop.hugeChancePct}%` : "TBD"} />
              {crop.seedPriceSheckles !== null && (
                <Row label="Seed price" value={`${formatNumber(crop.seedPriceSheckles)} ¢`} />
              )}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-6 space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Effective sell value
              </div>
              <div className="text-5xl font-bold tracking-tight text-emerald-400">
                {formatNumber(effective)} <span className="text-2xl">¢</span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-sm text-muted-foreground">
                <span>
                  {formatNumber(
                    crop.weightAvgG && crop.valueAvg
                      ? (crop.valueAvg / crop.weightAvgG) * weightG
                      : crop.baseValue
                  )} ¢ ×{" "}
                  <span className="text-foreground font-medium">
                    {quantity}
                  </span>{" "}
                  crop{quantity > 1 ? "s" : ""}
                </span>
                <span>
                  ×{" "}
                  <span className="text-foreground font-medium">
                    {multiplier}
                  </span>{" "}
                  mutations
                </span>
                {friendBoostPct > 0 && (
                  <span>
                    ×{" "}
                    <span className="text-foreground font-medium">
                      1.{String(friendBoostPct).padStart(2, "0")}
                    </span>{" "}
                    friend boost
                  </span>
                )}
                {activatedMutations.length > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActive(new Set())}
                    className="h-6 px-2 text-xs"
                  >
                    <X className="h-3 w-3" /> Clear mutations
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {crop.growTimeSec != null && crop.growTimeSec > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-sky-400">
                    <Timer className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Grow time
                    </div>
                    <div className="text-lg font-semibold">
                      {crop.growTimeSec}s
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Sheckles / hour
                    </div>
                    <div className="text-lg font-semibold">
                      {formatNumber(shecklesPerHour)} ¢
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <h2 className="font-semibold">Mutations</h2>
                <span className="text-xs text-muted-foreground">
                  · tap to toggle
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {MUTATIONS.map((m) => {
                  const isActive = active.has(m.slug);
                  return (
                    <button
                      key={m.slug}
                      onClick={() => toggleMutation(m.slug)}
                      className={cn(
                        "rounded-lg border p-3 text-left transition-all",
                        isActive
                          ? "border-emerald-400/60 bg-emerald-400/10"
                          : "border-border bg-background/30 hover:border-border/80"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {m.emoji} {m.name}
                        </span>
                        <span
                          className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            isActive
                              ? "bg-emerald-400/20 text-emerald-400"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          ×{m.multiplier}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {m.source}
                      </p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <TierBadge tier={crop.tier} size="sm" />
            <span>Stats shown are community estimates for the {TIER_MAP[crop.tier].label} tier.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground uppercase tracking-wider text-[10px]">
        {label}
      </span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
