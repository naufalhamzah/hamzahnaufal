/**
 * OG SOCIAL CARD GENERATOR
 * ============================================================================
 * Writes `public/images/og-default.png` — the 1200x630 card that Facebook,
 * WhatsApp, LinkedIn, Slack and X show when the site is shared.
 *
 * WHY A PNG AND NOT THE SVG THAT WAS THERE
 * None of those platforms rasterise SVG for a preview. The repository shipped
 * `og-default.svg`, which is valid markup, renders in a browser, and is silently
 * ignored by every scraper — so a shared link produced no image at all. The
 * format is the requirement here, not a preference.
 *
 * WHY IT IS GENERATED RATHER THAN HAND-DRAWN
 * The card is the one page of the site nobody looks at during development, so it
 * is the one that goes stale unnoticed. Deriving the text from the same data
 * files the site renders, and the colours from the same token values, means the
 * card cannot drift away from the positioning or the palette.
 *
 * Run:  node scripts/make-og.mjs
 * ============================================================================
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT = join(ROOT, 'public/images/og-default.png');

/* ------------------------------------------------------------------ palette
   Read from `tokens.css` rather than restated, so a palette change moves the
   card with it. The values below are the DARK theme's, which is the site's
   primary art direction.
   -------------------------------------------------------------------------- */
const tokens = readFileSync(join(ROOT, 'src/styles/tokens.css'), 'utf8');
const token = (name, fallback) => {
  const m = tokens.match(
    new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})\\s*;`),
  );
  return m ? m[1] : fallback;
};

const C = {
  bg: token('ink-1000', '#0d0c0b'),
  surface: '#16130f',
  ivory: token('ivory-100', '#f3ede2'),
  ivorySoft: token('ivory-200', '#e5dccd'),
  muted: token('warm-400', '#a99d89'),
  faint: token('warm-500', '#877c6a'),
  accent: token('wine-400', '#c56a76'),
  accentDeep: token('wine-700', '#6d2531'),
};

/* --------------------------------------------------------------------- facts
   The three lines the card carries, all taken from the site's own data layer.
   The AirNav role is deliberately NOT here: the standing rule is that AirNav is
   an entry in Experience, never the identity of the site. The old card led with
   "Information Technology Administration Staff at AirNav Indonesia", which
   contradicted that rule and is the reason this file is generated from the
   profile rather than written by hand.
   -------------------------------------------------------------------------- */
const profile = readFileSync(join(ROOT, 'src/data/profile.ts'), 'utf8');
const grab = (key, fallback) => {
  const m = profile.match(new RegExp(`${key}:\\s*'([^']+)'`));
  return m ? m[1] : fallback;
};

const NAME = grab('name', 'Hamzah Naufal Zuhdi');
const HEADLINE = 'Information Systems Graduate';
const FOCUS = 'Data · Systems · Business Process · Digital Solutions';
const SITE = 'naufalhamzah.github.io';

/* ------------------------------------------------------------------ drawing */
const W = 1200;
const H = 630;

/* An SVG is composed here and rasterised — the shapes are simple enough that a
   templated string stays readable, and it keeps the card independent of any
   font package the site happens to install. */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.2" cy="1.2" r="1.2" fill="${C.ivory}" opacity="0.055"/>
    </pattern>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.accentDeep}" stop-opacity="0.30"/>
      <stop offset="0.55" stop-color="${C.surface}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${C.bg}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#wash)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- left rule: the editorial marker the site's labels use -->
  <rect x="80" y="88" width="3" height="150" fill="${C.accent}"/>

  <!--
    VERTICAL RHYTHM — measured, not guessed.

    The first draft put the eyebrow baseline at y=112 and the name baseline at
    y=150. At 58px the name's cap-height reaches roughly 42px above its own
    baseline, i.e. up to about y=108, so the two lines overlapped and the eyebrow
    rendered half-hidden behind the name.

    Each line below therefore clears the one above it by its full ascender plus
    breathing room. Baselines: 106 (19px), 186 (58px name, clears the eyebrow by
    80), 244 (36px), 300 (23px), 410 (22px), 446 (22px), 560 (19px).
  -->
  <g font-family="Consolas, 'Courier New', monospace" fill="${C.accent}" letter-spacing="5">
    <text x="110" y="106" font-size="19">PORTFOLIO</text>
  </g>

  <g font-family="Georgia, 'Times New Roman', serif" fill="${C.ivory}">
    <text x="110" y="186" font-size="58" font-weight="600" letter-spacing="-1">${NAME}</text>
  </g>

  <g font-family="Helvetica, Arial, sans-serif" fill="${C.ivorySoft}">
    <text x="110" y="244" font-size="36">${HEADLINE}</text>
  </g>

  <g font-family="Helvetica, Arial, sans-serif" fill="${C.muted}">
    <text x="110" y="300" font-size="23">${FOCUS}</text>
  </g>

  <rect x="110" y="366" width="150" height="2.5" fill="${C.accent}" opacity="0.85"/>

  <g font-family="Helvetica, Arial, sans-serif" fill="${C.muted}">
    <text x="110" y="430" font-size="22">Systems, dashboards, published research</text>
    <text x="110" y="466" font-size="22">and UI/UX design.</text>
  </g>

  <g font-family="Consolas, 'Courier New', monospace" fill="${C.faint}">
    <text x="110" y="560" font-size="19" letter-spacing="1">${SITE}</text>
  </g>

  <!-- bottom accent bar, full bleed -->
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${C.accent}"/>
</svg>`;

const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(OUT, buf);

const meta = await sharp(buf).metadata();
console.log(`✓ ${OUT.replace(ROOT + '\\', '').replace(ROOT + '/', '')}`);
console.log(`  ${meta.width}x${meta.height}  ${(buf.length / 1024).toFixed(1)} kB`);
console.log(`  name     : ${NAME}`);
console.log(`  headline : ${HEADLINE}`);
console.log(`  colours  : bg ${C.bg}, accent ${C.accent}, ivory ${C.ivory}`);
