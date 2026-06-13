import { useMemo, useState } from "react";
import { PawPrint, Coins, MapPin, Tag, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PETS, type Pet } from "@/data/pets";
import { formatNumber } from "@/lib/utils";
import { trackOnce } from "@/lib/use-plausible";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TierFilter = "all" | "super" | "mythic" | "legendary" | "rare" | "uncommon" | "common" | "unknown";

const TIER_PRESETS: { id: TierFilter; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "common",    label: "Common" },
  { id: "uncommon",  label: "Uncommon" },
  { id: "rare",      label: "Rare" },
  { id: "legendary", label: "Legendary" },
  { id: "mythic",    label: "Mythic" },
  { id: "super",     label: "Super" },
  { id: "unknown",   label: "Unknown" },
];

export function PetsPage() {
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PETS.filter((p) => {
      if (tierFilter === "all") return true;
      return p.tier === tierFilter;
    });
  }, [tierFilter]);

  trackOnce("Pets browse", `pets:${tierFilter}`, { tier: tierFilter });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <PawPrint className="h-7 w-7 text-emerald-400" /> Pets
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {PETS.length} pets in the wiki, all from map spawns priced in
          Sheckles. Three Supers — Raccoon, Ice Serpent, Black Dragon — top
          the late-game ladder.
        </p>
      </div>

      <Tabs
        value={tierFilter}
        onValueChange={(v) => setTierFilter(v as TierFilter)}
        className="mb-6"
      >
        <TabsList>
          {TIER_PRESETS.map((t) => (
            <TabsTrigger key={t.id} value={t.id}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tierFilter} />
      </Tabs>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pet) => (
          <PetCard
            key={pet.slug}
            pet={pet}
            isOpen={openSlug === pet.slug}
            onToggle={() => setOpenSlug(openSlug === pet.slug ? null : pet.slug)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
          <div className="text-3xl mb-2">🐾</div>
          <h3 className="font-semibold">No pets match that filter</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different tier.
          </p>
        </div>
      )}
    </div>
  );
}

function PetCard({
  pet,
  isOpen,
  onToggle,
}: {
  pet: Pet;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isPending = pet.basePrice === null;
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
            {pet.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base">{pet.name}</h3>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {pet.tier}
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-medium mt-0.5">
              {pet.ability}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.25rem]">
          {pet.blurb}
        </p>

        <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground border-t border-border/40 pt-2">
          <Stat
            icon={<Coins className="h-3 w-3" />}
            label="Price"
            value={pet.basePrice !== null ? `${formatNumber(pet.basePrice)} ¢` : "TBD"}
          />
          <Stat
            icon={<Crown className="h-3 w-3" />}
            label="Obtainment"
            value={isPending ? "Pending" : "Map spawn"}
          />
        </div>
      </button>

      {isOpen && (
        <CardContent className="pt-0 pb-4 px-4">
          <div className="border-t border-border/40 pt-3 space-y-2 text-xs">
            <Row icon={<MapPin className="h-3 w-3" />} label="Source" value="growagarden2wiki.com" />
            <Row icon={<Tag className="h-3 w-3" />} label="Tags" value={pet.tags.map((t) => `#${t}`).join("  ")} />
          </div>
        </CardContent>
      )}
    </Card>
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
