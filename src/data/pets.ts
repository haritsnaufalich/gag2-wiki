import type { TierId } from "./tiers";

export type PetObtainment = "map-spawn" | "guild-rewards" | "unknown";

export interface Pet {
  slug: string;
  name: string;
  emoji: string;
  /** Canonical tier as listed on growagarden2wiki.com. */
  tier: TierId;
  /** Sheckle cost. null when the wiki lists a non-Sheckle source or TBD. */
  basePrice: number | null;
  /** How the pet is currently obtained on the wiki. */
  obtainment: PetObtainment;
  /** One-line description of the passive (own wording, sourced from the wiki). */
  ability: string;
  blurb: string;
  tags: string[];
}

export const PET_OBTAINMENT_LABELS: Record<PetObtainment, string> = {
  "map-spawn": "Map spawn",
  "guild-rewards": "Guild Rewards",
  unknown: "Unknown",
};

export const PETS: Pet[] = [
  {
    slug: "frog",
    name: "Frog",
    emoji: "Fr",
    tier: "common",
    basePrice: 10000,
    obtainment: "map-spawn",
    ability: "+5 Jump Height",
    blurb: "Hops around your garden and boosts jump height by +5.",
    tags: ["movement", "common"],
  },
  {
    slug: "bunny",
    name: "Bunny",
    emoji: "Bn",
    tier: "common",
    basePrice: 20000,
    obtainment: "map-spawn",
    ability: "+5 Walk Speed",
    blurb: "Hops around your garden and boosts walk speed by +5.",
    tags: ["movement", "common"],
  },
  {
    slug: "owl",
    name: "Owl",
    emoji: "Ow",
    tier: "uncommon",
    basePrice: 25000,
    obtainment: "map-spawn",
    ability: "+12.5% Night View Distance",
    blurb: "Extends view distance at night and calls out rare pet spawns.",
    tags: ["vision", "night"],
  },
  {
    slug: "deer",
    name: "Deer",
    emoji: "De",
    tier: "rare",
    basePrice: 50000,
    obtainment: "map-spawn",
    ability: "+10% Plant Growth Speed",
    blurb: "Trots around your garden and helps plants grow faster.",
    tags: ["growth"],
  },
  {
    slug: "robin",
    name: "Robin",
    emoji: "Rb",
    tier: "legendary",
    basePrice: 75000,
    obtainment: "map-spawn",
    ability: "Drops seeds from eaten fruit",
    blurb: "Eats ripe fruit and can drop bonus seeds while moving around the garden.",
    tags: ["loot", "legendary"],
  },
  {
    slug: "bee",
    name: "Bee",
    emoji: "Be",
    tier: "legendary",
    basePrice: 1000000,
    obtainment: "map-spawn",
    ability: "Defends against intruders",
    blurb: "Patrols the garden and swarms intruders to defend your fruit.",
    tags: ["defense", "legendary"],
  },
  {
    slug: "monkey",
    name: "Monkey",
    emoji: "Mk",
    tier: "mythic",
    basePrice: 3000000,
    obtainment: "map-spawn",
    ability: "Picks ripe fruit and brings it to you",
    blurb: "Swings around the garden and occasionally carries ripe fruit back to you.",
    tags: ["loot", "mythic"],
  },
  {
    slug: "golden-dragonfly",
    name: "Golden Dragonfly",
    emoji: "Gd",
    tier: "mythic",
    basePrice: 9000000,
    obtainment: "map-spawn",
    ability: "2x Gold Chance",
    blurb: "Doubles the chance for plants and fruit to turn Gold.",
    tags: ["loot", "mythic", "gold"],
  },
  {
    slug: "unicorn",
    name: "Unicorn",
    emoji: "Un",
    tier: "mythic",
    basePrice: 12000000,
    obtainment: "map-spawn",
    ability: "2x Rainbow Chance",
    blurb: "Doubles the chance for plants and fruit to turn Rainbow.",
    tags: ["loot", "mythic", "rainbow"],
  },
  {
    slug: "raccoon",
    name: "Raccoon",
    emoji: "Rc",
    tier: "super",
    basePrice: 15000000,
    obtainment: "map-spawn",
    ability: "+25 Steal Limit",
    blurb: "Sneaks out at night to steal fruit and raises your steal limit by +25.",
    tags: ["loot", "super", "steal"],
  },
  {
    slug: "ice-serpent",
    name: "Ice Serpent",
    emoji: "Is",
    tier: "super",
    basePrice: null,
    obtainment: "guild-rewards",
    ability: "Frost breath freezes intruders",
    blurb: "Flies around the garden and freezes intruders mid-theft.",
    tags: ["defense", "super", "guild"],
  },
  {
    slug: "black-dragon",
    name: "Black Dragon",
    emoji: "Bd",
    tier: "super",
    basePrice: 1000000,
    obtainment: "unknown",
    ability: "Fire breath sets intruders ablaze",
    blurb: "Flies around the garden and sets intruders ablaze with fire breath.",
    tags: ["defense", "super"],
  },
  {
    slug: "capybara",
    name: "Capybara",
    emoji: "Cp",
    tier: "unknown",
    basePrice: null,
    obtainment: "unknown",
    ability: "Unknown - not yet released",
    blurb: "Unreleased pet listed by the wiki with unknown obtainment and ability.",
    tags: ["unreleased", "unknown"],
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
