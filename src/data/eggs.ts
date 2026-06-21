export type EggRarity = "common" | "epic";

export interface Egg {
  slug: string;
  name: string;
  emoji: string;
  rarity: EggRarity;
  /** Possible pets that can hatch from this egg. */
  possiblePets: string[];
  /** How the egg is currently obtained. */
  howToObtain: string;
  /** One-liner blurb (own wording). */
  blurb: string;
}

export const EGGS: Egg[] = [
  {
    slug: "common-egg",
    name: "Common Egg",
    emoji: "Eg",
    rarity: "common",
    possiblePets: [
      "Frog",
      "Bunny",
      "Deer",
      "Robin",
      "Bee",
      "Unicorn",
      "Golden Dragonfly",
      "Raccoon",
    ],
    howToObtain: "Guild weekly rewards",
    blurb:
      "Weekly guild reward egg with normal, Big, and Mega chances across obtainable pets.",
  },
  {
    slug: "epic-egg",
    name: "Epic Egg",
    emoji: "Ep",
    rarity: "epic",
    possiblePets: ["Deer", "Unicorn", "Bee", "Bee (Big)"],
    howToObtain: "Unknown",
    blurb: "Higher-rarity egg with Deer, Unicorn, Bee, and Bee (Big) listed on the wiki.",
  },
];

export const EGG_MAP: Record<string, Egg> = EGGS.reduce((acc, e) => {
  acc[e.slug] = e;
  return acc;
}, {} as Record<string, Egg>);

export function getEggBySlug(slug: string): Egg | undefined {
  return EGG_MAP[slug];
}
