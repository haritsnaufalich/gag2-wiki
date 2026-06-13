import type { TierId } from "./tiers";

export type GearCategory =
  | "sprinkler"
  | "watering"
  | "tool"
  | "gadget"
  | "mushroom"
  | "misc";

export interface Gear {
  slug: string;
  name: string;
  emoji: string;
  category: GearCategory;
  /** 1x Robux price. null when source marks TBD. */
  price1x: number | null;
  /** 3x bundle price. null when not offered. */
  price3x: number | null;
  /** 10x bundle price. null when not offered. */
  price10x: number | null;
  /** Optional Sheckle alt price (mainly sprinklers). */
  shecklesPrice: number | null;
  /** Tier when the gear has a clear one (sprinklers, mushrooms). */
  tier?: TierId;
  /** Short effect description. null when wiki marks it as TBD. */
  effect: string | null;
  /** One-liner blurb (own wording, sourced from wiki). */
  blurb: string;
}

export const GEARS: Gear[] = [
  // ── Sprinklers (have Robux + Sheckles alt prices) ───────
  {
    slug: "common-sprinkler",
    name: "Common Sprinkler",
    emoji: "💧",
    category: "sprinkler",
    tier: "common",
    price1x: 7,
    price3x: 21,
    price10x: 70,
    shecklesPrice: 3000,
    effect: null,
    blurb: "Basic auto-waterer. Cheap and wide-coverage for starter plots.",
  },
  {
    slug: "uncommon-sprinkler",
    name: "Uncommon Sprinkler",
    emoji: "💧",
    category: "sprinkler",
    tier: "uncommon",
    price1x: 25,
    price3x: 75,
    price10x: 250,
    shecklesPrice: 10000,
    effect: null,
    blurb: "Mid-tier auto-waterer. Larger range than the common variant.",
  },
  {
    slug: "rare-sprinkler",
    name: "Rare Sprinkler",
    emoji: "💧",
    category: "sprinkler",
    tier: "rare",
    price1x: 49,
    price3x: 147,
    price10x: 490,
    shecklesPrice: 50000,
    effect: null,
    blurb: "Wide-range sprinkler. Worth the Sheckle premium for late-game plots.",
  },
  {
    slug: "legendary-sprinkler",
    name: "Legendary Sprinkler",
    emoji: "💧",
    category: "sprinkler",
    tier: "legendary",
    price1x: 220,
    price3x: 660,
    price10x: 2220,
    shecklesPrice: 100000,
    effect: null,
    blurb: "Endgame auto-waterer. Covers huge plots with one placement.",
  },
  {
    slug: "super-sprinkler",
    name: "Super Sprinkler",
    emoji: "💧",
    category: "sprinkler",
    tier: "super",
    price1x: 399,
    price3x: 1197,
    price10x: 3990,
    shecklesPrice: null,
    effect: null,
    blurb: "Apex sprinkler. The biggest range in the gear shop.",
  },

  // ── Watering cans & hose ───────────────────────────────
  {
    slug: "common-watering-can",
    name: "Common Watering Can",
    emoji: "🪣",
    category: "watering",
    price1x: 4,
    price3x: 12,
    price10x: 40,
    shecklesPrice: null,
    effect: null,
    blurb: "Manual waterer. Cheap starter tool for spot-watering crops.",
  },
  {
    slug: "super-watering-can",
    name: "Super Watering Can",
    emoji: "🪣",
    category: "watering",
    price1x: 340,
    price3x: 1020,
    price10x: 3400,
    shecklesPrice: null,
    effect: null,
    blurb: "High-capacity can. Reaches across an entire plot in one pour.",
  },
  {
    slug: "power-hose",
    name: "Power Hose",
    emoji: "🌊",
    category: "watering",
    price1x: 299,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: null,
    blurb: "Mechanised waterer. Single purchase; the fastest manual option.",
  },

  // ── Tools (rakes, trowels, etc.) ────────────────────────
  {
    slug: "trowel",
    name: "Trowel",
    emoji: "🔨",
    category: "tool",
    price1x: 30,
    price3x: 90,
    price10x: 300,
    shecklesPrice: null,
    effect: null,
    blurb: "Handy soil tool for plot prep. The cheapest of the tool group.",
  },
  {
    slug: "rake",
    name: "Rake",
    emoji: "🔨",
    category: "tool",
    price1x: 65,
    price3x: 195,
    price10x: 650,
    shecklesPrice: null,
    effect: null,
    blurb: "Heavy-duty rake. Cleans up larger plots in a single sweep.",
  },
  {
    slug: "crowbar",
    name: "Crowbar",
    emoji: "🔨",
    category: "tool",
    price1x: 85,
    price3x: 255,
    price10x: 850,
    shecklesPrice: null,
    effect: null,
    blurb: "Mid-tier tool for prying up plants. Pairs with the shovel.",
  },

  // ── Gadgets ─────────────────────────────────────────────
  {
    slug: "rainbow-carpet",
    name: "Rainbow Carpet",
    emoji: "🌈",
    category: "gadget",
    price1x: 7,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: "Fly around to help collect, or steal!",
    blurb: "Cheap movement gadget. Quick zip across the map for collection or raids.",
  },
  {
    slug: "teleporter",
    name: "Teleporter",
    emoji: "⚡",
    category: "gadget",
    price1x: 260,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: null,
    blurb: "Single-purchase teleport pad. The fastest way to jump between plots.",
  },
  {
    slug: "freeze-ray",
    name: "Freeze Ray",
    emoji: "❄️",
    category: "gadget",
    price1x: 749,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: "Freeze people and stop them from stealing!",
    blurb: "Anti-theft gadget. Locks would-be raiders in place during night.",
  },
  {
    slug: "vine-wrapper",
    name: "Vine Wrapper",
    emoji: "🌿",
    category: "gadget",
    price1x: 499,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: "Trap people into vines!",
    blurb: "Defensive plant trap. Wraps intruders in slow vines for a quick counter.",
  },

  // ── Mushrooms (movement/status effects) ────────────────
  {
    slug: "jump-mushroom",
    name: "Jump Mushroom",
    emoji: "🍄",
    category: "mushroom",
    price1x: 32,
    price3x: 96,
    price10x: 320,
    shecklesPrice: null,
    effect: null,
    blurb: "Bounce-boosting shroom. Gives a temporary jump-height buff.",
  },
  {
    slug: "speed-mushroom",
    name: "Speed Mushroom",
    emoji: "🍄",
    category: "mushroom",
    price1x: 32,
    price3x: 96,
    price10x: 320,
    shecklesPrice: null,
    effect: null,
    blurb: "Quickstep shroom. Temp walk-speed boost for chasing or escaping.",
  },
  {
    slug: "shrink-mushroom",
    name: "Shrink Mushroom",
    emoji: "🍄",
    category: "mushroom",
    price1x: 70,
    price3x: 210,
    price10x: 700,
    shecklesPrice: null,
    effect: null,
    blurb: "Miniaturises the player. Slip through tight gaps and dodge attacks.",
  },
  {
    slug: "supersize-mushroom",
    name: "Supersize Mushroom",
    emoji: "🍄",
    category: "mushroom",
    price1x: 70,
    price3x: 210,
    price10x: 700,
    shecklesPrice: null,
    effect: null,
    blurb: "Grow-the-player shroom. Trade shrink for reach and intimidation.",
  },
  {
    slug: "invisibility-mushroom",
    name: "Invisibility Mushroom",
    emoji: "🍄",
    category: "mushroom",
    price1x: 240,
    price3x: 720,
    price10x: 2400,
    shecklesPrice: null,
    effect: null,
    blurb: "Cloak on demand. The premium raiding tool — disappears mid-raid.",
  },

  // ── Misc tools & items ─────────────────────────────────
  {
    slug: "sign",
    name: "Sign",
    emoji: "📛",
    category: "misc",
    price1x: 49,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: null,
    blurb: "Plot label. Cosmetic, but useful for naming crop zones.",
  },
  {
    slug: "flashbang",
    name: "Flashbang",
    emoji: "💡",
    category: "misc",
    price1x: 59,
    price3x: 177,
    price10x: 590,
    shecklesPrice: null,
    effect: null,
    blurb: "Stun utility. Disorients intruders for a clean defense window.",
  },
  {
    slug: "door-crowbar",
    name: "Door Crowbar",
    emoji: "🔨",
    category: "misc",
    price1x: 59,
    price3x: 177,
    price10x: 590,
    shecklesPrice: null,
    effect: null,
    blurb: "Pry-tool for the raiding set. Opens locked garden doors fast.",
  },
  {
    slug: "lantern",
    name: "Lantern",
    emoji: "🏮",
    category: "misc",
    price1x: 99,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: null,
    blurb: "Light source. Helps with night visibility when pets don't cover it.",
  },
  {
    slug: "gnome",
    name: "Gnome",
    emoji: "🥷",
    category: "misc",
    price1x: 95,
    price3x: 285,
    price10x: 950,
    shecklesPrice: null,
    effect: null,
    blurb: "Garden decoration. No gameplay buff — pure aesthetic plot piece.",
  },
  {
    slug: "wheelbarrow",
    name: "Wheelbarrow",
    emoji: "🛒",
    category: "misc",
    price1x: 129,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: null,
    blurb: "Carry hauler. Spacious single-purchase for harvesting large loads.",
  },
  {
    slug: "basic-pot",
    name: "Basic Pot",
    emoji: "🧪",
    category: "misc",
    price1x: 179,
    price3x: 537,
    price10x: 1790,
    shecklesPrice: null,
    effect: null,
    blurb: "Plant pot. Holder for indoor / decorative crop placements.",
  },
  {
    slug: "raccoon",
    name: "Raccoon",
    emoji: "🦥",
    category: "misc",
    price1x: 360,
    price3x: 1080,
    price10x: 3600,
    shecklesPrice: null,
    effect: null,
    blurb: "Garden sidekick. Cosmetic companion that hovers near the plot.",
  },
  {
    slug: "shovel",
    name: "Shovel",
    emoji: "🥀",
    category: "misc",
    price1x: null,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: null,
    blurb: "Retrieval tool. Lets you hit fruit thieves to take it back. Price TBD.",
  },
  {
    slug: "build",
    name: "Build",
    emoji: "👷",
    category: "misc",
    price1x: null,
    price3x: null,
    price10x: null,
    shecklesPrice: null,
    effect: null,
    blurb: "Builder toolkit. Wiki marks price TBD; included here for completeness.",
  },
];

export const GEAR_MAP: Record<string, Gear> = GEARS.reduce((acc, g) => {
  acc[g.slug] = g;
  return acc;
}, {} as Record<string, Gear>);

export function getGearBySlug(slug: string): Gear | undefined {
  return GEAR_MAP[slug];
}

export const GEAR_CATEGORIES: { id: GearCategory; label: string; emoji: string }[] = [
  { id: "sprinkler", label: "Sprinklers", emoji: "💧" },
  { id: "watering",  label: "Watering",   emoji: "🪣" },
  { id: "tool",      label: "Tools",      emoji: "🔨" },
  { id: "gadget",    label: "Gadgets",    emoji: "⚡" },
  { id: "mushroom",  label: "Mushrooms",  emoji: "🍄" },
  { id: "misc",      label: "Misc",       emoji: "📦" },
];
