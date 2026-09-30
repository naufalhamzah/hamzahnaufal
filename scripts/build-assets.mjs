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
  /* -------------------------------- HERO --------------------------------
     CROPPED, deliberately — twice over.

     The source is a 2500x3750 full-length frame with a lot of empty black
     around a standing figure. Passing it through whole put a small person on a
     big dark field, and even a plain top-crop to 4:5 still left the face small
     because the subject only occupies roughly x 560-2030 and y 510-3450 of the
     original.

     So this is a HEAD-AND-SHOULDERS portrait crop: horizontally tight to the
     subject, vertically from just above the head to mid-chest, in a 4:5 frame.
     The face now carries the hero, and the cum-laude sash — which is what makes
     the photo personal rather than generic — stays in shot.

     No pixels are invented: it is a crop of the supplied photograph, and the
     untouched original is still produced as hero/portrait-full.webp.
     ---------------------------------------------------------------------- */
  ['Foto Cover.png', 'hero/portrait.webp', {
    w: 1400,
    q: Q.photo,
    /*
      Fractions of the ORIGINAL frame. The source is a CUT-OUT — the backdrop is
      transparent, not black — and its subject occupies x 554..2083 and
      y 384..3749 of 2500x3750.

      The previous crop (left 0.18 -> x 450..2050) stopped 33px SHORT of the
      subject's right edge, so the right shoulder and arm were sliced off. These
      fractions are measured from the subject's real extent instead of being
      estimated.

      The bottom edge is set BELOW the cum-laude sash's tassel, not across it:
      cutting at y 0.667 sliced the sash mid-way, which read as a clumsy crop
      rather than a composed portrait. Stopping at y 0.702 keeps the whole sash
      — the detail that makes the photo personal — inside the frame.

      `ratio` is width/height and the height is DERIVED from it, so the output
      aspect cannot drift.
    */
    crop: { left: 0.208, top: 0.1333, width: 0.64, ratio: 3 / 4 },
  }],
  // The uncropped original, so nothing is lost if the framing is ever revisited.
  ['Foto Cover.png', 'hero/portrait-full.webp', { w: 1200, q: Q.photo }],

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
  /*
    `Foto Kantor BeautyLab.png` is NOT used here any more.

    Two reasons, both of which are honesty problems rather than taste ones:

      1. It is a flattened slide composition. The deck's own navy and teal
         decorative strokes and a diagonally-cropped white field are baked into
         the pixels, so it is a slide, not a photograph.
      2. Nothing in the frame shows signage, a name or anything else that ties
         the building to Beauty Innovation Laboratories. The old alt text
         asserted that tie anyway, which is a guess dressed as a fact.

    In its place: the actual system, which the deck itself attributes to
    BeautyLab and which the experience data already describes. It supports the
    About copy instead of decorating it, and every claim in its alt text is
    visible in the picture.
  */
  ['Gambaran Project di BeautyLab (2).png', 'about/beautylab-system.webp', { w: 1400, q: Q.shot }],

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
  ['Logo AirNav.jfif', 'logos/airnav.webp', { w: 800, q: Q.logo, logo: true, knockOutWhite: true }],
  ['Logo Beauty Lab.png', 'logos/beauty-lab.webp', { w: 1200, q: Q.logo, logo: true }],
  ['Logo PLN Pusharlis.png', 'logos/pln-pusharlis.webp', { w: 1200, q: Q.logo, logo: true }],
  ['Logo Jaist.png', 'logos/jaist.webp', { w: 1400, q: Q.logo, logo: true }],
  ['Logo Guru Mengajar.png', 'logos/guru-mengajar.webp', { w: 1000, q: Q.logo, logo: true }],
  ['Logo UNNES.png', 'logos/unnes.webp', { w: 800, q: Q.logo, logo: true, knockOutWhite: true }],
  ['Logo SMA.png', 'logos/sma.webp', { w: 800, q: Q.logo, logo: true, knockOutWhite: true }],
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

    let pipe = sharp(from, { failOn: 'none' }).rotate();

    /*
      crop: { left, top, width, height } as FRACTIONS of the original frame.

      WHY FRACTIONS: a portrait cannot be re-framed by aspect ratio alone — a
      standing figure in a tall frame has the subject occupying only part of the
      width, so a full-width crop keeps a lot of empty background and the face
      stays small. The fractions here were measured from where the subject
      actually is, and expressing them relatively means re-exporting the source
      at another size still crops the same region.
    */
    if (opts.crop) {
      const w = meta.width ?? 0;
      const h = meta.height ?? 0;
      if (w && h) {
        const left = Math.round(w * opts.crop.left);
        const top = Math.round(h * opts.crop.top);
        const cw = Math.min(Math.round(w * opts.crop.width), w - left);
        // Height comes FROM the ratio, so the output aspect is exact.
        const ch = Math.min(Math.round(cw / opts.crop.ratio), h - top);
        pipe = pipe.extract({ left, top, width: cw, height: ch });
      }
    }

    /*
      knockOutWhite: remove a SOLID WHITE BACKGROUND from a logo.

      Three of the supplied marks (AirNav, SMA, UNNES) are flat PNGs on an opaque
      white plate; the other four are transparent cut-outs. Dropped onto a dark
      band, the white-plate ones read as bright rectangles with the logo floating
      inside them — and boxing each one in a chip to hide that only added a second
      visible rectangle around the first.

      So the white plate is removed properly, by FLOOD-FILLING FROM THE EDGES
      rather than by thresholding every white pixel. That distinction matters:
      these logos contain white INTERNAL detail (UNNES has 27% white pixels in its
      centre row), and a naive "make every white pixel transparent" pass punches
      holes straight through the artwork. A flood fill only clears white that is
      CONNECTED to the border, so enclosed whites survive.

      The alpha ramp at the boundary keeps the edges anti-aliased instead of
      leaving a jagged cut.
    */
    if (opts.knockOutWhite) {
      const { data, info } = await pipe
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const { width: iw, height: ih } = info;
      const N = iw * ih;
      // 0 = unvisited, 1 = queued/visited
      const seen = new Uint8Array(N);
      const stack = [];
      const isWhite = (i) => {
        const o = i * 4;
        return data[o] > 235 && data[o + 1] > 235 && data[o + 2] > 235;
      };
      // Seed the queue with every white pixel on the border.
      for (let x = 0; x < iw; x++) {
        for (const y of [0, ih - 1]) {
          const i = y * iw + x;
          if (!seen[i] && isWhite(i)) { seen[i] = 1; stack.push(i); }
        }
      }
      for (let y = 0; y < ih; y++) {
        for (const x of [0, iw - 1]) {
          const i = y * iw + x;
          if (!seen[i] && isWhite(i)) { seen[i] = 1; stack.push(i); }
        }
      }
      // Flood fill inward through connected white.
      while (stack.length) {
        const i = stack.pop();
        const x = i % iw;
        const y = (i - x) / iw;
        const neighbours = [
          x > 0 ? i - 1 : -1,
          x < iw - 1 ? i + 1 : -1,
          y > 0 ? i - iw : -1,
          y < ih - 1 ? i + iw : -1,
        ];
        for (const n of neighbours) {
          if (n >= 0 && !seen[n] && isWhite(n)) { seen[n] = 1; stack.push(n); }
        }
      }
      // Make the cleared region transparent, feathering one pixel at the rim.
      for (let i = 0; i < N; i++) {
        if (!seen[i]) continue;
        const x = i % iw;
        const y = (i - x) / iw;
        const touchesKept =
          (x > 0 && !seen[i - 1]) ||
          (x < iw - 1 && !seen[i + 1]) ||
          (y > 0 && !seen[i - iw]) ||
          (y < ih - 1 && !seen[i + iw]);
        data[i * 4 + 3] = touchesKept ? 90 : 0;
      }
      pipe = sharp(data, { raw: { width: iw, height: ih, channels: 4 } });
    }

    pipe = pipe.resize({ width: targetW, withoutEnlargement: true });

    if (opts.logo) {
      /*
        Flatten ONLY when the output is still genuinely opaque.

        `meta` describes the SOURCE file, so `!meta.hasAlpha` is true for every
        logo that arrived on a white plate — including the ones knockOutWhite has
        just made transparent. Flattening them here paints the white plate
        straight back on, silently undoing the previous step, which is exactly
        what happened: the flood fill ran, reported success, and the written file
        was still opaque white.

        A knockOutWhite logo is transparent BY CONSTRUCTION, so it is excluded.
        The check is on the transformation that ran, not on the source metadata.
      */
      if (!meta.hasAlpha && !opts.knockOutWhite) {
        pipe = pipe.flatten({ background: '#ffffff' });
      }
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
