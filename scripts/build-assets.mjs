#!/usr/bin/env node
/**
 * ASSET PIPELINE
 * ============================================================================
 * Converts the raw images in ./konten into optimised WebP under public/images,
 * so the site ships measured assets instead of 259 MB of PNGs.
 *
 * Runs as an OVERWRITE-IN-PLACE pass: it writes to existing paths rather than
 * deleting folders first, which keeps it safe to run while a dev server holds
 * handles open. Idempotent — run it again after adding source images.
 *
 * ROUTING (who owns what) — this matters for honesty on the site:
 *   hero/          the one strongest personal photograph
 *   experience/    images UNAMBIGUOUSLY tied to a named employer
 *   about/         generic working / office shots
 *   projects/      project screenshots
 *   publications/  journal covers and article pages
 *   gallery/       personal & activity photos with NO specific context
 *   certificates/  certificate scans and award piagam
 *   logos/         employer marks
 *   issuers/       credential-issuer marks (cropped from certificates)
 *
 * The gallery/ bucket exists because the brief is explicit that an activity
 * photo must NOT be attributed to a particular employer unless the image itself
 * makes that clear. Anything ambiguous goes to gallery/ and appears only in the
 * Moments section, never inside an Experience entry.
 *
 * Source files are never modified or deleted.
 */

import sharp from 'sharp';
import { mkdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const SRC = join(ROOT, 'konten');
const REND = join(SRC, '_rendered');
const OUT = join(ROOT, 'public', 'images');

const Q = { photo: 80, shot: 84, doc: 86, cert: 86, logo: 92, gallery: 76 };

/** [source, outputPath, options] */
const RECIPES = [
  /* -------------------------------- HERO -------------------------------- */
  ['Foto Cover.png', 'hero/portrait.webp', { w: 1400, q: Q.photo }],

  /* -------------------------- AIRNAV (explicit) ------------------------- */
  ['Gambaran Pengalaman di Airnav.jpeg', 'experience/airnav-onboarding.webp', {
    w: 1800, q: Q.photo,
  }],
  ['Gambar Gedung AirNav.jfif', 'experience/airnav-building.webp', { w: 1200, q: Q.shot }],

  /* --------------------------- other employers -------------------------- */
  ['Momen Pengalaman di PLN.png', 'experience/pln-work.webp', { w: 1500, q: Q.photo }],
  ['Gambaran Halaman JAIST.png', 'experience/jaist-page.webp', { w: 1300, q: Q.shot }],
  ['Pengalaman PPK Ormawa dan Publikasi (1).png', 'experience/ppk-ormawa.webp', {
    w: 1500, q: Q.photo,
  }],

  /* --------------------------------- ABOUT ------------------------------ */
  // Source `PORTOFOLIO HAMZAH (7).png` was replaced in konten/, so About uses
  // the office photograph plus the AirNav onboarding shot (see experience/).
  ['Foto Kantor BeautyLab.png', 'about/office.webp', { w: 1200, q: Q.photo }],

  /* --------------------- PROJECT: marketing data system ----------------- */
  // marketing-sheet-2 is the spreadsheet itself; marketing-sheet-1 is the
  // Apps Script editor behind it. Both are used, in that order.
  ['Gambaran Project di BeautyLab (2).png', 'projects/marketing-sheet-1.webp', {
    w: 1700, q: Q.shot,
  }],
  ['Gambaran Project di BeautyLab (1).png', 'projects/marketing-script-1.webp', {
    w: 1500, q: Q.shot,
  }],

  /* --------- PROJECT: PLN dashboard — the NEWER assets replace old ------- */
  ['Gambaran Project Dashboard PLN  (1).png', 'projects/pln-dashboard-1.webp', {
    w: 1300, q: Q.shot,
  }],
  ['Gambaran Project Dashboard PLN  (2).png', 'projects/pln-dashboard-2.webp', {
    w: 1300, q: Q.shot,
  }],
  ['Gambaran Project Dashboard PLN  (3).png', 'projects/pln-dashboard-3.webp', {
    w: 1300, q: Q.shot,
  }],
  ['Gambaran Project Dashboard PLN  (4).png', 'projects/pln-dashboard-4.webp', {
    w: 1300, q: Q.shot,
  }],

  /* ------------------------ PROJECT: smart farming ---------------------- */
  // This file is the JOURNAL ARTICLE COVER (Ampoen Vol. 2 No. 2), not a field
  // photograph — the name is kept accurate so alt text and usage stay honest.
  ['Pengalaman PPK Ormawa dan Publikasi (2).png', 'projects/smart-farming-article.webp', {
    w: 1200, q: Q.doc,
  }],

  /* --------------------------- PROJECT: research ------------------------ */
  // Both files are IJIRSE covers/pages; named by what they actually show.
  ['Publikasi Artikel IJIRSE (2).png', 'projects/knn-paper.webp', { w: 1200, q: Q.doc }],
  ['Publikasi Artikel IJIRSE (1).png', 'projects/naive-bayes-paper.webp', { w: 1200, q: Q.doc }],

  /* ---------------------------- PROJECT: UI/UX -------------------------- */
  ['Gambaran Project Guzelav (1).png', 'projects/guzelev-1.webp', { w: 1000, q: Q.shot }],
  ['Gambaran Project Guzelav (2).png', 'projects/guzelev-2.webp', { w: 1000, q: Q.shot }],
  ['Gambaran Project WellMind (1).png', 'projects/wellmind-1.webp', { w: 1000, q: Q.shot }],
  ['Gambaran Project WellMind (2).png', 'projects/wellmind-2.webp', { w: 1000, q: Q.shot }],
  ['Gambaran Project WellMind (3).png', 'projects/wellmind-3.webp', { w: 1000, q: Q.shot }],
  ['Gambaran Project Kedai Nyam (1).png', 'projects/kedai-nyam-1.webp', { w: 1500, q: Q.shot }],
  ['Gambaran Project Kedai Nyam (2).png', 'projects/kedai-nyam-2.webp', { w: 1000, q: Q.shot }],
  ['Gambaran Project Kedai Nyam (3).png', 'projects/kedai-nyam-3.webp', { w: 1000, q: Q.shot }],
  ['Gambaran Project Kedai Nyam (4).png', 'projects/kedai-nyam-4.webp', { w: 1500, q: Q.shot }],

  /* ---------------------------- PUBLICATIONS ---------------------------- */
  ['Cover IJIRSE.png', 'publications/ijirse-cover.webp', { w: 1000, q: Q.doc }],
  ['COVER AMPOEN.png', 'publications/ampoen-cover.webp', { w: 1000, q: Q.doc }],
  ['Publikasi Artikel AMPOEN.png', 'publications/ampoen-article.webp', { w: 1200, q: Q.doc }],

  /* ---------------------- EMPLOYER LOGOS (from konten) ------------------ */
  ['Logo AirNav.jfif', 'logos/airnav.webp', { w: 600, q: Q.logo, logo: true }],
  ['Logo Beauty Lab.png', 'logos/beauty-lab.webp', { w: 900, q: Q.logo, logo: true }],
  ['Logo PLN Pusharlis.png', 'logos/pln-pusharlis.webp', { w: 900, q: Q.logo, logo: true }],
  ['Logo Jaist.png', 'logos/jaist.webp', { w: 800, q: Q.logo, logo: true }],
  ['Logo Guru Mengajar.png', 'logos/guru-mengajar.webp', { w: 800, q: Q.logo, logo: true }],
  ['Logo UNNES.png', 'logos/unnes.webp', { w: 600, q: Q.logo, logo: true }],
  ['Logo SMA.png', 'logos/sma.webp', { w: 600, q: Q.logo, logo: true }],
];

/* --------------- PERSONAL / ACTIVITY PHOTOS → gallery/ ---------------- */
const GALLERY = [
  ['Foto momen kepanitiaan.png', 'gallery/moment-01.webp'],
  ...Array.from({ length: 13 }, (_, i) => [
    `Foto momen kepanitiaan (${i + 1}).png`,
    `gallery/moment-${String(i + 2).padStart(2, '0')}.webp`,
  ]),
  ...Array.from({ length: 4 }, (_, i) => [
    `Foto momen organisasi (${i + 1}).png`,
    `gallery/moment-${String(i + 15).padStart(2, '0')}.webp`,
  ]),
];

/** Facts about each gallery photo, so alt text is honest rather than generic. */
export const GALLERY_NOTES = {};

for (const [file, out] of GALLERY) {
  RECIPES.push([file, out, { w: 1400, q: Q.gallery }]);
}

/* --------------------- CERTIFICATES → certificates/ ------------------- */
/** [sourceFile, outputStem] — PDFs are pre-rendered to konten/_rendered. */
const CERTS = [
  ['Sertifikat Google Looker Studio for Data Science & Data Analysis- MySkill.pdf', 'cert-looker-studio'],
  ['Sertifikat B2B Sales  - MySkill.pdf', 'cert-b2b-sales'],
  ['Sertifikat Basic Data - MySkill.pdf', 'cert-basic-data'],
  ['Sertifikat Belajar Dasar Data Science -Dicoding.pdf', 'cert-belajar-dasar-data-science'],
  ['Sertifikat Memulai Dasar Pemrograman untuk Menjadi Pengembang Software - Dicoding.pdf', 'cert-memulai-dasar-pemrograman'],
  ['Sertifikat Memulai Pemrograman dengan Java - Dicoding.pdf', 'cert-memulai-pemrograman-java'],
  ['Sertifikat Meniti Karier sebagai Software Developer - Dicoding.pdf', 'cert-meniti-karier'],
  ['Sertifikat Cybersecurity Essentials.pdf', 'cert-cybersecurity-essentials'],
  ['Sertifikat Java Fundamentals - Oracle.jfif', 'cert-java-fundamentals'],
  ['Sertifikat Organisasi Hima Ilkom 2023.pdf', 'cert-hima-2023'],
  ['Sertifikat Organisasi Hima Ilkom 2024.pdf', 'cert-hima-2024'],
  ['Sertifikat Organisasi UKMP.jfif', 'cert-ukmp'],
  ['Sertifikat Peserta PPK Ormawa.pdf', 'cert-ppk-ormawa'],
  ['Sertifikat Kepanitiaan CICS 2024.pdf', 'cert-cics-2024'],
  ['Sertifikat Kepanitian PKMMPD 2024.pdf', 'cert-pkmmtj-2024'],
  ['Sertifikat Penghargaan Silver Medal ONN 2020.pdf', 'cert-silver-medal-onn'],
  ['Sertifikat Penghargaan Finalis Lomba Esai PAB UKMP.png', 'cert-finalist-pab-ukmp'],
];

for (const [file, stem] of CERTS) {
  const rendered = join(REND, file.replace(/\.(pdf|jfif|png|jpe?g)$/i, '.png'));
  const original = join(SRC, 'Serifikat', file);
  const source = existsSync(rendered) ? rendered : original;
  RECIPES.push([source, `certificates/${stem}.webp`, { w: 1500, q: Q.cert, abs: true }]);
}

/* ================================== RUN ================================= */
if (!existsSync(SRC)) {
  console.error(`Source folder not found: ${SRC}`);
  process.exit(1);
}

let ok = 0, fail = 0, bytesIn = 0, bytesOut = 0;
const manifest = [];

async function convert(from, rel, opts) {
  const to = join(OUT, rel);
  mkdirSync(dirname(to), { recursive: true });

  if (!existsSync(from)) {
    console.log(`  SKIP (no source): ${rel}`);
    fail++;
    return;
  }

  const inBytes = statSync(from).size;
  bytesIn += inBytes;

  try {
    const meta = await sharp(from, { failOn: 'none' }).metadata();
    const targetW = Math.min(opts.w, meta.width ?? opts.w);

    let pipe = sharp(from, { failOn: 'none' })
      .rotate()
      .resize({ width: targetW, withoutEnlargement: true });

    if (opts.logo) {
      if (!meta.hasAlpha) pipe = pipe.flatten({ background: '#ffffff' });
      pipe = pipe.webp({ quality: opts.q, effort: 5, alphaQuality: 100 });
    } else {
      pipe = pipe.webp({ quality: opts.q, effort: 5 });
    }

    const info = await pipe.toFile(to);
    bytesOut += info.size;
    ok++;
    manifest.push({ out: `/images/${rel}`, w: info.width, h: info.height });
    console.log(
      `  ✓ ${rel.padEnd(48)} ${String(info.width) + 'x' + info.height}`,
    );
  } catch (e) {
    console.log(`  ✗ ${rel}: ${e.message}`);
    fail++;
  }
}

for (const [file, rel, opts] of RECIPES) {
  await convert(opts.abs ? file : join(SRC, file), rel, opts);
}

writeFileSync(
  join(HERE, 'asset-manifest.json'),
  JSON.stringify({ generated: new Date().toISOString(), assets: manifest }, null, 2),
);

/* --------------------------------------------------------------------------
   Also emit a TYPED module inside src/.

   The card and gallery frames reserve space with aspect-ratio, which needs the
   real pixel size of each image. Reading `scripts/asset-manifest.json` from
   `src/` would reach outside the source tree and break on a fresh checkout that
   has not run this script, so the numbers are mirrored into a generated TS file
   that lives alongside the rest of the data layer and is always importable.
   -------------------------------------------------------------------------- */
const generatedTs = `/**
 * GENERATED FILE — do not edit.
 * Written by scripts/build-assets.mjs; source of truth is scripts/asset-manifest.json.
 *
 * Real pixel dimensions for every image the pipeline produced. Used to reserve
 * layout space (aspect-ratio) so images cause no layout shift.
 */
export const imageDims: Record<string, [number, number]> = {
${manifest.map((a) => `  '${a.out}': [${a.w}, ${a.h}],`).join('\n')}
};
`;

writeFileSync(join(ROOT, 'src', 'data', 'asset-dims.generated.ts'), generatedTs);
console.log('also wrote  : src/data/asset-dims.generated.ts');

console.log('\n' + '='.repeat(70));
console.log(`converted : ${ok}`);
console.log(`failed    : ${fail}`);
console.log(`input     : ${(bytesIn / 1024 / 1024).toFixed(1)} MB`);
console.log(`output    : ${(bytesOut / 1024 / 1024).toFixed(2)} MB`);
if (bytesIn > 0) console.log(`reduction : ${(100 - (bytesOut / bytesIn) * 100).toFixed(1)}%`);
