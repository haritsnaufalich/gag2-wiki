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
    emoji: "🥚",
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
    howToObtain: "TBA — not yet released",
    blurb:
      "The everyday egg. Wide pet spread — common walkers up to high-tier helpers can hatch.",
  },
  {
    slug: "epic-egg",
    name: "Epic Egg",
    emoji: "🥚",
    rarity: "epic",
    possiblePets: ["Deer", "Unicorn", "Bee", "Bee (Big)"],
    howToObtain: "TBA — not yet released",
    blurb:
      "Mid-tier egg. Skews toward stronger pets with a couple of Big variants in the pool.",
  },
  {
    slug: "common-pet-egg",
    name: "Common Pet Egg",
    emoji: "🥚",
    rarity: "common",
    possiblePets: [],
    howToObtain: "TBA — not yet released",
    blurb:
      "A separate common-tier egg. Pet list not yet published on the wiki.",
  },
];

export const EGG_MAP: Record<string, Egg> = EGGS.reduce((acc, e) => {
  acc[e.slug] = e;
  return acc;
}, {} as Record<string, Egg>);

export function getEggBySlug(slug: string): Egg | undefined {
  return EGG_MAP[slug];
}
