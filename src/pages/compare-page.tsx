import { useEffect, useMemo, useState } from "react";
import { GitCompare, ArrowLeftRight, TrendingUp, Timer, Coins } from "lucide-react";
import { CROPS, MUTATIONS } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { TIER_MAP } from "@/data/tiers";
import { TierBadge } from "@/components/crops/tier-badge";
import { cn, formatNumber, formatGrowTime } from "@/lib/utils";
import { trackOnce } from "@/lib/use-plausible";

const [aDefault, bDefault] = [CROPS[0], CROPS[15]];

export function ComparePage() {
  const [aSlug, setASlug] = useState(aDefault.slug);
  const [bSlug, setBSlug] = useState(bDefault.slug);

  const a = CROPS.find((c) => c.slug === aSlug) ?? aDefault;
  const b = CROPS.find((c) => c.slug === bSlug) ?? bDefault;

  const stats = useMemo(() => buildStats(a, b), [a, b]);

  // Fire one event per distinct (a, b) pair — comparing the same two
  // crops 5 times in a row only counts once.
  useEffect(() => {
    const pair = [a.slug, b.slug].sort().join("|");
    trackOnce("Compare crops", `cmp:${pair}`, { a: a.slug, b: b.slug });
  }, [a.slug, b.slug]);

  return (
    <div className="container py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <GitCompare className="h-7 w-7 text-emerald-400" /> Compare Crops
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Pick two crops. See base value, grow time, mutations-stacked ceiling,
          and an apples-to-apples "sheckles per hour" projection.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Slot slot={a} onChange={setASlug} />
        <Slot slot={b} onChange={setBSlug} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatBlock
          icon={<Coins className="h-4 w-4" />}
          label="Base value"
          a={`${formatNumber(a.baseValue)} ¢`}
          b={`${formatNumber(b.baseValue)} ¢`}
          winner={a.baseValue === b.baseValue ? 0 : a.baseValue > b.baseValue ? 1 : -1}
        />
        <StatBlock
          icon={<Timer className="h-4 w-4" />}
          label="Grow time"
          a={a.growTimeSec != null && a.growTimeSec > 0 ? formatGrowTime(a.growTimeSec) : "TBD"}
          b={b.growTimeSec != null && b.growTimeSec > 0 ? formatGrowTime(b.growTimeSec) : "TBD"}
          winner={
            a.growTimeSec != null && b.growTimeSec != null
              ? a.growTimeSec === b.growTimeSec
                ? 0
                : a.growTimeSec < b.growTimeSec
                  ? 1
                  : -1
              : 0
          }
          reverseWin
        />
        <StatBlock
          icon={<TrendingUp className="h-4 w-4" />}
          label="Sheckles / hour"
          a={a.growTimeSec != null && a.growTimeSec > 0 ? `${formatNumber(stats.a.shecklesPerHour)} ¢` : "—"}
          b={b.growTimeSec != null && b.growTimeSec > 0 ? `${formatNumber(stats.b.shecklesPerHour)} ¢` : "—"}
          winner={
            a.growTimeSec != null && b.growTimeSec != null
              ? a.growTimeSec === b.growTimeSec
                ? 0
                : a.growTimeSec < b.growTimeSec
                  ? 1
                  : -1
              : 0
          }
          reverseWin
        />
        <StatBlock
          icon={<TrendingUp className="h-4 w-4" />}
          label="Sheckles / hour"
          a={a.growTimeSec != null && a.growTimeSec > 0 ? `${formatNumber(stats.a.shecklesPerHour)} ¢` : "—"}
          b={b.growTimeSec != null && b.growTimeSec > 0 ? `${formatNumber(stats.b.shecklesPerHour)} ¢` : "—"}
          winner={a.growTimeSec != null && b.growTimeSec != null ? a.growTimeSec === b.growTimeSec ? 0 : a.growTimeSec < b.growTimeSec ? 1 : -1 : 0}
          reverseWin
        />
      </div>

      <Card className="mt-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight className="h-4 w-4 text-emerald-400" />
            <h2 className="font-semibold">Mutation ceiling</h2>
            <span className="text-xs text-muted-foreground">
              · all 5 mutations stacked
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MutationCeiling crop={a} accent="text-emerald-400" />
            <MutationCeiling crop={b} accent="text-cyan-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Slot({
  slot,
  onChange,
}: {
  slot: typeof aDefault;
  onChange: (slug: string) => void;
}) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">
          Crop
        </label>
        <select
          value={slot.slug}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {CROPS.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.emoji} {c.name} · {TIER_MAP[c.tier].label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-secondary/60 ring-1 ring-border/60 text-3xl">
            <span aria-hidden>{slot.emoji}</span>
          </div>
          <div className="min-w-0">
            <div className="font-semibold">{slot.name}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">
              {slot.blurb}
            </div>
            <div className="mt-1.5">
              <TierBadge tier={slot.tier} size="sm" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatBlock({
  icon,
  label,
  a,
  b,
  winner,
  reverseWin,
}: {
  icon: React.ReactNode;
  label: string;
  a: string;
  b: string;
  winner: 1 | 0 | -1;
  reverseWin?: boolean;
}) {
  const w = reverseWin ? -winner : winner;
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          {icon} {label}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div
            className={cn(
              "rounded-md p-2 font-medium text-center",
              w === 1 && "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/30",
              w !== 1 && "bg-secondary/50"
            )}
          >
            {a}
          </div>
          <div
            className={cn(
              "rounded-md p-2 font-medium text-center",
              w === -1 && "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/30",
              w !== -1 && "bg-secondary/50"
            )}
          >
            {b}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MutationCeiling({ crop, accent }: { crop: typeof aDefault; accent: string }) {
  // Canonical formula: strongest variant × (1 + Σ weather mutations).
  // Variants don't stack with each other; weather mutations stack
  // additively into the "mutation stack".
  const variants = MUTATIONS.filter((m) => m.kind === "variant");
  const weathers = MUTATIONS.filter((m) => m.kind === "mutation");
  const variantMult = Math.max(
    1,
    ...variants.map((m) => m.multiplier ?? 0).filter((v) => v > 0)
  );
  const weatherMult = weathers
    .map((m) => m.multiplier ?? 0)
    .filter((v) => v > 0)
    .reduce((a, b) => a + b, 0);
  const totalMultiplier = variantMult * (1 + weatherMult);
  const ceiling = crop.baseValue * totalMultiplier;
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-4">
      <div className="text-xs text-muted-foreground">{crop.name}</div>
      <div className={`text-2xl font-bold ${accent}`}>
        {formatNumber(ceiling)} ¢
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">
        base × {totalMultiplier.toLocaleString()} (variant × (1 + weather))
      </div>
    </div>
  );
}

function buildStats(a: typeof aDefault, b: typeof aDefault) {
  const calc = (c: typeof aDefault) => ({
    shecklesPerHour:
      c.growTimeSec !== null && c.growTimeSec != null && c.growTimeSec > 0 ? (3600 / c.growTimeSec) * c.baseValue : 0,
  });
  return { a: calc(a), b: calc(b) };
}
