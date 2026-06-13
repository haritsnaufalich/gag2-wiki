import { useMemo, useState } from "react";
import { Wrench, Coins, Sparkles, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GEARS,
  GEAR_CATEGORIES,
  type Gear,
  type GearCategory,
} from "@/data/gears";
import { formatNumber } from "@/lib/utils";
import { trackOnce } from "@/lib/use-plausible";

type CategoryFilter = "all" | GearCategory;

export function GearsPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      GEARS.filter((g) => (category === "all" ? true : g.category === category)),
    [category]
  );

  trackOnce("Gears browse", `gears:${category}`, { category });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Wrench className="h-7 w-7 text-emerald-400" /> Gears
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {GEARS.length} purchasable gears from the gear shop. Sprinklers
          auto-water plots; gadgets give movement or anti-theft tools; the
          rest are utilities and decoration. All priced in Robux (and Sheckles
          where noted).
        </p>
      </div>

      <Tabs
        value={category}
        onValueChange={(v) => setCategory(v as CategoryFilter)}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="all">All · {GEARS.length}</TabsTrigger>
          {GEAR_CATEGORIES.map((c) => {
            const count = GEARS.filter((g) => g.category === c.id).length;
            return (
              <TabsTrigger key={c.id} value={c.id}>
                {c.emoji} {c.label} · {count}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <GearCard
            key={g.slug}
            gear={g}
            isOpen={openSlug === g.slug}
            onToggle={() => setOpenSlug(openSlug === g.slug ? null : g.slug)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
          <div className="text-3xl mb-2">🛠️</div>
          <h3 className="font-semibold">No gears in this category yet</h3>
        </div>
      )}
    </div>
  );
}

function GearCard({
  gear,
  isOpen,
  onToggle,
}: {
  gear: Gear;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const category = GEAR_CATEGORIES.find((c) => c.id === gear.category);
  return (
    <Card className="h-full transition-all hover:border-emerald-400/40">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-4 space-y-3"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="text-3xl shrink-0" aria-hidden>
            {gear.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base">{gear.name}</h3>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {category?.label ?? gear.category}
              </span>
            </div>
            {gear.effect ? (
              <p className="text-xs text-emerald-400 font-medium mt-0.5">
                {gear.effect}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-0.5">
                Effect: TBD on the wiki
              </p>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.25rem]">
          {gear.blurb}
        </p>

        <div className="border-t border-border/40 pt-2">
          <PriceRow gear={gear} />
        </div>
      </button>

      {isOpen && (
        <CardContent className="pt-0 pb-4 px-4">
          <div className="border-t border-border/40 pt-3 space-y-2 text-xs text-muted-foreground">
            <Detail icon={<Coins className="h-3 w-3" />} label="Pricing" value={<PriceRow gear={gear} compact />} />
            <Detail icon={<Sparkles className="h-3 w-3" />} label="Effect" value={gear.effect ?? "TBD on the wiki"} />
            <Detail icon={<Package className="h-3 w-3" />} label="Source" value="growagarden2wiki.com · /gears/" />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function PriceRow({ gear, compact }: { gear: Gear; compact?: boolean }) {
  const hasRobux = gear.price1x != null;
  const hasSheckles = gear.shecklesPrice != null;
  if (!hasRobux && !hasSheckles) {
    return <span className="text-xs text-muted-foreground">Price TBD</span>;
  }
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${compact ? "" : "text-emerald-400 font-semibold"}`}>
      {hasRobux && (
        <span title="Robux 1x">
          <Coins className="inline h-3 w-3 mr-0.5" />
          {formatNumber(gear.price1x!)} R$
          {gear.price3x != null && (
            <span className="text-muted-foreground ml-1">· 3× {formatNumber(gear.price3x)}</span>
          )}
          {gear.price10x != null && (
            <span className="text-muted-foreground ml-1">· 10× {formatNumber(gear.price10x)}</span>
          )}
        </span>
      )}
      {hasSheckles && (
        <span className="text-muted-foreground">
          or {formatNumber(gear.shecklesPrice!)} ¢
        </span>
      )}
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-muted-foreground">
      <span className="text-foreground/70 mt-0.5">{icon}</span>
      <span>
        <span className="text-foreground font-medium uppercase tracking-wider text-[10px] mr-1.5">
          {label}
        </span>
        {value}
      </span>
    </div>
  );
}
