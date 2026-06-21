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
    emoji: "Au",
    kind: "variant",
    multiplier: 10,
    source: "Random chance, Gold Seed, Gold Moon night event",
    blurb: "Solid gold variant from random harvests or Gold Moon rewards.",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    emoji: "Rb",
    kind: "variant",
    multiplier: 30,
    source: "Random chance, Rainbow Seed, Rainbow weather",
    blurb: "Full-spectrum variant with boosted odds during rainbow events.",
  },
  {
    slug: "frozen",
    name: "Frozen",
    emoji: "Fr",
    kind: "mutation",
    multiplier: 14,
    source: "Snowfall weather",
    blurb: "Cold-weather mutation that can roll during Snowfall.",
  },
  {
    slug: "electric",
    name: "Electric",
    emoji: "El",
    kind: "mutation",
    multiplier: 25,
    source: "Lightning Storm weather",
    blurb: "Storm mutation granted when lightning strikes active crops.",
  },
  {
    slug: "starstruck",
    name: "Starstruck",
    emoji: "St",
    kind: "mutation",
    multiplier: 50,
    source: "Starfall weather",
    blurb: "Cosmic mutation that can roll while meteors fall during Starfall.",
  },
  {
    slug: "bloodlit",
    name: "Bloodlit",
    emoji: "Bl",
    kind: "mutation",
    multiplier: 60,
    source: "Blood Moon night event",
    blurb: "Night-event mutation tied to Blood Moon crops.",
  },
];

export const MUTATION_MAP: Record<string, Mutation> = MUTATIONS.reduce(
  (acc, m) => {
    acc[m.slug] = m;
    return acc;
  },
  {} as Record<string, Mutation>
);
