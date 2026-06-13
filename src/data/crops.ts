import type { TierId } from "./tiers";

export type Obtainment =
  | "shop"
  | "code"
  | "unknown"
  | "event"
  | "premium";

export interface Crop {
  /** URL slug used in routes. */
  slug: string;
  /** Display name. */
  name: string;
  /** Emoji used as a quick visual identifier in the wiki. */
  emoji: string;
  /** Tier classification. */
  tier: TierId;
  /** Approximate grow time in seconds (canonical where published). */
  growTimeSec: number | null;
  /** Cost in Sheckles (in-game currency) to buy a seed from the shop. */
  seedPriceSheckles: number | null;
  /** Cost in Robux for the 1x/3x/10x seed bundles. */
  seedPriceRobux: { x1: number; x3: number; x10: number } | null;
  /** Rarity-weighted base sell value per harvest, in Sheckles. */
  baseValue: number;
  /** Canonical Price-Floor Value (Sheckles). null when the source marks TBD. */
  valueFloor: number | null;
  /** Canonical Average Value (Sheckles). null when the source marks TBD. */
  valueAvg: number | null;
  /** Canonical Price-Floor Weight (grams). null when the source marks TBD. */
  weightFloorG: number | null;
  /** Canonical Average Weight (grams). null when the source marks TBD. */
  weightAvgG: number | null;
  /** Canonical Minimum Weight (grams). null when the source marks TBD. */
  weightMinG: number | null;
  /** Canonical Huge Chance (percent). null when the source marks TBD. */
  hugeChancePct: number | null;
  /**
   * Whether the crop yields multiple harvests per planting.
   * GAG2 wiki (canonical) marks this "Unknown" for every crop today.
   * GAG1 wiki is the only public source with concrete values, so we
   * use it as a fallback for crops that share a name across both games.
   * null = no confident source (GAG2-only crop, or neither wiki published).
   * "gag1" = inferred from the GAG1 wiki page (cross-game fallback).
   * "single" = single harvest. "multi" = multi-harvest.
   */
  multiHarvest: boolean | "single" | "multi" | null;
  /** Where the multiHarvest value came from (for the UI/source line). */
  multiHarvestSource: "canonical" | "gag1-fallback" | "beebom" | null;
  /** Short tag used for grouping or filtering. */
  family: "fruit" | "vegetable" | "flower" | "fungus" | "special";
  /** How the seed is obtained (own wording, sourced from wiki). */
  obtainment: Obtainment;
  /** Reward code, if obtained via code redemption. */
  code?: string;
  /** Short blurb describing the crop (own wording, ≤ 80 chars). */
  blurb: string;
  /** Tags surfaced on detail pages. */
  tags: string[];
}

export const CROPS: Crop[] = [
  // ── Common ─────────────────────────────────────────────
  {
    slug: "carrot",
    name: "Carrot",
    emoji: "🥕",
    tier: "common",
    growTimeSec: 10,
    multiHarvest: "single",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 1,
    seedPriceRobux: { x1: 4, x3: 12, x10: 40 },
    baseValue: 1,
    valueFloor: 1,
    valueAvg: 1,
    weightFloorG: 0.95,
    weightAvgG: 1.0,
    weightMinG: 0.70,
    hugeChancePct: 1.0,
    family: "vegetable",
    obtainment: "shop",
    blurb: "Reliable root vegetable — the textbook beginner crop.",
    tags: ["root", "beginner"],
  },
  {
    slug: "strawberry",
    name: "Strawberry",
    emoji: "🍓",
    tier: "common",
    growTimeSec: 120,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 50,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 60,
    family: "fruit",
    obtainment: "shop",
    blurb: "First multi-harvest fruit. A staple for any starter plot.",
    tags: ["multi-harvest", "fruit"],
  },
  {
    slug: "blueberry",
    name: "Blueberry",
    emoji: "🫐",
    tier: "common",
    growTimeSec: 150,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 80,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 75,
    family: "fruit",
    obtainment: "shop",
    blurb: "Bushy multi-harvest berry — pairs well with strawberry fields.",
    tags: ["multi-harvest", "berry"],
  },

  // ── Uncommon ───────────────────────────────────────────
  {
    slug: "tulip",
    name: "Tulip",
    emoji: "🌷",
    tier: "uncommon",
    growTimeSec: 180,
    multiHarvest: "single",
    multiHarvestSource: "beebom",
    seedPriceSheckles: null,
    seedPriceRobux: null,
        valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 220,
    family: "flower",
    obtainment: "shop",
    blurb: "A decorative bulb that fetches a tidy premium.",
    tags: ["flower", "decor"],
  },
  {
    slug: "tomato",
    name: "Tomato",
    emoji: "🍅",
    tier: "uncommon",
    growTimeSec: 240,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 200,
    seedPriceRobux: null,
        valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 340,
    family: "vegetable",
    obtainment: "shop",
    blurb: "Multi-harvest vine — high return over a single planting.",
    tags: ["multi-harvest", "vine"],
  },
  {
    slug: "apple",
    name: "Apple",
    emoji: "🍎",
    tier: "uncommon",
    growTimeSec: 300,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 450,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 520,
    family: "fruit",
    obtainment: "shop",
    blurb: "Classic orchard tree. Patient, but very rewarding.",
    tags: ["tree", "fruit"],
  },

  // ── Rare ───────────────────────────────────────────────
  {
    slug: "bamboo",
    name: "Bamboo",
    emoji: "🎋",
    tier: "rare",
    growTimeSec: 360,
    multiHarvest: "single",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 800,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 950,
    family: "special",
    obtainment: "shop",
    blurb: "Rapid vertical growth. A favorite for tight plot layouts.",
    tags: ["fast-grow", "structural"],
  },
  {
    slug: "corn",
    name: "Corn",
    emoji: "🌽",
    tier: "rare",
    growTimeSec: 420,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 1100,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 1300,
    family: "vegetable",
    obtainment: "shop",
    blurb: "Stalks that keep producing — built for long sessions.",
    tags: ["multi-harvest", "staple"],
  },
  {
    slug: "cactus",
    name: "Cactus",
    emoji: "🌵",
    tier: "rare",
    growTimeSec: 480,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 1500,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 1800,
    family: "special",
    obtainment: "shop",
    blurb: "Hardy desert plant. Single harvest, generous payout.",
    tags: ["desert", "single"],
  },
  {
    slug: "pineapple",
    name: "Pineapple",
    emoji: "🍍",
    tier: "rare",
    growTimeSec: 540,
    multiHarvest: "single",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 2000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 2400,
    family: "fruit",
    obtainment: "shop",
    blurb: "Tropical multi-harvest — slower but worth the wait.",
    tags: ["tropical", "multi-harvest"],
  },

  // ── Epic ───────────────────────────────────────────────
  {
    slug: "mushroom",
    name: "Mushroom",
    emoji: "🍄",
    tier: "epic",
    growTimeSec: 600,
    multiHarvest: "single",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 3200,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 3800,
    family: "fungus",
    obtainment: "shop",
    blurb: "Shaded grower. Multi-harvest fungus that loves damp plots.",
    tags: ["shade", "fungus"],
  },
  {
    slug: "green-bean",
    name: "Green Bean",
    emoji: "🫛",
    tier: "epic",
    growTimeSec: 720,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 4500,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 5200,
    family: "vegetable",
    obtainment: "code",
    code: "TEAMGREENBEAN",
    blurb: "Climbing vine from the TEAMGREENBEAN code — 3 free seeds.",
    tags: ["vine", "multi-harvest", "code-reward"],
  },
  {
    slug: "banana",
    name: "Banana",
    emoji: "🍌",
    tier: "epic",
    growTimeSec: 780,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 5800,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 6800,
    family: "fruit",
    obtainment: "shop",
    blurb: "Bunching fruit tree. A workhorse for serious farmers.",
    tags: ["tree", "bunch"],
  },
  {
    slug: "grape",
    name: "Grape",
    emoji: "🍇",
    tier: "epic",
    growTimeSec: 840,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 7000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 8200,
    family: "fruit",
    obtainment: "shop",
    blurb: "Vine fruit. Reliable multi-harvest with premium pricing.",
    tags: ["vine", "premium"],
  },
  {
    slug: "coconut",
    name: "Coconut",
    emoji: "🥥",
    tier: "epic",
    growTimeSec: 900,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 8500,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 9800,
    family: "fruit",
    obtainment: "shop",
    blurb: "Tropical palm. Long grow, exceptional reward per cycle.",
    tags: ["tropical", "palm"],
  },
  {
    slug: "mango",
    name: "Mango",
    emoji: "🥭",
    tier: "epic",
    growTimeSec: 960,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 10000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 11500,
    family: "fruit",
    obtainment: "shop",
    blurb: "Late-game tropical — patient planters only.",
    tags: ["tropical", "premium"],
  },

  // ── Legendary ──────────────────────────────────────────
  {
    slug: "dragon-fruit",
    name: "Dragon Fruit",
    emoji: "🐉",
    tier: "legendary",
    growTimeSec: 1200,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: null,
    seedPriceRobux: null,
        valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 22000,
    family: "fruit",
    obtainment: "shop",
    blurb: "Exotic cactus fruit. The first real taste of legendary loot.",
    tags: ["exotic", "cactus"],
  },
  {
    slug: "acorn",
    name: "Acorn",
    emoji: "🌰",
    tier: "legendary",
    growTimeSec: 1500,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 24000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 28000,
    family: "special",
    obtainment: "shop",
    blurb: "Sapling-to-tree. Single harvest with one of the best payouts.",
    tags: ["tree", "single"],
  },
  {
    slug: "cherry",
    name: "Cherry",
    emoji: "🍒",
    tier: "legendary",
    growTimeSec: 1680,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 30000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 36000,
    family: "fruit",
    obtainment: "shop",
    blurb: "Twin-fruit cherry tree. The aesthetic legend.",
    tags: ["twin", "tree"],
  },
  {
    slug: "sunflower",
    name: "Sunflower",
    emoji: "🌻",
    tier: "legendary",
    growTimeSec: 1800,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: 36000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 44000,
    family: "flower",
    obtainment: "shop",
    blurb: "Tall heliotrope — luminous, valuable, and great for screenshots.",
    tags: ["flower", "luminous"],
  },

  // ── Mythic ─────────────────────────────────────────────
  {
    slug: "venus-fly-trap",
    name: "Venus Fly Trap",
    emoji: "🪴",
    tier: "mythic",
    growTimeSec: 2400,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: null,
    seedPriceRobux: null,
        valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 95000,
    family: "special",
    obtainment: "shop",
    blurb: "Carnivorous plant. Event-bound and worth every Sheckle.",
    tags: ["event", "carnivore"],
  },
  {
    slug: "pomegranate",
    name: "Pomegranate",
    emoji: "🍎",
    tier: "mythic",
    growTimeSec: 2700,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: 95000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 120000,
    family: "fruit",
    obtainment: "shop",
    blurb: "Antique fruit tree. Mythic rarity, mythic reward.",
    tags: ["tree", "ancient"],
  },
  {
    slug: "poison-apple",
    name: "Poison Apple",
    emoji: "☠️",
    tier: "mythic",
    growTimeSec: 3000,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: 130000,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 165000,
    family: "special",
    obtainment: "shop",
    blurb: "Single-harvest toxic fruit — dark, dramatic, expensive.",
    tags: ["toxic", "single"],
  },

  // ── Super ──────────────────────────────────────────────
  {
    slug: "moon-bloom",
    name: "Moon Bloom",
    emoji: "🌸",
    tier: "super",
    growTimeSec: 3600,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: null,
    seedPriceRobux: null,
        valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 750000,
    family: "flower",
    obtainment: "shop",
    blurb: "Night-blooming super-flower. Endgame floral flex.",
    tags: ["night", "endgame"],
  },
  {
    slug: "dragons-breath",
    name: "Dragon's Breath",
    emoji: "🔥",
    tier: "super",
    growTimeSec: null,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: null,
    seedPriceRobux: null,
        valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 1_500_000,
    family: "special",
    obtainment: "shop",
    blurb: "Mythic-tier bloom with a pyroclastic finish. Apex crop.",
    tags: ["fire", "apex"],
  },

  // ── Unknown seeds (the wiki) ─────────────────────
  {
    slug: "baby-cactus",
    name: "Baby Cactus",
    emoji: "🌵",
    tier: "unknown",
    growTimeSec: 240,
    multiHarvest: "single",
    multiHarvestSource: "canonical",
    seedPriceSheckles: null,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 3200,
    family: "special",
    obtainment: "unknown",
    blurb: "Tiny desert starter. Pulled from the the wiki.",
    tags: ["pack-exclusive", "starter"],
  },
  {
    slug: "horned-melon",
    name: "Horned Melon",
    emoji: "🍈",
    tier: "unknown",
    growTimeSec: 600,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: null,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 8800,
    family: "fruit",
    obtainment: "unknown",
    blurb: "Spiky exotic fruit — a Pack-exclusive oddity.",
    tags: ["exotic", "pack-exclusive"],
  },
  {
    slug: "glow-mushroom",
    name: "Glow Mushroom",
    emoji: "🍄",
    tier: "unknown",
    growTimeSec: 900,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: null,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 14500,
    family: "fungus",
    obtainment: "unknown",
    blurb: "Bioluminescent fungus. Luminous, Pack-only, and collectible.",
    tags: ["luminous", "pack-exclusive"],
  },
  {
    slug: "poison-ivy",
    name: "Poison Ivy",
    emoji: "🌿",
    tier: "unknown",
    growTimeSec: null,
    multiHarvest: "multi",
    multiHarvestSource: "canonical",
    seedPriceSheckles: null,
    seedPriceRobux: null,
        valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 38000,
    family: "special",
    obtainment: "unknown",
    blurb: "Vining toxic plant. Pack-exclusive and a top-tier event piece.",
    tags: ["toxic", "pack-exclusive"],
  },
  {
    slug: "ghost-pepper",
    name: "Ghost Pepper",
    emoji: "👻",
    tier: "unknown",
    growTimeSec: 2700,
    multiHarvest: "multi",
    multiHarvestSource: "beebom",
    seedPriceSheckles: null,
    seedPriceRobux: null,
    valueFloor: null,
    valueAvg: null,
    weightFloorG: null,
    weightAvgG: null,
    weightMinG: null,
    hugeChancePct: null,

    baseValue: 142000,
    family: "vegetable",
    obtainment: "unknown",
    blurb: "Headliner of its own pack. Spicy, single-harvest, premium payout.",
    tags: ["pack-exclusive", "headline"],
  },
];

export const CROP_MAP: Record<string, Crop> = CROPS.reduce((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {} as Record<string, Crop>);

export function getCropBySlug(slug: string): Crop | undefined {
  return CROP_MAP[slug];
}

export function cropsByTier(tier: TierId): Crop[] {
  return CROPS.filter((c) => c.tier === tier);
}

export function obtainmentLabel(o: Obtainment): string {
  switch (o) {
    case "shop": return "Seed Shop";
    case "code": return "Code Reward";
    case "unknown": return "Unknown Drop";
    case "event": return "Event Drop";
    case "premium": return "Robux Premium";
  }
}
