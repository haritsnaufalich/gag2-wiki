import type { TierId } from "./tiers";

export type Obtainment =
  | "shop"
  | "code"
  | "pack"
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
  /** Approximate grow time in seconds (estimated balance value). */
  growTimeSec: number;
  /** Whether the crop can be harvested more than once from a single planting. */
  multiHarvest: boolean;
  /** Cost in Sheckles (in-game currency) to buy a seed from the shop. */
  seedPriceSheckles: number | null;
  /** Rarity-weighted base sell value per harvest, in Sheckles. */
  baseValue: number;
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
    growTimeSec: 90,
    multiHarvest: false,
    seedPriceSheckles: 20,
    baseValue: 35,
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
    multiHarvest: true,
    seedPriceSheckles: 50,
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
    multiHarvest: true,
    seedPriceSheckles: 80,
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
    multiHarvest: false,
    seedPriceSheckles: 200,
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
    multiHarvest: true,
    seedPriceSheckles: 300,
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
    multiHarvest: true,
    seedPriceSheckles: 450,
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
    multiHarvest: true,
    seedPriceSheckles: 800,
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
    multiHarvest: true,
    seedPriceSheckles: 1100,
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
    multiHarvest: false,
    seedPriceSheckles: 1500,
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
    multiHarvest: true,
    seedPriceSheckles: 2000,
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
    multiHarvest: true,
    seedPriceSheckles: 3200,
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
    multiHarvest: true,
    seedPriceSheckles: 4500,
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
    multiHarvest: true,
    seedPriceSheckles: 5800,
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
    multiHarvest: true,
    seedPriceSheckles: 7000,
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
    multiHarvest: true,
    seedPriceSheckles: 8500,
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
    multiHarvest: true,
    seedPriceSheckles: 10000,
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
    multiHarvest: true,
    seedPriceSheckles: 18000,
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
    multiHarvest: false,
    seedPriceSheckles: 24000,
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
    multiHarvest: true,
    seedPriceSheckles: 30000,
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
    multiHarvest: true,
    seedPriceSheckles: 36000,
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
    multiHarvest: true,
    seedPriceSheckles: 75000,
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
    multiHarvest: true,
    seedPriceSheckles: 95000,
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
    multiHarvest: false,
    seedPriceSheckles: 130000,
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
    multiHarvest: true,
    seedPriceSheckles: 500000,
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
    growTimeSec: 5400,
    multiHarvest: true,
    seedPriceSheckles: 1_000_000,
    baseValue: 1_500_000,
    family: "special",
    obtainment: "shop",
    blurb: "Mythic-tier bloom with a pyroclastic finish. Apex crop.",
    tags: ["fire", "apex"],
  },

  // ── Pack seeds (Ghost Pepper Pack) ─────────────────────
  {
    slug: "baby-cactus",
    name: "Baby Cactus",
    emoji: "🌵",
    tier: "pack",
    growTimeSec: 240,
    multiHarvest: true,
    seedPriceSheckles: null,
    baseValue: 3200,
    family: "special",
    obtainment: "pack",
    blurb: "Tiny desert starter. Pulled from the Ghost Pepper Pack.",
    tags: ["pack-exclusive", "starter"],
  },
  {
    slug: "horned-melon",
    name: "Horned Melon",
    emoji: "🍈",
    tier: "pack",
    growTimeSec: 600,
    multiHarvest: false,
    seedPriceSheckles: null,
    baseValue: 8800,
    family: "fruit",
    obtainment: "pack",
    blurb: "Spiky exotic fruit — a Pack-exclusive oddity.",
    tags: ["exotic", "pack-exclusive"],
  },
  {
    slug: "glow-mushroom",
    name: "Glow Mushroom",
    emoji: "🍄",
    tier: "pack",
    growTimeSec: 900,
    multiHarvest: true,
    seedPriceSheckles: null,
    baseValue: 14500,
    family: "fungus",
    obtainment: "pack",
    blurb: "Bioluminescent fungus. Luminous, Pack-only, and collectible.",
    tags: ["luminous", "pack-exclusive"],
  },
  {
    slug: "poison-ivy",
    name: "Poison Ivy",
    emoji: "🌿",
    tier: "pack",
    growTimeSec: 1500,
    multiHarvest: true,
    seedPriceSheckles: null,
    baseValue: 38000,
    family: "special",
    obtainment: "pack",
    blurb: "Vining toxic plant. Pack-exclusive and a top-tier event piece.",
    tags: ["toxic", "pack-exclusive"],
  },
  {
    slug: "ghost-pepper",
    name: "Ghost Pepper",
    emoji: "👻",
    tier: "pack",
    growTimeSec: 2700,
    multiHarvest: false,
    seedPriceSheckles: null,
    baseValue: 142000,
    family: "vegetable",
    obtainment: "pack",
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
    case "pack": return "Pack Drop";
    case "event": return "Event Drop";
    case "premium": return "Robux Premium";
  }
}
