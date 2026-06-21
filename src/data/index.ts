export * from "./tiers";
export * from "./crops";
export * from "./mutations";
export * from "./pets";
export * from "./systems";
export * from "./gears";
export * from "./eggs";
export * from "./seed-packs";

import { CROPS } from "./crops";
import { EGGS } from "./eggs";
import { GEARS } from "./gears";
import { MUTATIONS } from "./mutations";
import { PETS } from "./pets";
import { SEED_PACKS } from "./seed-packs";
import { SYSTEMS } from "./systems";
import { TIERS } from "./tiers";

export const WIKI_STATS = {
  totalCrops: CROPS.length,
  totalTiers: TIERS.length,
  totalMutations: MUTATIONS.length,
  totalPets: PETS.length,
  totalGears: GEARS.length,
  totalEggs: EGGS.length,
  totalSeedPacks: SEED_PACKS.length,
  totalSystems: SYSTEMS.length,
  activeCode: "TEAMGREENBEAN",
  lastUpdated: "2026-06-21",
  version: "1.7.0",
};
