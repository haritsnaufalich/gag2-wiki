import type { TierId } from "./tiers";

/** A pet slot corresponds to its pass-time activity on the garden. */
export type PetSlot = "movement" | "vision" | "growth" | "defense" | "loot";

export interface Pet {
  slug: string;
  name: string;
  emoji: string;
  /** Canonical tier as listed on growagarden2wiki.com. */
  tier: TierId | "watchlist";
  /** Sheckle cost. null when source marks it as TBD. */
  basePrice: number | null;
  /** One-line description of the passive (own wording, sourced from the wiki). */
  ability: string;
  blurb: string;
  tags: string[];
}

export const PETS: Pet[] = [
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
    slug: "owl",
    name: "Owl",
    emoji: "🦉",
    tier: "uncommon",
    basePrice: 25000,
    ability: "+12.5% Night View Distance",
    blurb: "Sits on the highest plot and silently widens what you can see when the day/night cycle flips.",
    tags: ["vision", "night"],
  },
  {
    slug: "big-owl",
    name: "Big Owl",
    emoji: "🦉",
    tier: "uncommon",
    basePrice: 50000,
    ability: "+25% Night View Distance",
    blurb: "The Big variant of the standard owl. Doubles the night-view buff, worth the extra Sheckles if you farm after dark.",
    tags: ["vision", "night", "size-big"],
  },
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
  {
    slug: "gnome",
    name: "Gnome",
    emoji: "🧙",
    tier: "unknown",
    basePrice: null,
    ability: "To be confirmed",
    blurb: "Lurks in unusual garden corners. Ability and price are still TBD on the wiki — community is watching.",
    tags: ["pending", "mystery"],
  },
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
  {
    slug: "golden-dragonfly",
    name: "Golden Dragonfly",
    emoji: "🪰",
    tier: "mythic",
    basePrice: 3000000,
    ability: "2x Gold Chance",
    blurb: "The apex pet. Doubles the chance of any fruit you harvest turning Gold. Late-game Sheckle engine.",
    tags: ["loot", "mythic", "gold"],
  },
  {
    slug: "raccoon",
    name: "Raccoon",
    emoji: "🦝",
    tier: "watchlist",
    basePrice: null,
    ability: "Not confirmed",
    blurb: "On the wiki's watchlist. Spawns unconfirmed; price and ability TBD — community data only.",
    tags: ["pending", "watchlist"],
  },
];

export const PET_MAP: Record<string, Pet> = PETS.reduce((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {} as Record<string, Pet>);

export function getPetBySlug(slug: string): Pet | undefined {
  return PET_MAP[slug];
}

export function petsByTier(tier: TierId | "watchlist"): Pet[] {
  return PETS.filter((p) => p.tier === tier);
}
