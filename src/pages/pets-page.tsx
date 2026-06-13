import { useMemo, useState } from "react";
import { PawPrint, MapPin, Coins, Sparkles, Crown, Hammer, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TIERS } from "@/data/tiers";
import {
  PETS,
  SIZE_STATS,
  SLOT_LABEL,
  type Pet,
  type PetSize,
  type PetSlot,
} from "@/data/pets";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { trackOnce } from "@/lib/use-plausible";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type SlotFilter = "all" | PetSlot;

const SIZES: { id: PetSize; label: string; tint: string }[] = [
  { id: "normal", label: "Normal", tint: "text-zinc-400" },
  { id: "big",    label: "Big",    tint: "text-sky-400" },
  { id: "huge",   label: "Huge",   tint: "text-emerald-400" },
];

export function PetsPage() {
  const [slotFilter, setSlotFilter] = useState<SlotFilter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PETS.filter((p) => {
      if (slotFilter !== "all" && p.slot !== slotFilter) return false;
      return true;
    });
  }, [slotFilter]);

  // Fire a single Plausible event per distinct slot filter so the
  // dashboard shows what visitors actually browse.
  trackOnce(
    "Pets browse",
    `pets:${slotFilter}`,
    { slot: slotFilter }
  );

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <PawPrint className="h-7 w-7 text-emerald-400" /> Pets
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {PETS.length} pets across {new Set(PETS.map((p) => p.tier)).size} tiers. Most take 1 active slot; legendary+
          pets take 2-3. Big and Huge variants cost more but multiply passive power and the
          payout if you steal them from another player.
        </p>
      </div>

      {/* Size legend */}
      <div className="mb-6 rounded-lg border border-border bg-card/50 p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Size legend
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {SIZES.map((s) => (
            <div key={s.id} className="flex items-center gap-2 text-sm">
              <span className={cn("font-semibold", s.tint)}>{s.label}</span>
              <span className="text-muted-foreground">
                power ×{SIZE_STATS[s.id].powerMultiplier}, price ×{SIZE_STATS[s.id].priceMultiplier}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Tabs
        value={slotFilter}
        onValueChange={(v) => setSlotFilter(v as SlotFilter)}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="all">All slots</TabsTrigger>
          <TabsTrigger value="garden">{SLOT_LABEL.garden}</TabsTrigger>
          <TabsTrigger value="combat">{SLOT_LABEL.combat}</TabsTrigger>
          <TabsTrigger value="utility">{SLOT_LABEL.utility}</TabsTrigger>
        </TabsList>
        <TabsContent value={slotFilter} />
      </Tabs>

      <div className="space-y-6">
        {TIERS.map((tier) => {
          const tierPets = filtered.filter((p) => p.tier === tier.id);
          if (tierPets.length === 0) return null;
          return (
            <PetTierSection
              key={tier.id}
              tier={tier}
              pets={tierPets}
              openSlug={openSlug}
              setOpenSlug={setOpenSlug}
            />
          );
        })}
      </div>
    </div>
  );
}

function PetTierSection({
  tier,
  pets,
  openSlug,
  setOpenSlug,
}: {
  tier: (typeof TIERS)[number];
  pets: Pet[];
  openSlug: string | null;
  setOpenSlug: (s: string | null) => void;
}) {
  const [open, setOpen] = useState(true);
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
                · {pets.length} pet{pets.length === 1 ? "" : "s"}
              </span>
            </h2>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {tier.description}
            </p>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <PetCard
                key={pet.slug}
                pet={pet}
                isOpen={openSlug === pet.slug}
                onToggle={() => setOpenSlug(openSlug === pet.slug ? null : pet.slug)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
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
  const stats = SIZE_STATS.normal;
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
                {SLOT_LABEL[pet.slot]}
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-medium mt-0.5">
              {pet.passive}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.25rem]">
          {pet.blurb}
        </p>

        <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground border-t border-border/40 pt-2">
          <Stat icon={<Coins className="h-3 w-3" />} label="Normal" value={`${formatNumber(pet.basePrice)} ¢`} />
          <Stat icon={<Sparkles className="h-3 w-3" />} label="Big" value={`${formatNumber(Math.round(pet.basePrice * SIZE_STATS.big.priceMultiplier))} ¢`} />
          <Stat icon={<Crown className="h-3 w-3" />} label="Huge" value={`${formatNumber(Math.round(pet.basePrice * SIZE_STATS.huge.priceMultiplier))} ¢`} />
        </div>
      </button>

      {isOpen && (
        <CardContent className="pt-0 pb-4 px-4">
          <div className="border-t border-border/40 pt-3 space-y-2 text-xs">
            <Row icon={<MapPin className="h-3 w-3" />} label="Spawn" value={pet.spawnHint} />
            <Row icon={<Hammer className="h-3 w-3" />} label="Slot cost" value={`${pet.slotCost} active`} />
            <Row icon={<Shield className="h-3 w-3" />} label="Steal ×" value={`N:${stats.stealMultiplier} · B:${SIZE_STATS.big.stealMultiplier} · H:${SIZE_STATS.huge.stealMultiplier}`} />
            <div className="flex flex-wrap gap-1 pt-1">
              {pet.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-border bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
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
