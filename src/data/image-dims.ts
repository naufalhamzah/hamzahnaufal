/**
 * A thin accessor over the generated `asset-dims.generated.ts`, which
 * `scripts/build-assets.mjs` writes from the real output of the asset pipeline.
 *
 * WHY THIS INDIRECTION: card and gallery frames reserve space with `aspect-ratio`,
 * which needs the true pixel size of each image; hardcoding those numbers would
 * drift as soon as an image is re-exported at another width. Components call these
 * helpers rather than touching the generated file, so the lookup strategy can
 * change without touching UI.
 *
 * FALLBACK LADDER (never throws, never leaves a gap): the generated map, then a
 * neutral 3:2 ratio.
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
