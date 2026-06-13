export interface PackOdds {
  common: number;
  uncommon: number;
  epic: number;
  legendary: number;
  mythic: number;
  super: number;
}

export interface SeedPack {
  slug: string;
  name: string;
  emoji: string;
  /** Price in Robux. */
  price: number;
  /** High-level description (own wording, sourced from wiki). */
  blurb: string;
  /** Rarity distribution, in % (0-100 per tier). */
  odds: PackOdds;
  /** Crops that can only be obtained via this pack. */
  exclusiveCrops: string[];
  /** Wiki status: "Not Available", "Available", etc. */
  status: string;
}

export const SEED_PACKS: SeedPack[] = [
  {
    slug: "common-seed-pack",
    name: "Common Seed Pack",
    emoji: "📦",
    price: 129,
    blurb:
      "Starter-friendly pack. Common to Rare seeds at friendly odds, no Mythic ceiling.",
    odds: {
      common: 60,
      uncommon: 25,
      epic: 10,
      legendary: 4,
      mythic: 1,
      super: 0,
    },
    exclusiveCrops: [],
    status: "Not Available",
  },
  {
    slug: "ghost-pepper-pack",
    name: "Ghost Pepper Pack",
    emoji: "🌶️",
    price: 99,
    blurb:
      "Event pack with spicy varieties. Chance at Ghost Pepper and other heat-themed seeds.",
    odds: {
      common: 30,
      uncommon: 30,
      epic: 20,
      legendary: 15,
      mythic: 4,
      super: 1,
    },
    exclusiveCrops: ["Ghost Pepper", "Horned Melon", "Baby Cactus", "Glow Mushroom", "Poison Ivy"],
    status: "Not Available",
  },
  {
    slug: "premium-seed-pack",
    name: "Premium Seed Pack",
    emoji: "💎",
    price: 99,
    blurb:
      "Better Epic and Legendary odds than the Common pack. Best value for rare hunters.",
    odds: {
      common: 30,
      uncommon: 20,
      epic: 25,
      legendary: 15,
      mythic: 8,
      super: 2,
    },
    exclusiveCrops: [],
    status: "Not Available",
  },
  {
    slug: "starter-pack",
    name: "Starter Pack",
    emoji: "🎁",
    price: 149,
    blurb:
      "One-time bundle for new players. Curated selection to kickstart the garden.",
    odds: {
      common: 50,
      uncommon: 30,
      epic: 15,
      legendary: 4,
      mythic: 1,
      super: 0,
    },
    exclusiveCrops: [],
    status: "Not Available",
  },
];

export const SEED_PACK_MAP: Record<string, SeedPack> = SEED_PACKS.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, SeedPack>
);

export function getSeedPackBySlug(slug: string): SeedPack | undefined {
  return SEED_PACK_MAP[slug];
}
