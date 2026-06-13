import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Tier, Crop } from "@/data";
import { CropCard } from "./crop-card";
import { cn } from "@/lib/utils";

interface TierSectionProps {
  tier: Tier;
  crops: Crop[];
  defaultOpen?: boolean;
  /** Filtered query — crops that don't match are shown as faded. */
  query?: string;
}

export function TierSection({ tier, crops, defaultOpen = true, query = "" }: TierSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const matchesQuery = (c: Crop) =>
    !query ||
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

  return (
    <section
      id={`tier-${tier.id}`}
      className={cn(
        "rounded-2xl border border-border/60 bg-card/40 overflow-hidden",
        "bg-gradient-to-br",
        tier.accentClass
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={cn("h-3 w-3 rounded-full", tier.dotClass)} />
          <div className="text-left">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {tier.label}
              <span className="text-xs text-muted-foreground font-normal">
                · {crops.length} crop{crops.length === 1 ? "" : "s"}
              </span>
            </h2>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {tier.description}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {crops.map((crop) => (
              <div
                key={crop.slug}
                className={cn(
                  "transition-opacity",
                  !matchesQuery(crop) && "opacity-25 pointer-events-none"
                )}
              >
                <CropCard crop={crop} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
