/** Currency packs + Robux features for the Grow A Garden 2 economy. */
export interface CurrencyPack {
  amount: number; // Sheckles
  priceRobux: number;
}

export interface RobuxFeature {
  slug: string;
  name: string;
  costRobux: number | string; // string for ranges like "79 - 999"
  effect: string;
}

export const CURRENCY_PACKS: CurrencyPack[] = [
  { amount: 5_000,   priceRobux: 10 },
  { amount: 10_000,  priceRobux: 20 },
  { amount: 25_000,  priceRobux: 50 },
  { amount: 50_000,  priceRobux: 100 },
  { amount: 100_000, priceRobux: 200 },
];

export const ROBUX_FEATURES: RobuxFeature[] = [
  {
    slug: "grow-plant",
    name: "Grow Plant",
    costRobux: 39,
    effect: "Instantly skips the remaining growth time of a single crop on your plot.",
  },
  {
    slug: "grow-all",
    name: "Grow All",
    costRobux: 299,
    effect: "Instantly skips the growth of every crop and fruit on your plot at once.",
  },
  {
    slug: "restock-gear",
    name: "Gear Shop Restock",
    costRobux: 39,
    effect: "Instantly refreshes the Gear Shop without waiting for the restock timer.",
  },
  {
    slug: "restock-seed",
    name: "Seed Shop Restock",
    costRobux: 39,
    effect: "Instantly refreshes the Seed Shop without waiting for the restock timer.",
  },
  {
    slug: "restock-prop",
    name: "Prop Shop Restock",
    costRobux: 39,
    effect: "Instantly refreshes the Prop Shop without waiting for the restock timer.",
  },
  {
    slug: "backpack-space",
    name: "Backpack Space (+50 slots)",
    costRobux: "79 - 999",
    effect: "Increases inventory capacity by 50 slots per purchase. Cost scales with each upgrade.",
  },
  {
    slug: "inventory-slot",
    name: "Inventory Slot Upgrade",
    costRobux: 19,
    effect: "Single-slot inventory upgrade.",
  },
];

/** Per-friend Sheckle boost. 1 friend = +10%, capped at 4 friends = +40%. */
export const FRIEND_BOOST_PCT_PER_FRIEND = 10;
export const FRIEND_BOOST_MAX_FRIENDS = 4;
