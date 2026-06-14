/** Sprinklers: passive watering gears that help crops grow. */
export interface Sprinkler {
  slug: string;
  name: string;
  emoji: string;
  rarity: "common" | "uncommon" | "rare" | "legendary" | "super";
  /** Price in Robux (always available for cash). */
  priceRobux: number;
  /** Alternative price in Sheckles (null when only Robux is offered). */
  priceSheckles: number | null;
  blurb: string;
}

export const SPRINKLERS: Sprinkler[] = [
  {
    slug: "common-sprinkler",
    name: "Common Sprinkler",
    emoji: "💧",
    rarity: "common",
    priceRobux: 7,
    priceSheckles: 3000,
    blurb: "Basic auto-waterer. Cheap and wide-coverage for starter plots.",
  },
  {
    slug: "uncommon-sprinkler",
    name: "Uncommon Sprinkler",
    emoji: "💧",
    rarity: "uncommon",
    priceRobux: 25,
    priceSheckles: 10000,
    blurb: "Mid-tier auto-waterer. Larger range than the common variant.",
  },
  {
    slug: "rare-sprinkler",
    name: "Rare Sprinkler",
    emoji: "💧",
    rarity: "rare",
    priceRobux: 49,
    priceSheckles: 50000,
    blurb: "Wide-range sprinkler. Worth the Sheckle premium for late-game plots.",
  },
  {
    slug: "legendary-sprinkler",
    name: "Legendary Sprinkler",
    emoji: "💧",
    rarity: "legendary",
    priceRobux: 220,
    priceSheckles: 100000,
    blurb: "Endgame auto-waterer. Covers huge plots with one placement.",
  },
  {
    slug: "super-sprinkler",
    name: "Super Sprinkler",
    emoji: "💧",
    rarity: "super",
    priceRobux: 399,
    priceSheckles: null,
    blurb: "Apex sprinkler. The biggest range in the gear shop — Robux only.",
  },
];
