import { projects } from "@/lib/dataV2";

/**
 * Slugs whose project entry is a research paper rather than a shipped system.
 * Derived from the slug set on purpose (the `papers[].projectId` fields are stale).
 */
export const paperSlugs = new Set<string>([
  "blocked-eeg-decoding-confound",
  "deterministic-data-fusion-fintech",
  "anarchist-llm-reasoning",
]);

/**
 * The systems actually rendered by the v2/v2.1 Systems catalog. This is the single
 * source of truth for the catalog, the palette and the 1..N keyboard shortcuts, so
 * they can never disagree about how many systems exist (audit 3.2 / 5.2).
 */
export const productionSystems = projects.filter((p) => !paperSlugs.has(p.slug));