import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Repeat, Coins, Sparkles, Tag, Beaker, Ticket, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TierBadge } from "@/components/crops/tier-badge";
import { ValueCurveChart } from "@/components/crops/value-curve-chart";
import { TIER_MAP, getCropBySlug, MUTATIONS, CROPS } from "@/data";
import { obtainmentLabel } from "@/data/crops";
import { formatNumber, formatGrowTime } from "@/lib/utils";

export function CropDetailPage() {
  const { slug = "" } = useParams();
  const crop = getCropBySlug(slug);

  if (!crop) {
    return (
      <div className="container py-20 text-center">
        <div className="text-5xl mb-4">🪴</div>
        <h1 className="text-2xl font-semibold">Crop not found</h1>
        <p className="text-muted-foreground mt-2">
          We don't have a record for "{slug}" yet.
        </p>
        <Button asChild className="mt-6">
          <Link to="/crops">Back to crops</Link>
        </Button>
      </div>
    );
  }

  const tier = TIER_MAP[crop.tier];
  const sameTier = CROPS.filter(
    (c) => c.tier === crop.tier && c.slug !== crop.slug
  ).slice(0, 4);

  const shecklesPerHour =
    crop.growTimeSec !== null && crop.growTimeSec > 0
      ? (3600 / crop.growTimeSec) * crop.baseValue
      : 0;

  return (
    <div className="container py-10">
      <Link
        to="/crops"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to crops
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div
              className={`h-2 bg-gradient-to-r ${tier.accentClass} from-emerald-400/40 via-emerald-400/20 to-transparent`}
            />
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap items-start gap-5">
                <div className="grid h-24 w-24 place-items-center rounded-2xl bg-secondary/60 ring-1 ring-border/60 text-5xl">
                  <span aria-hidden>{crop.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                      {crop.name}
                    </h1>
                    <TierBadge tier={crop.tier} size="md" />
                  </div>
                  <p className="mt-2 text-muted-foreground text-balance">
                    {crop.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {crop.code && (
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        <Ticket className="h-3 w-3" />
                        Code: {crop.code}
                      </div>
                    )}
                    {crop.obtainment === "unknown" && (
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-fuchsia-400/10 border border-fuchsia-400/20 px-2.5 py-1 text-xs font-medium text-fuchsia-400">
                        <Package className="h-3 w-3" />
                        the wiki drop
                      </div>
                    )}
                    <div className="inline-flex items-center gap-1.5 rounded-md bg-secondary border border-border px-2.5 py-1 text-xs text-muted-foreground">
                      Obtainment · {obtainmentLabel(crop.obtainment)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              icon={<Clock className="h-4 w-4" />}
              label="Grow time"
              value={crop.growTimeSec !== null && crop.growTimeSec > 0 ? formatGrowTime(crop.growTimeSec) : "TBD"}
              accent="text-sky-400"
            />
            <StatCard
              icon={<Repeat className="h-4 w-4" />}
              label="Multi-harvest"
              value={
                crop.multiHarvest === "multi"
                  ? "Yes"
                  : crop.multiHarvest === "single"
                    ? "No"
                    : "—"
              }
              accent="text-violet-400"
            />
            <StatCard
              icon={<Coins className="h-4 w-4" />}
              label="Base value"
              value={
                crop.baseValue > 0
                  ? `${formatNumber(crop.baseValue)} ¢`
                  : "TBD"
              }
              accent="text-amber-400"
            />
            <StatCard
              icon={<Beaker className="h-4 w-4" />}
              label="Sheckles / hour"
              value={
                shecklesPerHour > 0
                  ? `${formatNumber(shecklesPerHour)} ¢`
                  : "TBD"
              }
              accent="text-emerald-400"
            />
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" /> Mutation Stacking
              </h2>
              <p className="text-sm text-muted-foreground">
                Multipliers compound multiplicatively. Pick a couple of mutations
                to see the effective value of {crop.name}.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MUTATIONS.map((m) => (
                  <MutationChip key={m.slug} mutation={m} baseValue={crop.baseValue} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Tag className="h-4 w-4 text-emerald-400" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {crop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
                <span className="inline-flex items-center rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                  #{crop.family}
                </span>
              </div>
            </CardContent>
          </Card>

          {crop.valueCurve && (
            <ValueCurveChart
              curve={crop.valueCurve}
              observations={crop.valueObservations}
            />
          )}
        </div>

        <aside className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Tier
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${tier.dotClass}`} />
                <span className="text-xl font-semibold">{tier.label}</span>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                {tier.description}
              </p>
            </CardContent>
          </Card>

          {sameTier.length > 0 && (
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Also in {tier.label}
                </div>
                <div className="space-y-2">
                  {sameTier.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/crops/${c.slug}`}
                      className="flex items-center justify-between gap-3 rounded-md p-2 hover:bg-secondary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xl shrink-0">{c.emoji}</span>
                        <span className="truncate text-sm font-medium">
                          {c.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatNumber(c.baseValue)} ¢
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`grid h-9 w-9 place-items-center rounded-md bg-secondary ${accent}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="text-lg font-semibold leading-tight">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function MutationChip({
  mutation,
  baseValue,
}: {
  mutation: (typeof MUTATIONS)[number];
  baseValue: number;
}) {
  if (baseValue <= 0) {
    return (
      <div className="rounded-md border border-border/40 bg-background/30 p-2.5 text-center">
        <div className="text-xs">
          <span className="mr-1">{mutation.emoji}</span>
          {mutation.name}
        </div>
        <div className="text-[10px] text-muted-foreground mt-1">×{mutation.multiplier}</div>
      </div>
    );
  }
  const effective = baseValue * (mutation.multiplier ?? 1);
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-2.5 text-center hover:border-emerald-400/40 transition-colors">
      <div className="text-xs font-medium">
        <span className="mr-1">{mutation.emoji}</span>
        {mutation.name}
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">
        ×{mutation.multiplier} → {formatNumber(effective)} ¢
      </div>
    </div>
  );
}
