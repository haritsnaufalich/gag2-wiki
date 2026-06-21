export interface GameSystem {
  slug: string;
  title: string;
  emoji: string;
  category: "time" | "economy" | "social" | "growth" | "steal" | "weather" | "meta";
  short: string;
  detail: string;
}

export const SYSTEMS: GameSystem[] = [
  {
    slug: "day-length",
    title: "Day / Night Cycle",
    emoji: "Dy",
    category: "time",
    short: "7:30 day / 2:00 night",
    detail:
      "In-game days run for 7m 30s, followed by a 2-minute night. A 30-second warning fires before the cycle flips.",
  },
  {
    slug: "offline-growth",
    title: "Offline Growth",
    emoji: "Og",
    category: "growth",
    short: "Crops grow while you're away",
    detail:
      "Plants continue their grow cycle while the player is offline, so a returning gardener walks into a harvest.",
  },
  {
    slug: "fruit-decay",
    title: "Fruit Decay",
    emoji: "Fd",
    category: "growth",
    short: "Don't let ripe fruit sit",
    detail:
      "Mature fruit decays if left unharvested past a window. Collect promptly to lock in full value.",
  },
  {
    slug: "plot-expansion",
    title: "Plot Expansion",
    emoji: "Pe",
    category: "economy",
    short: "Buy more squares to scale up",
    detail:
      "Expand your garden in batches. Larger plots let multi-harvest crops compound across more cycles.",
  },
  {
    slug: "night-stealing",
    title: "Night Stealing",
    emoji: "Ns",
    category: "steal",
    short: "Steal at night, lose by day",
    detail:
      "During the night cycle, players can steal Sheckles from other gardens. Stealing price doubles on big payouts.",
  },
  {
    slug: "active-code",
    title: "Active Code",
    emoji: "Cd",
    category: "economy",
    short: "TEAMGREENBEAN -> 3 Green Bean seeds",
    detail:
      "Redeem in-game for free seeds. Codes expire, so check the wiki Updates page for new drops.",
  },
  {
    slug: "weather-rain",
    title: "Rain",
    emoji: "Rn",
    category: "weather",
    short: "5 min / 2x growth speed",
    detail:
      "Steady in-game rain lasts roughly 5 minutes and doubles the growth speed of every crop on the plot.",
  },
  {
    slug: "weather-lightning",
    title: "Lightning",
    emoji: "Lt",
    category: "weather",
    short: "5 min / Electric mutation",
    detail:
      "Crackling storm event lasting around 5 minutes. Struck crops can roll the Electric mutation, listed around 25x on the wiki.",
  },
  {
    slug: "weather-rainbow",
    title: "Rainbow",
    emoji: "Rw",
    category: "weather",
    short: "5 min / boosted Rainbow chance",
    detail:
      "Spectral weather that raises the chance of a Rainbow-mutated harvest for about 5 minutes.",
  },
  {
    slug: "weather-snowfall",
    title: "Snowfall / Blizzard",
    emoji: "Sn",
    category: "weather",
    short: "2:30 / Frozen mutation",
    detail:
      "Frost event that runs roughly 2 minutes 30 seconds. Mature fruit can roll the Frozen mutation.",
  },
  {
    slug: "weather-starfall",
    title: "Starfall",
    emoji: "Sf",
    category: "weather",
    short: "2 min / Starstruck mutation",
    detail:
      "Rare weather event with a 2-minute window where fruits can roll the Starstruck mutation.",
  },
  {
    slug: "weather-gold-seed",
    title: "Gold Seed (Midas)",
    emoji: "Gs",
    category: "weather",
    short: "2 min / Gold seeds drop",
    detail:
      "Midas-touch event that lasts about 2 minutes. Gold Seeds spawn across the map while it runs.",
  },
  {
    slug: "weather-rainbow-seed",
    title: "Rainbow Seed",
    emoji: "Rs",
    category: "weather",
    short: "2 min / Rainbow seeds drop",
    detail:
      "Rainbow Seeds rain down for about 2 minutes. Pair with Starfall for one of the rarest combos on the wiki.",
  },
  {
    slug: "guilds",
    title: "Guilds",
    emoji: "Gu",
    category: "social",
    short: "99 Robux to create",
    detail:
      "Founding a guild costs 99 Robux. Customize the name, tag, description, colors, and roles, then send invites from the Guilds counter or accept them through the in-game mailbox.",
  },
  {
    slug: "core-loop",
    title: "Core Loop",
    emoji: "Cl",
    category: "meta",
    short: "Grow / Expand / Steal / Defend / Sell",
    detail:
      "The endgame loop: grow crops, expand your plot, steal from neighbors, defend your own garden, then sell and reinvest.",
  },
  {
    slug: "studio",
    title: "Studio & Release",
    emoji: "St",
    category: "meta",
    short: "Splitting Point x Grow Games / June 12, 2026",
    detail:
      "Developed by Splitting Point Studios in partnership with Grow Games. Released June 12, 2026, with a Super rarity tier and cross-platform support on PC, console, and mobile.",
  },
];

export const SYSTEM_MAP: Record<string, GameSystem> = SYSTEMS.reduce(
  (acc, s) => {
    acc[s.slug] = s;
    return acc;
  },
  {} as Record<string, GameSystem>
);
