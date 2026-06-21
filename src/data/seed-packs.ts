export interface PackOdds {
  common: number;
  uncommon: number;
  rare: number;
  epic: number;
  legendary: number;
  mythic: number;
  super: number;
}

export interface PackItemOdd {
  item: string;
  chancePct: number;
}

export interface SeedPack {
  slug: string;
  name: string;
  emoji: string;
  /** Price in Robux. null when the wiki marks price as TBA. */
  price: number | null;
  /** Optional bundle prices in Robux, where the wiki publishes multiple purchase sizes. */
  bundlePrices?: number[];
  /** High-level description (own wording, sourced from wiki). */
  blurb: string;
  /** Rarity distribution, in % (0-100 per tier). null when the wiki marks odds as TBA. */
  odds: PackOdds | null;
  /** Confirmed per-crop/item odds when the wiki publishes them. */
  itemOdds?: PackItemOdd[];
  /** Crops that can only be obtained via this pack. */
  exclusiveCrops: string[];
  /** Wiki status: "Not Available", "Available", etc. */
  status: string;
}

const UNKNOWN_ODDS: PackOdds | null = null;

export const SEED_PACKS: SeedPack[] = [
  {
    slug: "common-seed-pack",
    name: "Common Seed Pack",
    emoji: "Pk",
    price: 129,
    blurb: "Entry-level pack containing Common and Uncommon seeds.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Available",
  },
  {
    slug: "ghost-pepper-pack",
    name: "Ghost Pepper Pack",
    emoji: "Gp",
    price: 99,
    bundlePrices: [99, 249, 799, 4499],
    blurb:
      "Limited Time Shop pack with five exclusive spicy crops, including Ghost Pepper and Poison Ivy.",
    odds: UNKNOWN_ODDS,
    itemOdds: [
      { item: "Baby Cactus", chancePct: 50 },
      { item: "Horned Melon", chancePct: 30 },
      { item: "Glow Mushroom", chancePct: 15 },
      { item: "Poison Ivy", chancePct: 4 },
      { item: "Ghost Pepper", chancePct: 1 },
    ],
    exclusiveCrops: ["Baby Cactus", "Horned Melon", "Glow Mushroom", "Poison Ivy", "Ghost Pepper"],
    status: "Available",
  },
  {
    slug: "legendary-seed-pack",
    name: "Legendary Seed Pack",
    emoji: "Lg",
    price: null,
    blurb: "Pack listed for Legendary-tier seeds; price and contents are TBA.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Available",
  },
  {
    slug: "premium-seed-pack",
    name: "Premium Seed Pack",
    emoji: "Pr",
    price: 99,
    blurb:
      "Premium pack with better odds for Epic and Legendary seeds according to the wiki.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Available",
  },
  {
    slug: "starter-pack",
    name: "Starter Pack",
    emoji: "St",
    price: 149,
    blurb: "One-time starter bundle for new players.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Available",
  },
  {
    slug: "uncommon-seed-pack",
    name: "Uncommon Seed Pack",
    emoji: "Un",
    price: null,
    blurb: "Pack listed for Uncommon-tier seeds; not currently available.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Not Available",
  },
  {
    slug: "rare-seed-pack",
    name: "Rare Seed Pack",
    emoji: "Ra",
    price: null,
    blurb: "Pack listed for Rare-tier seeds; not currently available.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Not Available",
  },
  {
    slug: "mythic-seed-pack",
    name: "Mythic Seed Pack",
    emoji: "My",
    price: null,
    blurb: "Pack listed for Mythic-tier seeds; not currently available.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Not Available",
  },
  {
    slug: "super-seed-pack",
    name: "Super Seed Pack",
    emoji: "Su",
    price: null,
    blurb: "Pack listed for Super-tier seeds; not currently available.",
    odds: UNKNOWN_ODDS,
    exclusiveCrops: [],
    status: "Not Available",
  },
  {
    slug: "secret-seed-pack",
    name: "Secret Seed Pack",
    emoji: "Se",
    price: null,
    blurb: "Pack with unknown contents; not currently available.",
    odds: UNKNOWN_ODDS,
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
