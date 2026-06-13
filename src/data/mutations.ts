export type MutationKind = "variant" | "mutation";

export interface Mutation {
  slug: string;
  name: string;
  emoji: string;
  kind: MutationKind;
  multiplier: number | null;
  /** Source tag, e.g. weather, event, item. */
  source: string;
  /** Short blurb (own wording). */
  blurb: string;
}

export const MUTATIONS: Mutation[] = [
  {
    slug: "gold",
    name: "Gold",
    emoji: "🥇",
    kind: "variant",
    multiplier: 15,
    source: "Gold mutated plants, Gold Seed event, random chance",
    blurb: "Solid gold variant. Big single-mutation multiplier.",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    emoji: "🌈",
    kind: "variant",
    multiplier: 40,
    source: "Rainbow mutated plants, Rainbow event, Unicorn pet, random chance",
    blurb: "Full-spectrum variant. Top-tier single-mutation boost.",
  },
  {
    slug: "frozen",
    name: "Frozen",
    emoji: "❄️",
    kind: "mutation",
    multiplier: 5,
    source: "Snowfall/Blizzard weather (2m30s duration)",
    blurb: "Cryo-stasis mutation. Multiplies cleanly with variants.",
  },
  {
    slug: "electric",
    name: "Electric",
    emoji: "⚡",
    kind: "mutation",
    multiplier: 80,
    source: "Lightning weather (5 min duration)",
    blurb: "High-voltage mutation. The biggest single mutation multiplier.",
  },
  {
    slug: "starstruck",
    name: "Starstruck",
    emoji: "🌠",
    kind: "mutation",
    multiplier: null,
    source: "Starfall weather (2 min duration)",
    blurb: "Cosmic mutation from shooting stars. Multiplier TBD on the canonical wiki.",
  },
  {
    slug: "bloodlit",
    name: "Bloodlit",
    emoji: "🩸",
    kind: "mutation",
    multiplier: null,
    source: "TBA",
    blurb: "Mysterious mutation. Source and multiplier are TBD on the canonical wiki.",
  },
];

export const MUTATION_MAP: Record<string, Mutation> = MUTATIONS.reduce(
  (acc, m) => {
    acc[m.slug] = m;
    return acc;
  },
  {} as Record<string, Mutation>
);
