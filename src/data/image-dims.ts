/**
 * IMAGE DIMENSIONS
 * ============================================================================
 * A thin accessor over the generated `asset-dims.generated.ts`, which
 * `scripts/build-assets.mjs` writes from the real output of the asset pipeline.
 *
 * WHY THIS INDIRECTION EXISTS
 * Card and gallery frames reserve their space with `aspect-ratio`, which needs
 * the true pixel size of each image. Hardcoding those numbers in the data files
 * would drift as soon as an image is re-exported at another width, so they are
 * read from the generated map instead. Components never touch the generated
 * file directly — they call these helpers, so the lookup strategy can change
 * without touching any UI.
 *
 * FALLBACK LADDER (never throws, never leaves a gap):
 *   1. the generated map (authoritative)
 *   2. a neutral 3:2 ratio
 * ============================================================================
 */

import { imageDims } from './asset-dims.generated';

/** Natural pixel size for a public image path, or `null` when unknown. */
export function getImageDims(src: string): [number, number] | null {
  return imageDims[src] ?? null;
}

/** Height ÷ width for a path, defaulting to a neutral 3:2. */
export function getImageRatio(src: string): number {
  const d = imageDims[src];
  return d ? d[1] / d[0] : 2 / 3;
}

export { imageDims };
