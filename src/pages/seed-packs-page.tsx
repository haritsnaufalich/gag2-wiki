import { Package, Tag, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SEED_PACKS, type SeedPack } from "@/data/seed-packs";
import { formatNumber } from "@/lib/utils";
import { trackOnce } from "@/lib/use-plausible";

export function SeedPacksPage() {
  trackOnce("Seed packs browse", "packs:all", {});

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Package className="h-7 w-7 text-emerald-400" /> Seed Packs
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {SEED_PACKS.length} paid seed bundles, priced in Robux. Each pack
          rolls rarity odds; the Ghost Pepper Pack is the only one with
          truly exclusive crops.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SEED_PACKS.map((pack) => (
          <PackCard key={pack.slug} pack={pack} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6 italic">
        Rarity odds are community estimates from the wiki. Actual percentages
        may vary.
      </p>
    </div>
  );
}

function PackCard({ pack }: { pack: SeedPack }) {
  return (
    <Card className="h-full transition-all hover:border-emerald-400/40">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl shrink-0">
            {pack.emoji}
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Price</div>
            <div className="text-lg font-bold text-emerald-400">
              {formatNumber(pack.price)} R$
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{pack.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{pack.blurb}</p>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            Rarity distribution
          </div>
          <OddsBar odds={pack.odds} />
        </div>

        {pack.exclusiveCrops.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Pack exclusives
            </div>
            <div className="flex flex-wrap gap-1">
              {pack.exclusiveCrops.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium"
                >
                  🌶️ {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border/40 space-y-1.5 text-xs text-muted-foreground">
          <Row
            icon={<MapPin className="h-3 w-3" />}
            label="Status"
            value={pack.status}
          />
          <Row
            icon={<Tag className="h-3 w-3" />}
            label="Source"
            value="growagarden2wiki.com · /seed-packs/"
          />
        </div>
      </CardContent>
    </Card>
  );
}

const RARITY_META: { key: keyof SeedPack["odds"]; label: string; color: string }[] = [
  { key: "common",    label: "Common",    color: "bg-zinc-400" },
  { key: "uncommon",  label: "Uncommon",  color: "bg-lime-500" },
  { key: "epic",      label: "Epic",      color: "bg-violet-500" },
  { key: "legendary", label: "Legendary", color: "bg-amber-400" },
  { key: "mythic",    label: "Mythic",    color: "bg-rose-500" },
  { key: "super",     label: "Super",     color: "bg-emerald-400" },
];

function OddsBar({ odds }: { odds: SeedPack["odds"] }) {
  return (
    <div className="space-y-1">
      <div className="flex h-2 rounded-full overflow-hidden bg-secondary">
        {RARITY_META.map(({ key, color }) => {
          const pct = odds[key];
          if (pct <= 0) return null;
          return (
            <div
              key={key}
              className={`${color} transition-all`}
              style={{ width: `${pct}%` }}
              title={`${key}: ${pct}%`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">
        {RARITY_META.map(({ key, label, color }) => {
          const pct = odds[key];
          if (pct <= 0) return null;
          return (
            <span key={key} className="inline-flex items-center gap-1">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />
              {label} {pct}%
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
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
