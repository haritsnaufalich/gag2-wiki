/** Sprinklers: passive watering gears that help crops grow. */
export interface Sprinkler {
  slug: string;
  name: string;
  emoji: string;
  rarity: "common" | "uncommon" | "rare" | "legendary" | "super";
  /** Price in Sheckles. */
  priceSheckles: number;
  blurb: string;
}

export const SPRINKLERS: Sprinkler[] = [
  {
    slug: "common-sprinkler",
    name: "Common Sprinkler",
    emoji: "Sp",
    rarity: "common",
    priceSheckles: 3000,
    blurb: "Basic auto-waterer that periodically waters nearby crops.",
  },
  {
    slug: "uncommon-sprinkler",
    name: "Uncommon Sprinkler",
    emoji: "Sp",
    rarity: "uncommon",
    priceSheckles: 10000,
    blurb: "Mid-tier auto-waterer with a moderate watering radius.",
  },
  {
    slug: "rare-sprinkler",
    name: "Rare Sprinkler",
    emoji: "Sp",
    rarity: "rare",
    priceSheckles: 80000,
    blurb: "Wide-radius sprinkler for larger crop layouts.",
  },
  {
    slug: "legendary-sprinkler",
    name: "Legendary Sprinkler",
    emoji: "Sp",
    rarity: "legendary",
    priceSheckles: 1200000,
    blurb: "Very large-radius sprinkler for late-game plots.",
  },
  {
    slug: "super-sprinkler",
    name: "Super Sprinkler",
    emoji: "Sp",
    rarity: "super",
    priceSheckles: 3000000,
    blurb: "Top-tier sprinkler that waters the entire plot.",
  },
];
