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
     SOURCE: `Foto Cover 1.png` (3125x4688), replacing `Foto Cover.png`.

     Both are cut-outs of the same person on a removed backdrop. The newer frame
     is the taller shot: the subject spans y 963..4687 rather than y 388..3749,
     so at the same 3:4 crop the figure sits LARGER in the frame and the face
     reads at a size the hero can actually use. It also has cleaner margins on
     both sides (547 left / 533 right, against 559 / 421).

     CROPPED, deliberately. The source has a lot of empty backdrop around a
     standing figure, so passing it through whole puts a small person on a big
     dark field.

     No pixels are invented: this is a crop of the supplied photograph, and the
     untouched original is still produced as hero/portrait-full.webp.
     ---------------------------------------------------------------------- */
  ['Foto Cover 1.png', 'hero/portrait.webp', {
    w: 1400,
    q: Q.photo,
    /*
      Fractions of the ORIGINAL frame, measured from the subject's real extent
      via the alpha channel — x 547..2591, y 963..4687 (alpha > 200, so
      anti-aliasing noise is excluded). Not estimated: two earlier passes that
      guessed coordinates sliced a shoulder off and then cut the top of the head
      flat, and both looked plausible in a thumbnail.

      · TOP leaves 226px of headroom above the crown (y 0.1572). An earlier value
        of 0.1926 left only 61px, which is 2% of the frame — rendered at 521px
        wide that is 14px, and the top of the hair sat hard against the crop with
        no air above it. At hero size it read as a clipped head, which is how the
        user reported it. 7.5% gives the figure room to breathe, and the crop
        still ends above the sash's medal so nothing is lost at the bottom.
      · WIDTH 0.7242 is the NARROWEST that still contains the whole figure. The
        subject spans 2045px of 3125 (0.6544), so a tighter crop slices the arms
        off at the frame edge — which is what a 0.55 attempt did, cutting 296px.
        This leaves 109px of backdrop on each side, so the arms read as inside
        the picture rather than running into it.
      · The bottom edge falls below the sash's medal, so the whole sash — the
        detail that makes the photograph personal — stays in shot.

      `ratio` is width/height and the height is DERIVED from it, so the output
      aspect cannot drift.
    */
    crop: { left: 0.1402, top: 0.1572, width: 0.7242, ratio: 3 / 4 },
    /*
      The matting residue is what drew a faint rectangle around the figure. See
      the `stripFaintAlpha` note in convert() — this is the one image on the site
      that needs it, because it is the one cut-out used at large size.
    */
    stripFaintAlpha: { floor: 40, ceil: 120 }
  }],
  // The uncropped original, so nothing is lost if the framing is ever revisited.
  /*
    The uncropped original, so nothing is lost if the framing is revisited.
    Same source as the hero crop above — keeping these two in step matters,
    because a "full" version of a DIFFERENT photograph would quietly mislead
    anyone reviewing the framing later.
  */
  ['Foto Cover 1.png', 'hero/portrait-full.webp', { w: 1400, q: Q.photo }],

  /* -------------------------- AIRNAV (explicit) ------------------------- */
  ['Gambaran Pengalaman di Airnav.jpeg', 'experience/airnav-onboarding.webp', {
    w: 1800, q: Q.photo
  }],
  ['Gambar Gedung AirNav.jfif', 'experience/airnav-building.webp', { w: 1200, q: Q.shot }],

  /* --------------------------- other employers -------------------------- */
  ['Momen Pengalaman di PLN.png', 'experience/pln-work.webp', { w: 1500, q: Q.photo }],
  ['Gambaran Halaman JAIST.png', 'experience/jaist-page.webp', { w: 1300, q: Q.shot }],
  ['Pengalaman PPK Ormawa dan Publikasi (1).png', 'experience/ppk-ormawa.webp', {
    w: 1500, q: Q.photo
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
    trimWhiteMargin: {}
  }],
  ['Gambaran Project di BeautyLab (1).png', 'projects/marketing-script-1.webp', {
    w: 1500, q: Q.shot,
    trimWhiteMargin: {}
  }],

  /* --------- PROJECT: PLN dashboard — the NEWER assets replace old ------- */
  ['Gambaran Project Dashboard PLN  (1).png', 'projects/pln-dashboard-1.webp', {
    w: 1300, q: Q.shot,
    // Looker Studio exports these with the corners of a rounded card still in the
    // file. See the clipRoundedCorners note in convert().
    clipRoundedCorners: {},
  }],
  ['Gambaran Project Dashboard PLN  (2).png', 'projects/pln-dashboard-2.webp', {
    w: 1300, q: Q.shot,
    // Looker Studio exports these with the corners of a rounded card still in the
    // file. See the clipRoundedCorners note in convert().
    clipRoundedCorners: {},
  }],
  ['Gambaran Project Dashboard PLN  (3).png', 'projects/pln-dashboard-3.webp', {
    w: 1300, q: Q.shot,
    // Looker Studio exports these with the corners of a rounded card still in the
    // file. See the clipRoundedCorners note in convert().
    clipRoundedCorners: {},
  }],
  ['Gambaran Project Dashboard PLN  (4).png', 'projects/pln-dashboard-4.webp', {
    w: 1300, q: Q.shot,
    // Looker Studio exports these with the corners of a rounded card still in the
    // file. See the clipRoundedCorners note in convert().
    clipRoundedCorners: {},
  }],

  /* ------------------------ PROJECT: smart farming ---------------------- */
  // This file is the JOURNAL ARTICLE COVER (Ampoen Vol. 2 No. 2), not a field
  // photograph — the name is kept accurate so alt text and usage stay honest.
  ['Pengalaman PPK Ormawa dan Publikasi (2).png', 'projects/smart-farming-article.webp', {
    w: 1200, q: Q.doc,
      trimWhiteMargin: {}
  }],

  /* --------------------------- PROJECT: research ------------------------ */
  // Both files are IJIRSE covers/pages; named by what they actually show.

  /* ---------------------------- PROJECT: UI/UX -------------------------- */
  ['Gambaran Project Guzelav (1).png', 'projects/guzelev-1.webp', { w: 1000, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project Guzelav (2).png', 'projects/guzelev-2.webp', { w: 1000, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project WellMind (1).png', 'projects/wellmind-1.webp', { w: 1000, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project WellMind (2).png', 'projects/wellmind-2.webp', { w: 1000, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project WellMind (3).png', 'projects/wellmind-3.webp', { w: 1000, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project Kedai Nyam (1).png', 'projects/kedai-nyam-1.webp', { w: 1500, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project Kedai Nyam (2).png', 'projects/kedai-nyam-2.webp', { w: 1000, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project Kedai Nyam (3).png', 'projects/kedai-nyam-3.webp', { w: 1000, q: Q.shot , trimWhiteMargin: {} }],
  ['Gambaran Project Kedai Nyam (4).png', 'projects/kedai-nyam-4.webp', { w: 1500, q: Q.shot , trimWhiteMargin: {} }],

  /* ---------------------------- PUBLICATIONS ----------------------------
     The user supplied a fresh set (Oct 2026): two journal covers and three
     article first pages, in higher resolution than the previous batch.

     PAIRING MATTERS HERE. A cover and an article page are different evidence —
     the cover identifies the ISSUE, the first page identifies the PAPER — and
     swapping them would misattribute one article's opening to another's journal.
     Each output name therefore states both the journal and the role:

       ijirse-cover          IJIRSE Vol. 4 No. 1 cover      (KNN paper's issue)
       ijirse-cover-v5       IJIRSE Vol. 5 No. 1 cover      (Naive Bayes issue)
       ijirse-article-knn    KNN paper, first page
       ijirse-article-nb     Naive Bayes paper, first page
       ampoen-cover          AMPOEN Vol. 2 No. 2 cover
       ampoen-article        Smart Farming paper, first page

     Two distinct IJIRSE covers exist because the papers were published in
     different volumes — the previous single `ijirse-cover` was shown against
     both papers, which was wrong for whichever one it did not belong to.
     -------------------------------------------------------------------- */
  /*
    VERIFIED PAIRING — read off each page's own printed header, not assumed from
    the filename numbers. `Artikel Ijirse 1.png` and `... 2.png` are NOT in the
    order the paper titles suggest:

      'Artikel Ijirse 1.png'  header reads "Vol. 5 No.1. Maret 2025, pp: 12-19"
                              -> Naive Bayes / iPusnas paper
      'Artikel Ijirse 2.png'  header reads "Vol. 4 No.1. Maret 2024, pp: 40-46"
                              -> KNN / Bank ABC paper
      'Cover IJIRSE.png'      cover reads "Vol 4. Iss 1. Maret 2024"
                              -> the KNN paper's issue

    The first attempt mapped them in filename order and therefore attached each
    paper's opening page to the OTHER paper. Reading the header is the only
    reliable check — the filenames number the upload, not the article.
  */
  ['Cover IJIRSE.png', 'publications/ijirse-cover.webp', { w: 1200, q: Q.doc,
      trimWhiteMargin: {} }],
  ['Artikel Ijirse 2.png', 'publications/ijirse-article-knn.webp', { w: 1400, q: Q.doc,
      trimWhiteMargin: {} }],
  ['Artikel Ijirse 1.png', 'publications/ijirse-article-nb.webp', { w: 1400, q: Q.doc,
      trimWhiteMargin: {} }],
  ['COVER AMPOEN.png', 'publications/ampoen-cover.webp', { w: 1200, q: Q.doc,
      trimWhiteMargin: {} }],
  ['Artikel Ampoen.png', 'publications/ampoen-article.webp', { w: 1400, q: Q.doc,
      trimWhiteMargin: {} }],

  /* ---------------------- EMPLOYER LOGOS (from konten) ------------------ */
  /*
    AirNav — ROUNDEL ONLY, the second line of type dropped.

    The supplied mark stacks a roundel and, below it, "AirNav Indonesia" in a dark
    grey set for a white page. Measured: 51% of that second line's pixels are
    darker than L<110, which is invisible against the dark theme's band (L≈22) —
    and it also sits OUTSIDE the roundel, so it renders at a smaller size than the
    rest of the mark and turns to mush at footer scale even where it is visible.

    Nothing is lost by cropping to the roundel: "AirNav" is already lettered
    inside it, and the alt text still names the organisation in full. What the
    crop removes is a line that read as a smudge in one theme and a weak grey in
    the other.

    `crop` runs BEFORE `trim`, so the fractions describe the full source. The
    roundel ends at 0.8164 of the height (measured from the alpha row profile:
    content y 12..367, then a 9px gap, then the type).
  */
  [
    'Logo AirNav.jfif',
    'logos/airnav.webp',
    {
      w: 800,
      q: Q.logo,
      logo: true,
      knockOutWhite: true,
      crop: { left: 0, top: 0, width: 1, ratio: 1 / 0.8164 },
      trim: true
    },
  ],
  ['Logo Beauty Lab.png', 'logos/beauty-lab.webp', { w: 1200, q: Q.logo, logo: true, trim: true }],
  ['Logo PLN Pusharlis.png', 'logos/pln-pusharlis.webp', { w: 1200, q: Q.logo, logo: true, trim: true }],
  ['Logo Jaist.png', 'logos/jaist.webp', { w: 1400, q: Q.logo, logo: true, trim: true }],
  ['Logo Guru Mengajar.png', 'logos/guru-mengajar.webp', { w: 1000, q: Q.logo, logo: true, trim: true }],
  /*
    UNNES — CREST ONLY, the wordmark dropped.

    Same failure as AirNav's second line, measured the same way: the "UNNES" and
    "UNIVERSITAS NEGERI SEMARANG" lettering is set in dark blue, and 91% of its
    pixels fall below L<90 — invisible against the dark theme's band (L≈22). It is
    also what made the file so tall (800x1069), which is why a square plate
    squeezed it.

    The crest ends at y 1785 of 2477 (72.1%), then a 60px gap, then the type. The
    crop keeps everything above that gap, so the emblem — flame, wings, the whole
    device — is untouched. `trim` then removes the empty margin.

    Verified after cropping: crest 1541x1566, ratio 0.984, and no edge of it is
    clipped.
  */
  [
    'Logo UNNES.png',
    'logos/unnes.webp',
    {
      w: 800,
      q: Q.logo,
      logo: true,
      knockOutWhite: true,
      crop: { left: 0, top: 0, width: 1, ratio: 1 / 0.7211 },
      trim: true
    },
  ],
  ['Logo SMA.png', 'logos/sma.webp', { w: 800, q: Q.logo, logo: true, knockOutWhite: true, trim: true }],
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
    let targetW = Math.min(opts.w, meta.width ?? opts.w);

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
      trim: crop away TRANSPARENT PADDING around a logo's content.

      Supplied marks carry wildly different amounts of empty canvas: measured on
      this set, the content occupies between 77.2% and 100% of the file's height,
      so a logo rendered at the same box height as its neighbours can be more
      than a fifth smaller in practice. `height: 34px` on a file whose artwork
      ends at 77% of the canvas draws 26px of actual mark.

      Cropping to the alpha bounding box makes the CSS height mean what it says:
      every logo then renders its CONTENT at the declared size, and the optical
      sizing in the layout works from real proportions instead of from whatever
      margin the exporter happened to leave.

      The bbox is taken from the alpha channel at a strict threshold (>16) so
      anti-aliasing noise in the empty field cannot inflate it, with a margin of
      a couple of pixels kept so the mark does not touch its own frame edge.
      Opaque marks (a flat white plate) fall back to a colour-difference bbox
      against the corner pixel, which is what "content" means for those.
    */
    if (opts.trim) {
      const { data, info } = await pipe
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const { width: iw, height: ih } = info;

      // Is the file actually transparent, or is it a flat plate?
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] < 250) transparent++;
      const hasAlpha = transparent > iw * ih * 0.01;

      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      let minX = iw,
        minY = ih,
        maxX = -1,
        maxY = -1;
      for (let y = 0; y < ih; y++) {
        for (let x = 0; x < iw; x++) {
          const o = (y * iw + x) * 4;
          const isContent = hasAlpha
            ? data[o + 3] > 16
            : Math.abs(data[o] - bgR) > 28 ||
              Math.abs(data[o + 1] - bgG) > 28 ||
              Math.abs(data[o + 2] - bgB) > 28;
          if (!isContent) continue;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }

      if (maxX >= minX && maxY >= minY) {
        // Never trim to nothing, and never grow beyond the frame.
        const pad = 2;
        const left = Math.max(0, minX - pad);
        const top = Math.max(0, minY - pad);
        const width = Math.min(iw - left, maxX - minX + 1 + pad * 2);
        const height = Math.min(ih - top, maxY - minY + 1 + pad * 2);

        /*
          START A FRESH PIPELINE from the raw buffer, then crop.

          This is not stylistic. `pipe.ensureAlpha().raw().toBuffer()` MUTATES
          `pipe` — sharp's methods return the same instance — so by the time the
          probe has been read, the queue holds `ensureAlpha` and `raw`.
          Continuing with `pipe.extract(...)` then appends the crop AFTER a
          raw-format conversion, and the later `resize` is applied to a pipeline
          whose intermediate state is no longer a normal image. The symptoms were
          exactly what that implies: every mark that took this path logged
          `undefinedxundefined` and wrote a file whose dimensions could not be
          read back.

          `knockOutWhite` below already avoids this by replacing `pipe` with a
          fresh instance built from the raw buffer; the trim does the same. Any
          pass that PEEKS at intermediate pixels must reset the pipeline rather
          than keep appending to it.
        */
        pipe = sharp(data, { raw: info }).extract({ left, top, width, height });

        /*
          Recompute the resize target from the TRIMMED width.

          `targetW` was derived from `meta` BEFORE this trim. Left alone, the
          later `resize({ width: targetW })` aims at the untrimmed width while the
          pipeline now holds a smaller image. Never upscale: the target can only
          shrink to the trimmed width.
        */
        meta.width = width;
        meta.height = height;
        targetW = Math.min(targetW, width);
      }
    }

    /*
      trimWhiteMargin: crop the EMPTY WHITE BORDER off a screenshot.

      Measured on this set: fourteen project images carry a white margin around
      the actual interface. On the UI/UX captures it is 55% of the edge pixels;
      on the document scans it is 100%. Dropped into a dark frame that margin
      becomes a bright plate around the product, which is exactly the "screenshot
      pasted on a white box" look the user objected to.

      THIS IS A CROP, NOT A KNOCKOUT, and that distinction is the whole reason it
      is safe. Removing white pixels by colour would punch holes through every
      white surface INSIDE the interface — dashboard panels, table cells, form
      fields — and the screenshot would stop being a screenshot. Cropping only
      discards a border that is uniformly white all the way round, and it stops
      the moment the edge stops being white, so interior white is never touched.

      The test is deliberately strict (>=246 on all three channels) and requires
      whole rows and columns to qualify, so a light-grey interface edge or a
      single pale pixel cannot trigger a cut. A guard refuses the crop entirely if
      it would eat more than `max` of either dimension, which is what protects an
      image that is genuinely white-backed rather than bordered.
    */
    if (opts.trimWhiteMargin) {
      const { data, info } = await pipe
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const { width: iw, height: ih } = info;

      const isWhiteRow = (y) => {
        for (let x = 0; x < iw; x++) {
          const o = (y * iw + x) * 4;
          if (data[o] < 246 || data[o + 1] < 246 || data[o + 2] < 246) return false;
        }
        return true;
      };
      const isWhiteCol = (x) => {
        for (let y = 0; y < ih; y++) {
          const o = (y * iw + x) * 4;
          if (data[o] < 246 || data[o + 1] < 246 || data[o + 2] < 246) return false;
        }
        return true;
      };

      let top = 0;
      while (top < ih && isWhiteRow(top)) top++;
      let bottom = ih - 1;
      while (bottom > top && isWhiteRow(bottom)) bottom--;
      let left = 0;
      while (left < iw && isWhiteCol(left)) left++;
      let right = iw - 1;
      while (right > left && isWhiteCol(right)) right--;

      const nw = right - left + 1;
      const nh = bottom - top + 1;
      const maxX = opts.trimWhiteMargin.max ?? 0.18;
      const maxY = opts.trimWhiteMargin.max ?? 0.18;

      /*
        Refuse a crop that would discard too much on EITHER axis — that is not a
        margin, that is the picture. The two axes are checked independently, not
        together: a document scan often has a white band top and bottom while its
        sides run to the edge, and requiring BOTH axes to qualify would skip
        exactly the case this exists for.

        Measured on the real set: the UI/UX captures have NO qualifying margin at
        all — their white is inside the interface — so this step correctly leaves
        them alone. The journal pages carry 26–29px top/bottom and 14–17px sides,
        which is 2% of a 1379px page and passes comfortably.
      */
      if (nw > 0 && nh > 0 && nw >= iw * (1 - maxX) && nh >= ih * (1 - maxY)) {
        pipe = sharp(data, { raw: info }).extract({
          left,
          top,
          width: nw,
          height: nh
        });
        meta.width = nw;
        meta.height = nh;
        targetW = Math.min(targetW, nw);
      }
    }

    /*
      clipRoundedCorners: remove the WHITE NOTCHES at the corners of a rounded
      capture.

      The four dashboard screenshots came out of Google Looker Studio with a
      rounded card behind them, and the exported PNG kept the corners: each one
      holds a small white triangle left over from outside the rounded edge.
      Measured on the shipped file: 2259 white pixels, 0.72% of the frame, 88% of
      them within 20px of an edge, and the corner triangles run 3–4px along the
      diagonal.

      `trimWhiteMargin` above cannot catch this, and the reason is the
      distinction between the two defects. That step looks for whole rows and
      columns that are uniformly white — a MARGIN. A rounded corner is not a
      margin: it is a notch, so no complete row or column qualifies and the trim
      correctly leaves the image alone. The white is real, small, and invisible on
      a light page, which is why it survived until the user spotted it against the
      dark theme.

      THE FIX IS A MASK, NOT A COLOUR KNOCKOUT.

      Removing white pixels by colour would be catastrophic here: the dashboard
      legitimately contains 278 white pixels in its interior — text, table rules,
      chart labels — and a colour filter would punch holes straight through them.
      A knockout of "white connected to the border" is not safe either, because
      dashboard panels touch the edge and would bleed inward.

      Instead the corner is CLIPPED with the same radius the source used. The mask
      only ever touches the four corner boxes, and inside those boxes it removes
      exactly what lies outside a quarter-circle — geometry, not colour. Interior
      white is untouched by construction.

      Alpha, not paint: the corner becomes transparent, so the frame's own matte
      shows through and the radius blends with whatever theme is active.
    */
    if (opts.clipRoundedCorners) {
      const radius = opts.clipRoundedCorners.radius ?? 0.008;
      let { data, info } = await pipe
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      let { width: iw, height: ih } = info;

      /*
        FIRST, SHAVE THE EDGE BANDS.

        These captures carry a white hairline along the bottom and the right that
        has nothing to do with the rounded corners: measured on the shipped file,
        the last two rows are 99.6% and 99.9% white, and the last column is 99.3%.
        Top and left are clean (under 1%), so only those two sides are trimmed.

        A 90% threshold across the whole row/column is what makes this safe: the
        interior white — dashboard text, table rules, chart labels — never fills an
        entire row, so it can never trigger a shave. The 2-3px of the capture that
        actually holds content stays.
      */
      const isBand = (get, len, idx) => {
        let white = 0;
        for (let i = 0; i < len; i++) {
          const o = get(i, idx);
          if (data[o] >= 235 && data[o + 1] >= 235 && data[o + 2] >= 235) white++;
        }
        return white / len > 0.9;
      };

      let shaveBottom = 0;
      while (
        shaveBottom < 8 &&
        isBand((i, y) => (y * iw + i) * 4, iw, ih - 1 - shaveBottom)
      )
        shaveBottom++;
      let shaveRight = 0;
      while (
        shaveRight < 8 &&
        isBand((y, x) => (y * iw + x) * 4, ih, iw - 1 - shaveRight)
      )
        shaveRight++;

      if (shaveBottom || shaveRight) {
        const nw = iw - shaveRight;
        const nh = ih - shaveBottom;
        pipe = sharp(data, { raw: info }).extract({
          left: 0,
          top: 0,
          width: nw,
          height: nh,
        });
        const again = await pipe
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });
        data = again.data;
        info = again.info;
        iw = nw;
        ih = nh;
        meta.width = nw;
        meta.height = nh;
        targetW = Math.min(targetW, nw);
      }

      const r = Math.max(2, Math.round(Math.min(iw, ih) * radius));
      // Anti-alias the curve over ~1.5px so the clip is smooth, not stepped.
      const soft = 1.5;

      const clip = (x, y) => {
        // Which corner is this pixel in, and how far from the curve's centre?
        const cx = x < r ? r : x >= iw - r ? iw - r - 1 : -1;
        const cy = y < r ? r : y >= ih - r ? ih - r - 1 : -1;
        if (cx < 0 || cy < 0) return; // not in a corner box

        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= r - soft) return;

        const o = (y * iw + x) * 4 + 3;
        if (dist >= r) {
          data[o] = 0;
        } else {
          // Feather: ramp alpha down as the pixel approaches the curve.
          const t = (r - dist) / soft;
          data[o] = Math.round(data[o] * Math.min(Math.max(t, 0), 1));
        }
      };

      for (let y = 0; y < r; y++) {
        for (let x = 0; x < r; x++) {
          clip(x, y);
          clip(iw - 1 - x, y);
          clip(x, ih - 1 - y);
          clip(iw - 1 - x, ih - 1 - y);
        }
      }

      pipe = sharp(data, { raw: info });
    }

    /*
      stripFaintAlpha: clean the RESIDUE left behind by background removal.

      The cut-out source was produced by a matting tool, and it did not leave a
      clean binary edge. Measured on the crop that ships: 46.9% of pixels are
      fully transparent and 51.7% fully opaque, but ~1.4% sit BETWEEN — faint
      alpha (1..80) scattered over the whole frame, including blocks at the
      extreme left and right edges and along the bottom.

      Those few percent are invisible against a dark page and nearly invisible
      against a light one — which is exactly why they went unnoticed — but they
      are the reason the user could see a RECTANGLE around a cut-out that has no
      rectangle: the faint residue traces the original photo's bounds, so the
      eye reads a faint plate edge where there is none.

      The fix is a hard threshold with a narrow ramp. Alpha below `floor` becomes
      0 (gone); alpha above `ceil` stays as it is; between them it is stretched,
      so genuine anti-aliased edges (hair, the sash) keep their softness instead
      of turning into a jagged cut.

      Applied ONLY where this is safe: an alpha photograph, never a logo (a
      logo's own soft edges are the artwork).
    */
    if (opts.stripFaintAlpha) {
      const floor = opts.stripFaintAlpha.floor ?? 40;
      const ceil = opts.stripFaintAlpha.ceil ?? 120;
      const { data, info } = await pipe
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const N = info.width * info.height;
      for (let i = 0; i < N; i++) {
        const o = i * 4 + 3;
        const v = data[o];
        if (v <= floor) data[o] = 0;
        else if (v < ceil) data[o] = Math.round(((v - floor) / (ceil - floor)) * 255);
      }
      pipe = sharp(data, { raw: info });
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
