/** NPCs that run the in-game shops and stands. */
export interface Npc {
  slug: string;
  name: string;
  role: string;
  location: string;
  emoji: string;
}

export const NPCS: Npc[] = [
  {
    slug: "sam",
    name: "Sam",
    role: "Seed Shop Owner",
    location: "Seed Shop",
    emoji: "🧑‍🌾",
  },
  {
    slug: "george",
    name: "George",
    role: "Gear Shop Owner",
    location: "Gear Shop",
    emoji: "🧑‍🔧",
  },
  {
    slug: "charlotte",
    name: "Charlotte",
    role: "Props Shop Owner",
    location: "Props Shop",
    emoji: "🧑‍🎨",
  },
  {
    slug: "steven",
    name: "Steven",
    role: "Sell Stand Owner",
    location: "Sell Stand",
    emoji: "🧑‍💼",
  },
  {
    slug: "gilbert",
    name: "Gilbert",
    role: "Guild Manager",
    location: "Guild Stand",
    emoji: "🧑‍⚖️",
  },
];
