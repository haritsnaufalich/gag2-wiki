export type TierId =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic"
  | "super"
  | "pack";

export interface Tier {
  id: TierId;
  label: string;
  description: string;
  /** Tailwind dot/ring class applied to tier badges and accents. */
  dotClass: string;
  /** Subtle accent background used for tier section headers. */
  accentClass: string;
  /** Border accent for crop cards. */
  borderClass: string;
  /** Display order, lowest rarity first. */
  order: number;
}

export const TIERS: Tier[] = [
  {
    id: "common",
    label: "Common",
    description: "Starter crops. Quick cycles, modest payouts, the foundation of any garden.",
    dotClass: "bg-zinc-400",
    accentClass: "from-zinc-400/15 to-transparent",
    borderClass: "border-zinc-400/30",
    order: 1,
  },
  {
    id: "uncommon",
    label: "Uncommon",
    description: "A small step up — slightly longer grow times and noticeably better rewards.",
    dotClass: "bg-lime-500",
    accentClass: "from-lime-500/15 to-transparent",
    borderClass: "border-lime-500/30",
    order: 2,
  },
  {
    id: "rare",
    label: "Rare",
    description: "Mid-game staples. Worth planning your plots around for steady income.",
    dotClass: "bg-sky-500",
    accentClass: "from-sky-500/15 to-transparent",
    borderClass: "border-sky-500/30",
    order: 3,
  },
  {
    id: "epic",
    label: "Epic",
    description: "Largest tier by count. The bread and butter of late-game farming strategies.",
    dotClass: "bg-violet-500",
    accentClass: "from-violet-500/15 to-transparent",
    borderClass: "border-violet-500/30",
    order: 4,
  },
  {
    id: "legendary",
    label: "Legendary",
    description: "Longer waits, premium payouts. The chase that defines top-tier plots.",
    dotClass: "bg-amber-400",
    accentClass: "from-amber-400/15 to-transparent",
    borderClass: "border-amber-400/30",
    order: 5,
  },
  {
    id: "mythic",
    label: "Mythic",
    description: "Rare drops and event-bound harvests. Visually distinct, high-impact fruits.",
    dotClass: "bg-rose-500",
    accentClass: "from-rose-500/15 to-transparent",
    borderClass: "border-rose-500/30",
    order: 6,
  },
  {
    id: "super",
    label: "Super",
    description: "Endgame. Two crops only, reserved for the most dedicated green thumbs.",
    dotClass: "bg-gradient-to-r from-emerald-400 to-cyan-400",
    accentClass: "from-emerald-400/20 to-transparent",
    borderClass: "border-emerald-400/40",
    order: 7,
  },
  {
    id: "pack",
    label: "Pack Seed",
    description: "Exclusive drops from the Ghost Pepper Pack — roll to obtain.",
    dotClass: "bg-gradient-to-r from-fuchsia-400 to-pink-400",
    accentClass: "from-fuchsia-400/15 to-transparent",
    borderClass: "border-fuchsia-400/30",
    order: 8,
  },
];

export const TIER_MAP: Record<TierId, Tier> = TIERS.reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {} as Record<TierId, Tier>);
