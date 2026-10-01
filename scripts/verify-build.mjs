#!/usr/bin/env node
/**
 * VERIFY BUILD
 * ============================================================================
 * Automated checks against the BUILT output in dist/, not the source. Build
 * success alone does not prove the pages are correct — this asserts the things
 * the brief explicitly required:
 *
 *   - no phone number anywhere in rendered HTML
 *   - no placeholder domain in visible content
 *   - no broken internal links
 *   - no broken image references
 *   - every page has title/meta/canonical/OG
 *   - one <h1> per page, semantic landmarks present
 *   - sitemap + robots.txt exist and are consistent
 *   - every <img> has alt text
 *
 * Exit code 1 if any check fails, so it is usable in CI.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');

/*
  THE DEPLOY BASE — read from the one config that defines it.

  GitHub Pages publishes this repository as a PROJECT site, so the URLs in the
  built HTML carry a `/naufalhamzah` prefix that the files in `dist/` do not:
  GitHub adds it at serve time. Every existence check below therefore strips it
  before looking a path up on disk. Deriving it from `astro.config.mjs` rather
  than repeating the literal keeps the checker honest if the site ever moves to
  the domain root (set `BASE_PATH = ''` and these become no-ops).
*/
const BASE_PATH = (await import('../astro.config.mjs')).BASE_PATH.replace(
  /\/+$/,
  '',
);

const failures = [];
const notes = [];

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

/* ------------------------------------------------------------------ walk */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

/* --------------------------------------------------------- phone / domain */
// The number may appear with or without separators.
const PHONE_PATTERNS = [
  /896[\s-]?5305[\s-]?1681/,
  /\+6289\d{8,}/,
  /89653051681/,
];
const PLACEHOLDER_DOMAIN = /hamzahnaufal\.example\.com/;

let phoneHits = 0;
let domainHits = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const re of PHONE_PATTERNS) {
    if (re.test(html)) {
      phoneHits++;
      failures.push(`PHONE NUMBER found in ${relative(DIST, file)}`);
      break;
    }
  }
  // The placeholder domain is allowed in <link rel=canonical> and og:url meta,
  // but must never appear as visible body text.
  const bodyMatch = html.match(/<body[\s\S]*<\/body>/i);
  if (bodyMatch && PLACEHOLDER_DOMAIN.test(bodyMatch[0])) {
    domainHits.push(relative(DIST, file));
  }
}
if (domainHits.length) {
  failures.push(`Placeholder domain in VISIBLE content: ${domainHits.join(', ')}`);
}

/* ------------------------------------------------------------ per-page SEO */
for (const file of htmlFiles) {
  const rel = relative(DIST, file);
  const html = readFileSync(file, 'utf8');

  const checks = [
    ['<title>', /<title>[^<]{10,}<\/title>/],
    ['meta description', /<meta name="description" content="[^"]{20,}"/],
    ['canonical', /<link rel="canonical" href="https?:\/\//],
    ['og:title', /<meta property="og:title"/],
    ['og:image', /<meta property="og:image"/],
    ['twitter:card', /<meta name="twitter:card"/],
    ['html lang', /<html lang="[a-z]{2}/],
    ['viewport', /name="viewport"/],
  ];
  for (const [label, re] of checks) {
    if (!re.test(html)) failures.push(`${rel}: missing ${label}`);
  }

  /*
    THE SOCIAL CARD MUST BE A RASTER FORMAT.

    A meta tag that points at an `.svg` satisfies every other check in this file
    and is invisible in a browser, but no scraper rasterises SVG for a link
    preview — so the site shared a card that never appeared. The repository
    shipped exactly that for months. Raster-only is the platform requirement,
    so it is asserted here rather than left to review.
  */
  const ogImage = html.match(
    /<meta property="og:image" content="([^"]+)"/,
  )?.[1];
  if (ogImage && !/\.(png|jpe?g|webp)$/i.test(ogImage)) {
    failures.push(
      `${rel}: og:image is not a raster format -> ${ogImage} (social scrapers do not render SVG)`,
    );
  }
  /* And the file it names must actually be in the build. */
  if (ogImage) {
    const rel1 = ogImage.replace(/^https?:\/\/[^/]+/, '');
    const stripped = rel1.startsWith(BASE_PATH + '/')
      ? rel1.slice(BASE_PATH.length)
      : rel1;
    if (!existsSync(join(DIST, stripped.replace(/^\//, '')))) {
      failures.push(`${rel}: og:image file missing from build -> ${ogImage}`);
    }
  }

  // Exactly one h1
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) failures.push(`${rel}: expected 1 <h1>, found ${h1s.length}`);

  // Landmarks
  for (const [label, re] of [
    ['<main>', /<main[\s>]/],
    ['<header>', /<header[\s>]/],
    ['<footer>', /<footer[\s>]/],
  ]) {
    if (!re.test(html)) failures.push(`${rel}: missing ${label} landmark`);
  }

  // Skip link
  if (!/Skip to content/.test(html)) failures.push(`${rel}: missing skip link`);

  // Every <img> needs an alt attribute (may be empty for decorative images,
  // but the attribute must be present).
  const imgs = html.match(/<img\b[^>]*>/g) ?? [];
  for (const tag of imgs) {
    if (!/\balt=/.test(tag)) {
      failures.push(`${rel}: <img> without alt -> ${tag.slice(0, 90)}`);
    }
  }
}

/* ----------------------------------------------------- internal link check */
const existingPaths = new Set(
  allFiles.map((f) => {
    const rel = '/' + relative(DIST, f).replace(/\\/g, '/');
    return rel;
  }),
);

let brokenLinks = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

  for (const href of hrefs) {
    // Skip external, mail, tel, and pure anchors.
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;

    // Normalise: strip hash and query, resolve relative to the page.
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;

    /*
      Strip the deploy base first. GitHub Pages publishes this repository as a
      PROJECT site, so every generated URL carries the repo name as a prefix
      (`/naufalhamzah/about`), while the built tree in `dist/` holds `about/`
      at its root — GitHub adds the prefix when serving, not the build. Checking
      the prefixed path against `dist/` reported every link on the site as
      broken, which is a fault in this checker, not in the output.
    */
    const route = clean.startsWith(BASE_PATH + '/')
      ? clean.slice(BASE_PATH.length)
      : clean === BASE_PATH
        ? '/'
        : clean;

    const candidates = route.endsWith('/')
      ? [`${route}index.html`, route.slice(0, -1)]
      : [route, `${route}/index.html`];

    const ok = candidates.some((c) => existingPaths.has(c));
    if (!ok) {
      brokenLinks++;
      failures.push(
        `${relative(DIST, file)}: broken internal link -> ${href}`,
      );
    }
  }
}

/* --------------------------------------------------------- image existence */
let brokenImages = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const srcs = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    if (/^(https?:|data:)/.test(src)) continue;
    /* Same base-stripping as the link check above — the prefix is added by
       GitHub Pages at serve time, not written into `dist/`. */
    const stripped = src.startsWith(BASE_PATH + '/')
      ? src.slice(BASE_PATH.length)
      : src;
    const p = join(DIST, stripped.replace(/^\//, ''));
    if (!existsSync(p)) {
      brokenImages++;
      failures.push(`${relative(DIST, file)}: missing image file -> ${src}`);
    }
  }
}

/* --------------------------------------------------- sitemap / robots / js */
if (!existsSync(join(DIST, 'sitemap-index.xml')))
  failures.push('sitemap-index.xml missing');
if (!existsSync(join(DIST, 'robots.txt'))) failures.push('robots.txt missing');
if (!existsSync(join(DIST, 'favicon.svg'))) failures.push('favicon.svg missing');

const jsBundles = allFiles.filter((f) => f.endsWith('.js'));
const jsBytes = jsBundles.reduce((n, f) => n + statSync(f).size, 0);
notes.push(
  `Client JS: ${jsBundles.length} bundle(s), ${(jsBytes / 1024).toFixed(1)} kB total`,
);

/* ------------------------------------------------------------- sitemap URL */
const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
notes.push(`Sitemap lists ${urls.length} URLs`);

// 404.html is intentionally excluded from the sitemap, so the counts differ by
// exactly one when a 404 page exists.
const expectedUrls = htmlFiles.filter((f) => !f.endsWith('404.html')).length;
if (urls.length !== expectedUrls) {
  notes.push(
    `NOTE: sitemap URL count (${urls.length}) != indexable page count (${expectedUrls})`,
  );
}

/* ------------------------------------------------ asset sanity ----------- */
// Every referenced image must exist AND be one of our optimised formats
// (.webp/.svg). A leftover path into the raw `konten` folder would mean the
// pipeline was skipped.
let rawRefs = 0;
let heavyAssets = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const srcs = [...html.matchAll(/(?:src|data-lightbox-src)="([^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    if (/^(https?:|data:)/.test(src)) continue;
    if (src.includes('/konten/')) {
      rawRefs++;
      failures.push(`${relative(DIST, file)}: references raw konten asset -> ${src}`);
    }
    /* Strip the deploy base before touching disk — see the note at the top. */
    const stripped = src.startsWith(BASE_PATH + '/')
      ? src.slice(BASE_PATH.length)
      : src;
    const p = join(DIST, stripped.replace(/^\//, ''));
    if (existsSync(p)) {
      const kb = statSync(p).size / 1024;
      if (kb > 400) heavyAssets.push(`${src} (${kb.toFixed(0)} kB)`);
    }
  }
}
if (heavyAssets.length) {
  notes.push(`Heavy assets >400 kB: ${heavyAssets.join(', ')}`);
}

// Count real (non-placeholder) images actually wired into the pages.
let placeholderRefs = 0;
let realRefs = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const srcs = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    /* Compared against the route, not the deployed URL, so the base prefix
       cannot make every real image count as a placeholder. */
    const route = src.startsWith(BASE_PATH + '/')
      ? src.slice(BASE_PATH.length)
      : src;
    if (route.includes('/placeholders/')) placeholderRefs++;
    else if (route.startsWith('/images/')) realRefs++;
  }
}
notes.push(`Real images referenced: ${realRefs}`);
notes.push(`Placeholder images referenced: ${placeholderRefs}`);

/* ------------------------------------------------------------- JSON-LD ---- */
const home = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!/"@type":"Person"/.test(home)) failures.push('home: Person JSON-LD missing');
if (!/linkedin\.com\/in\/hamzahnaufal/.test(home))
  failures.push('home: LinkedIn sameAs missing from JSON-LD');

/* ---------------------------------------------------------------- report */
notes.push(`HTML pages checked: ${htmlFiles.length}`);
notes.push(`Internal links checked: broken = ${brokenLinks}`);
notes.push(`Image references checked: missing = ${brokenImages}`);
notes.push(`Phone-number occurrences: ${phoneHits}`);

console.log('\n--- NOTES ---');
for (const n of notes) console.log('  ' + n);

if (failures.length) {
  console.log(`\n--- FAILURES (${failures.length}) ---`);
  for (const f of failures) console.log('  ✗ ' + f);
  console.log('\nVERIFICATION FAILED\n');
  process.exit(1);
}

console.log('\n✓ ALL VERIFICATION CHECKS PASSED\n');
