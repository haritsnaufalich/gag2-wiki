import { Droplets, Coins, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SPRINKLERS } from "@/data/sprinklers";
import { trackOnce } from "@/lib/use-plausible";

export function SprinklersPage() {
  trackOnce("Sprinklers browse", "sprinklers:all", { count: SPRINKLERS.length });
  return (
    <div className="container py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Droplets className="h-7 w-7 text-emerald-400" /> Sprinklers
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Auto-watering gears that passively water crops within their range.
          Higher-rarity sprinklers cover more ground. Current wiki data lists
          all sprinklers as Gear Shop Sheckle purchases.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SPRINKLERS.map((s) => (
          <Card key={s.slug} className="h-full hover:border-emerald-400/40 transition-all">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="text-3xl shrink-0" aria-hidden>
                  {s.emoji}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {s.rarity}
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-tight">{s.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.blurb}
              </p>
              <div className="pt-2 border-t border-border/40 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-foreground">
                  <Coins className="h-3 w-3 text-amber-400" />
                  <span className="font-medium">
                    {s.priceSheckles.toLocaleString()} Sheckles
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Sprout className="h-3 w-3 text-emerald-400" />
                  <span>Auto-waters nearby crops</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
