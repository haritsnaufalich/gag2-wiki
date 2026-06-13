import { Link } from "react-router-dom";
import { Clock, Repeat, Coins, Ticket, Package, Sparkles } from "lucide-react";
import type { Crop } from "@/data/crops";
import { TierBadge } from "./tier-badge";
import { Card } from "@/components/ui/card";
import { formatNumber, formatGrowTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CropCardProps {
  crop: Crop;
  hrefBase?: string;
}

export function CropCard({ crop, hrefBase = "/crops" }: CropCardProps) {
  const isUnpriced = crop.seedPriceSheckles === null;

  return (
    <Link to={`${hrefBase}/${crop.slug}`} className="group block">
      <Card
        className={cn(
          "relative overflow-hidden h-full transition-all duration-200",
          "hover:border-emerald-400/40 hover:shadow-md hover:shadow-emerald-400/5",
          "hover:-translate-y-0.5"
        )}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/40 to-emerald-400/0 opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="p-5 flex flex-col gap-4 h-full">
          <div className="flex items-start justify-between gap-3">
            <div
              className={cn(
                "grid h-14 w-14 place-items-center rounded-xl bg-secondary/60 ring-1 ring-border/60 text-3xl",
                "group-hover:scale-110 transition-transform"
              )}
            >
              <span aria-hidden>{crop.emoji}</span>
            </div>
            <TierBadge tier={crop.tier} />
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-base text-foreground group-hover:text-emerald-400 transition-colors">
              {crop.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
              {crop.blurb}
            </p>
          </div>

          <ObtainmentBadge obtainment={crop.obtainment} code={crop.code} />

          <div className="mt-auto pt-2 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground border-t border-border/40">
            <Stat
              icon={<Clock className="h-3 w-3" />}
              label="Grow"
              value={crop.growTimeSec != null && crop.growTimeSec > 0 ? formatGrowTime(crop.growTimeSec) : "—"}
            />
            <Stat
              icon={<Repeat className="h-3 w-3" />}
              label="Multi"
              value={crop.multiHarvest ? "Yes" : "No"}
            />
            <Stat
              icon={<Coins className="h-3 w-3" />}
              label="Sell"
              value={isUnpriced ? "Pack" : formatNumber(crop.baseValue)}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ObtainmentBadge({
  obtainment,
  code,
}: {
  obtainment: Crop["obtainment"];
  code?: string;
}) {
  if (obtainment === "code" && code) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 text-[10px] font-medium text-emerald-400 w-fit">
        <Ticket className="h-3 w-3" />
        Code · {code}
      </div>
    );
  }
  if (obtainment === "unknown") {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-md bg-fuchsia-400/10 border border-fuchsia-400/20 px-2 py-1 text-[10px] font-medium text-fuchsia-400 w-fit">
        <Package className="h-3 w-3" />
        the wiki
      </div>
    );
  }
  if (obtainment === "event") {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-400/10 border border-amber-400/20 px-2 py-1 text-[10px] font-medium text-amber-400 w-fit">
        <Sparkles className="h-3 w-3" />
        Event drop
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md bg-secondary/50 border border-border px-2 py-1 text-[10px] text-muted-foreground w-fit">
      Seed Shop
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <div className="flex items-center gap-1 text-muted-foreground/80">
        {icon}
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
