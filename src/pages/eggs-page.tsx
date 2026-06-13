import { Egg, Sparkles, MapPin, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EGGS } from "@/data/eggs";
import { trackOnce } from "@/lib/use-plausible";

export function EggsPage() {
  trackOnce("Eggs browse", "eggs:all", {});

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <Egg className="h-7 w-7 text-emerald-400" /> Eggs
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {EGGS.length} egg types in Grow A Garden 2. Eggs are the route to
          pets beyond map spawns. All three currently on the wiki are{" "}
          <span className="text-foreground font-medium">TBA — not yet released</span>.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EGGS.map((egg) => (
          <Card
            key={egg.slug}
            className="h-full transition-all hover:border-emerald-400/40"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl shrink-0">
                  {egg.emoji}
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary border border-border font-semibold">
                  {egg.rarity}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{egg.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{egg.blurb}</p>
              </div>
              <div className="pt-2 border-t border-border/40 space-y-2 text-xs">
                <Row
                  icon={<Sparkles className="h-3 w-3" />}
                  label="Possible pets"
                  value={
                    egg.possiblePets.length > 0
                      ? egg.possiblePets.join(", ")
                      : "TBA"
                  }
                />
                <Row
                  icon={<MapPin className="h-3 w-3" />}
                  label="Obtainment"
                  value={egg.howToObtain}
                />
                <Row
                  icon={<Tag className="h-3 w-3" />}
                  label="Source"
                  value="growagarden2wiki.com · /eggs/"
                />
              </div>
            </CardContent>
          </Card>
        ))}
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
