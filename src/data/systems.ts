export interface GameSystem {
  slug: string;
  title: string;
  emoji: string;
  category: "time" | "economy" | "social" | "growth" | "steal";
  short: string;
  detail: string;
}

export const SYSTEMS: GameSystem[] = [
  {
    slug: "day-length",
    title: "Day / Night Cycle",
    emoji: "🌗",
    category: "time",
    short: "7:30 day · 2:00 night",
    detail:
      "In-game days run for 7m 30s, followed by a 2-minute night. A 30-second warning fires before the cycle flips.",
  },
  {
    slug: "offline-growth",
    title: "Offline Growth",
    emoji: "⏳",
    category: "growth",
    short: "Crops grow while you're away",
    detail:
      "Plants continue their grow cycle while the player is offline, so a returning gardener walks into a harvest.",
  },
  {
    slug: "fruit-decay",
    title: "Fruit Decay",
    emoji: "🍂",
    category: "growth",
    short: "Don't let ripe fruit sit",
    detail:
      "Mature fruit decays if left unharvested past a window — collect promptly to lock in full value.",
  },
  {
    slug: "plot-expansion",
    title: "Plot Expansion",
    emoji: "🟩",
    category: "economy",
    short: "Buy more squares to scale up",
    detail:
      "Expand your garden in batches. Larger plots let multi-harvest crops compound across more cycles.",
  },
  {
    slug: "guild-rewards",
    title: "Guild & Event Rewards",
    emoji: "🛡️",
    category: "social",
    short: "Carrot Frenzy & friends",
    detail:
      "Limited-time events like Carrot Frenzy drop guild-wide rewards. Coordinate with the wiki update log for windows.",
  },
  {
    slug: "night-stealing",
    title: "Night Stealing",
    emoji: "🌙",
    category: "steal",
    short: "Steal at night, lose by day",
    detail:
      "During the night cycle, players can steal Sheckles from other gardens. Stealing price doubles on big payouts.",
  },
  {
    slug: "active-code",
    title: "Active Code",
    emoji: "🎟️",
    category: "economy",
    short: "TEAMGREENBEAN → 3 Green Bean seeds",
    detail:
      "Redeem in-game for free seeds. Codes expire — check the wiki Updates page for new drops.",
  },
];

export const SYSTEM_MAP: Record<string, GameSystem> = SYSTEMS.reduce(
  (acc, s) => {
    acc[s.slug] = s;
    return acc;
  },
  {} as Record<string, GameSystem>
);
