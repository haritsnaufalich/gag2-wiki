export type MutationKind = "variant" | "mutation";

export interface Mutation {
  slug: string;
  name: string;
  emoji: string;
  kind: MutationKind;
  multiplier: number;
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
    source: "Midas Event",
    blurb: "Solid gold variant. Big single-mutation multiplier.",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    emoji: "🌈",
    kind: "variant",
    multiplier: 40,
    source: "Random Chance",
    blurb: "Full-spectrum variant. Top-tier single-mutation boost.",
  },
  {
    slug: "frozen",
    name: "Frozen",
    emoji: "❄️",
    kind: "mutation",
    multiplier: 5,
    source: "Snowfall weather",
    blurb: "Cryo-stasis mutation. Multiplies cleanly with variants.",
  },
  {
    slug: "electric",
    name: "Electric",
    emoji: "⚡",
    kind: "mutation",
    multiplier: 80,
    source: "Lightning/Shocked weather",
    blurb: "High-voltage mutation. The biggest single mutation multiplier.",
  },
];

export const MUTATION_MAP: Record<string, Mutation> = MUTATIONS.reduce(
  (acc, m) => {
    acc[m.slug] = m;
    return acc;
  },
  {} as Record<string, Mutation>
);
