import type { TierId } from "./tiers";

export type PetSlot = "garden" | "combat" | "utility";

export type PetSize = "normal" | "big" | "huge";

export interface PetSizeStats {
  size: PetSize;
  /** Multiplier on the base ability effect, e.g. 1.0 normal, 1.6 big, 2.4 huge. */
  powerMultiplier: number;
  /** Multiplier on the base price (Big/Huge variants are pricier). */
  priceMultiplier: number;
  /** Stealing payout when this size is stolen from another player. */
  stealMultiplier: number;
}

export const SIZE_STATS: Record<PetSize, PetSizeStats> = {
  normal: { size: "normal", powerMultiplier: 1.0, priceMultiplier: 1.0, stealMultiplier: 1.0 },
  big:    { size: "big",    powerMultiplier: 1.6, priceMultiplier: 2.5, stealMultiplier: 2.0 },
  huge:   { size: "huge",   powerMultiplier: 2.4, priceMultiplier: 6.0, stealMultiplier: 4.0 },
};

export interface Pet {
  slug: string;
  name: string;
  emoji: string;
  tier: TierId;
  slot: PetSlot;
  basePrice: number;
  /** Short passive effect tag. */
  passive: string;
  /** One-line description (own wording). */
  blurb: string;
  /** Where in the map this pet tends to spawn. */
  spawnHint: string;
  /** Active slots the pet occupies (most pets take 1). */
  slotCost: number;
  /** Tags for filtering. */
  tags: string[];
}

export const PETS: Pet[] = [
  // ── Common ──────────────────────────────────────────────
  {
    slug: "bee",
    name: "Garden Bee",
    emoji: "🐝",
    tier: "common",
    slot: "garden",
    basePrice: 500,
    passive: "Pollinator",
    blurb: "Visits adjacent crops during the day, nudging growth by a small percent.",
    spawnHint: "Meadow zones and flower-heavy plots.",
    slotCost: 1,
    tags: ["pollinator", "daytime"],
  },
  {
    slug: "ladybug",
    name: "Ladybug",
    emoji: "🐞",
    tier: "common",
    slot: "garden",
    basePrice: 400,
    passive: "Pest Control",
    blurb: "Eats aphids and mites; gives a small chance to skip a pest cycle on a plot.",
    spawnHint: "Vegetable plots, low-light edges.",
    slotCost: 1,
    tags: ["pest-control", "vegetables"],
  },
  {
    slug: "ant",
    name: "Worker Ant",
    emoji: "🐜",
    tier: "common",
    slot: "garden",
    basePrice: 300,
    passive: "Soil Turner",
    blurb: "Aerates soil for a small, persistent yield bonus on its home plot.",
    spawnHint: "Dirt patches near the south gate.",
    slotCost: 1,
    tags: ["yield", "soil"],
  },

  // ── Uncommon ────────────────────────────────────────────
  {
    slug: "cricket",
    name: "Field Cricket",
    emoji: "🦗",
    tier: "uncommon",
    slot: "utility",
    basePrice: 1200,
    passive: "Mood Setter",
    blurb: "Ambient sounds lift gardener mood; gives a small passive XP bonus.",
    spawnHint: "Tall grass and field edges.",
    slotCost: 1,
    tags: ["xp", "ambient"],
  },
  {
    slug: "snail",
    name: "Garden Snail",
    emoji: "🐌",
    tier: "uncommon",
    slot: "garden",
    basePrice: 1800,
    passive: "Slow Fertilizer",
    blurb: "Constant low-rate fertilizer on a slow tick; great for AFK plots.",
    spawnHint: "Damp corners and after rain.",
    slotCost: 1,
    tags: ["fertilizer", "afk"],
  },
  {
    slug: "moth",
    name: "Lantern Moth",
    emoji: "🦋",
    tier: "uncommon",
    slot: "garden",
    basePrice: 2400,
    passive: "Night Pollinator",
    blurb: "Pollinates only at night, pairing well with night-active crops like Moon Bloom.",
    spawnHint: "Near Moon Bloom or other night-bloom crops.",
    slotCost: 1,
    tags: ["night", "pollinator"],
  },

  // ── Rare ───────────────────────────────────────────────
  {
    slug: "fox",
    name: "Garden Fox",
    emoji: "🦊",
    tier: "rare",
    slot: "combat",
    basePrice: 8500,
    passive: "Pest Deterrent",
    blurb: "Scares off birds and small pests; reduces the chance of value loss events.",
    spawnHint: "Forest edges and around orchards.",
    slotCost: 1,
    tags: ["deterrent", "protection"],
  },
  {
    slug: "rabbit",
    name: "Lucky Rabbit",
    emoji: "🐇",
    tier: "rare",
    slot: "utility",
    basePrice: 11000,
    passive: "Mutation Luck",
    blurb: "A small but constant boost to mutation-roll odds on its home plot.",
    spawnHint: "Carrot-heavy crops and dawn.",
    slotCost: 1,
    tags: ["mutation", "luck"],
  },
  {
    slug: "squirrel",
    name: "Hoarding Squirrel",
    emoji: "🐿️",
    tier: "rare",
    slot: "utility",
    basePrice: 14000,
    passive: "Seed Finder",
    blurb: "Periodically surfaces a free seed from the shop's lower tier.",
    spawnHint: "Near tree lines and seed shops.",
    slotCost: 1,
    tags: ["shop", "seeds"],
  },

  // ── Epic ───────────────────────────────────────────────
  {
    slug: "owl",
    name: "Garden Owl",
    emoji: "🦉",
    tier: "epic",
    slot: "garden",
    basePrice: 38000,
    passive: "Night Watch",
    blurb: "Boosts yield of night-cycle crops and reduces theft attempts against you.",
    spawnHint: "Tall perches and old barns at night.",
    slotCost: 1,
    tags: ["night", "anti-theft"],
  },
  {
    slug: "hawk",
    name: "Sky Hawk",
    emoji: "🦅",
    tier: "epic",
    slot: "combat",
    basePrice: 52000,
    passive: "Aerial Patrol",
    blurb: "Long passive: chance to intercept incoming theft attempts from other players.",
    spawnHint: "Open sky zones and high perches.",
    slotCost: 1,
    tags: ["anti-theft", "aerial"],
  },
  {
    slug: "turtle",
    name: "Garden Turtle",
    emoji: "🐢",
    tier: "epic",
    slot: "garden",
    basePrice: 64000,
    passive: "Patient Growth",
    blurb: "Slows growth by ~30% but boosts final value ~50% for crops on its home plot.",
    spawnHint: "Near ponds and slow-water zones.",
    slotCost: 1,
    tags: ["value", "patience"],
  },

  // ── Legendary ──────────────────────────────────────────
  {
    slug: "dragon",
    name: "Garden Dragon",
    emoji: "🐉",
    tier: "legendary",
    basePrice: 220000,
    slot: "combat",
    passive: "Fire Breath",
    blurb: "On a long timer, breathes fire that scares off rival raiders and burns pests.",
    spawnHint: "Cave entrances and volcanic biomes (rare).",
    slotCost: 2,
    tags: ["combat", "legendary"],
  },
  {
    slug: "unicorn",
    name: "Luck Unicorn",
    emoji: "🦄",
    tier: "legendary",
    slot: "utility",
    basePrice: 280000,
    passive: "Aura of Fortune",
    blurb: "Modest but constant boost to mutation rarity across all of your plots.",
    spawnHint: "Rainbow zones and Starlight Grove (very rare).",
    slotCost: 2,
    tags: ["mutation", "legendary"],
  },

  // ── Mythic ─────────────────────────────────────────────
  {
    slug: "phoenix",
    name: "Phoenix Chick",
    emoji: "🔥",
    tier: "mythic",
    basePrice: 1200000,
    slot: "utility",
    passive: "Rebirth",
    blurb: "Once per day, automatically revives a withered crop on its home plot.",
    spawnHint: "Lava biomes only (extremely rare spawn).",
    slotCost: 3,
    tags: ["revive", "mythic"],
  },
  {
    slug: "celestial-dragon",
    name: "Celestial Dragon",
    emoji: "🐲",
    tier: "mythic",
    basePrice: 3500000,
    slot: "combat",
    passive: "Apex Guardian",
    blurb: "All stats +25%; doubles the Sheckle payout when it steals from other players.",
    spawnHint: "Eclipse events only (one of a kind).",
    slotCost: 3,
    tags: ["mythic", "steal"],
  },
];

export const PET_MAP: Record<string, Pet> = PETS.reduce((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {} as Record<string, Pet>);

export function getPetBySlug(slug: string): Pet | undefined {
  return PET_MAP[slug];
}

export function petsByTier(tier: TierId): Pet[] {
  return PETS.filter((p) => p.tier === tier);
}

export function petsBySlot(slot: PetSlot): Pet[] {
  return PETS.filter((p) => p.slot === slot);
}

export const SLOT_LABEL: Record<PetSlot, string> = {
  garden: "Garden",
  combat: "Combat",
  utility: "Utility",
};
