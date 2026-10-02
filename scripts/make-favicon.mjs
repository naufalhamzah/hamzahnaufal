/**
 * FAVICON GENERATOR
 * ============================================================================
 * Writes `public/favicon.svg` from the shared monogram and the site's own palette.
 *
 * WHY IT IS GENERATED
 * The file it replaces was hand-drawn in a palette the site no longer uses —
 * `#0f172a` (navy) behind `#2dd4bf` (teal) — so the browser tab belonged to a
 * different design than the page it opened. A favicon is the one asset nobody
 * looks at while building, which is exactly why it drifted. Reading the colours
 * from `tokens.css` and the geometry from `src/data/monogram.ts` means it cannot
 * drift again: change a token and re-run this.
 *
 * WHY THE COLOURS ARE FIXED RATHER THAN THEMED
 * A favicon cannot follow `prefers-color-scheme` — browsers rasterise it once and
 * cache it. So it uses the DARK theme's fill, because dark is the site's primary
 * art direction and the tab strip is light in most browsers, which is the one
 * combination that reads on both: a light glyph on a deep wine tile.
 *
 * Run:  node scripts/make-favicon.mjs   (or `npm run favicon`)
 * ============================================================================
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { monogram, monogramSvg } from '../src/data/monogram.ts';

const ROOT = process.cwd();

/* Colours read from the token file, so a palette change moves the icon with it. */
const tokens = readFileSync(join(ROOT, 'src/styles/tokens.css'), 'utf8');
const token = (name, fallback) => {
  /* Follow one level of `var(--other)` indirection, which is how the theme
     tokens are written: `--solid-bg: var(--wine-700)`. */
  const m = tokens.match(new RegExp('--' + name + ':\\s*([^;]+);'));
  if (!m) return fallback;
  const raw = m[1].trim();
  const alias = raw.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (alias) return token(alias[1], fallback);
  return /^#[0-9a-f]{3,8}$/i.test(raw) ? raw : fallback;
};

const bg = token('wine-700', '#6d2531');
const fg = token('on-solid', '#fff6f2');
const accent = token('wine-300', '#dd929b');

const svg = monogramSvg({ bg, fg, accent, size: 32 });
writeFileSync(join(ROOT, 'public/favicon.svg'), svg);

console.log('✓ public/favicon.svg');
console.log('  bg ' + bg + '   fg ' + fg + '   accent ' + accent);
console.log('  tile ' + monogram.tile.size + 'px, radius ' + monogram.tile.rx);
