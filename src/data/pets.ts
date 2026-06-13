import type { TierId } from "./tiers";

/** A pet slot corresponds to its pass-time activity on the garden. */
export type PetSlot = "movement" | "vision" | "growth" | "defense" | "loot";

export interface Pet {
  slug: string;
  name: string;
  emoji: string;
  /** Canonical tier as listed on growagarden2wiki.com. */
  tier: TierId;
  /** Sheckle cost. null when source marks it as TBD. */
  basePrice: number | null;
  /** One-line description of the passive (own wording, sourced from the wiki). */
  ability: string;
  blurb: string;
  tags: string[];
}

export const PETS: Pet[] = [
  // ── Common ─────────────────────────────────────────────
  {
    slug: "frog",
    name: "Frog",
    emoji: "🐸",
    tier: "common",
    basePrice: 10000,
    ability: "+5 Jump Height",
    blurb: "Croaks once on map load, then quietly boosts jump height for the rest of the session.",
    tags: ["movement", "common"],
  },
  {
    slug: "bunny",
    name: "Bunny",
    emoji: "🐰",
    tier: "common",
    basePrice: 20000,
    ability: "+5 Walk Speed",
    blurb: "Tails never stop bouncing. A small, constant movement buff that makes getting around the garden feel snappier.",
    tags: ["movement", "common"],
  },

  // ── Uncommon ───────────────────────────────────────────
  {
    slug: "owl",
    name: "Owl",
    emoji: "🦉",
    tier: "uncommon",
    basePrice: 25000,
    ability: "+12.5% Night View Distance",
    blurb: "Sits on the highest plot and silently widens what you can see when the day/night cycle flips.",
    tags: ["vision", "night"],
  },

  // ── Rare ───────────────────────────────────────────────
  {
    slug: "deer",
    name: "Deer",
    emoji: "🦌",
    tier: "rare",
    basePrice: 50000,
    ability: "+10% Plant Growth Speed",
    blurb: "A small, persistent growth boost on every plot. Best paired with high-value long-cycle crops.",
    tags: ["growth"],
  },

  // ── Legendary ──────────────────────────────────────────
  {
    slug: "robin",
    name: "Robin",
    emoji: "🐦",
    tier: "legendary",
    basePrice: 75000,
    ability: "Drops seeds from eaten fruit",
    blurb: "Hops between ripe fruit and drops bonus seeds on the ground. A self-funding harvest helper.",
    tags: ["loot", "legendary"],
  },
  {
    slug: "bee",
    name: "Bee",
    emoji: "🐝",
    tier: "legendary",
    basePrice: 1000000,
    ability: "Defends against intruders",
    blurb: "Stings anyone who tries to steal from your plots. High price tag, but pays for itself against raiders.",
    tags: ["defense", "legendary"],
  },

  // ── Mythic ─────────────────────────────────────────────
  {
    slug: "monkey",
    name: "Monkey",
    emoji: "🐒",
    tier: "mythic",
    basePrice: 1000000,
    ability: "Picks ripe fruit and brings it to you",
    blurb: "Swings around the garden and grabs ripe fruit for you. A hands-off harvester for high-value plots.",
    tags: ["loot", "mythic"],
  },
  {
    slug: "golden-dragonfly",
    name: "Golden Dragonfly",
    emoji: "🪰",
    tier: "mythic",
    basePrice: 9000000,
    ability: "2x Gold Chance",
    blurb: "The apex pet. Doubles the chance of any fruit you harvest turning Gold. Late-game Sheckle engine.",
    tags: ["loot", "mythic", "gold"],
  },
  {
    slug: "unicorn",
    name: "Unicorn",
    emoji: "🦄",
    tier: "mythic",
    basePrice: 12000000,
    ability: "2x Rainbow Chance",
    blurb: "Trots through the garden and doubles the chance of a Rainbow-mutated fruit. Pairs with any 40x plan.",
    tags: ["loot", "mythic", "rainbow"],
  },

  // ── Super ──────────────────────────────────────────────
  {
    slug: "raccoon",
    name: "Raccoon",
    emoji: "🦝",
    tier: "super",
    basePrice: 15000000,
    ability: "+25 Steal Limit",
    blurb: "Sneaks out at night to steal fruit from empty gardens and lifts your own steal cap by +25. A raider's best friend.",
    tags: ["loot", "super", "steal"],
  },
  {
    slug: "ice-serpent",
    name: "Ice Serpent",
    emoji: "🐍",
    tier: "super",
    basePrice: 20000000,
    ability: "Frost breath freezes intruders",
    blurb: "Flies around the garden and breathes frost on raiders, freezing them solid mid-theft. Premium defense.",
    tags: ["defense", "super"],
  },
  {
    slug: "black-dragon",
    name: "Black Dragon",
    emoji: "🐉",
    tier: "super",
    basePrice: 1000000,
    ability: "Fire breath sets intruders ablaze",
    blurb: "Soars above the plot and torches anyone who tries to take your fruit. Lower price than the other Supers.",
    tags: ["defense", "super"],
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
