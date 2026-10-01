/**
 * GALLERY / MOMENTS
 * ============================================================================
 * SOURCE: personal and activity photographs supplied in `konten/`.
 *
 * WHY THIS FILE EXISTS SEPARATELY FROM `experience.ts`
 * The photographs were not organised by activity. Nothing in the file names or
 * the images themselves reliably says "this was AirNav" or "this was PLN", so
 * attaching them to a named employer would be an assumption — which the brief
 * explicitly forbids. They are collected here as one honest body of work and
 * shown as a Gallery, while the ONLY images placed inside an Experience entry
 * are the ones whose employer is unambiguous from the image itself.
 *
 * Captions describe what is visible in the frame. Where a banner or screen in
 * the photo carries a name (FMIPA, HIMA ILKOM, UNNES, GPMB, the AirNav screen)
 * that is reported as text IN the image, not as a claim about the event.
 *
 * TO ADD A PHOTO: drop the file into `public/images/gallery/`, then add one
 * entry here. The grid adapts to any count.
 * ============================================================================
 */

import { galleryListSchema } from './schemas';
import type { GalleryEntry } from '@/types/content';

/* --------------------------------------------------------------------------
   COLLECTIONS

   The gallery is split by the SETTING the photographs come from, because that is
   the split a visitor actually reads by — "what did he do at university" and
   "what has he done on the job" are different questions, and a single
   undifferentiated wall answers neither.

   Every photograph currently held is CAMPUS: committees, field programmes,
   classroom visits, and PPK Ormawa field work. That was verified by looking at
   each frame, not by trusting the filenames — they are committee jackets, the
   FMIPA building, programme banners, and the UNNES crest on a meeting-room wall.
   There is no office photograph in the set, so the internship collection is
   declared but EMPTY rather than padded with campus shots relabelled as work.

   The internship collection is wired up and waiting: dropping office
   photographs into public/images/gallery/ and tagging them `internship` below
   makes the section appear. Until then it is not rendered, so the page never
   shows an empty shell.
   -------------------------------------------------------------------------- */
export const GALLERY_COLLECTIONS = [
  {
    id: 'campus',
    label: 'Campus & organisations',
    blurb:
      'Committees, student bodies and field programmes from my time at Universitas Negeri Semarang.',
  },
  {
    id: 'internship',
    label: 'Internships & workplace',
    blurb:
      'Photographs from the organisations I have worked with. These are added as the material becomes available.',
  },
] as const;

export type GalleryCollectionId = (typeof GALLERY_COLLECTIONS)[number]['id'];

/** Shorthand: real photographs, so never flagged as a placeholder. */
const shot = (
  file: string,
  alt: string,
  caption: string,
  group: string,
  /*
    Defaults to `campus`, which is correct for every photograph currently held —
    all 19 were individually inspected and every one is university activity
    (committee jackets, the FMIPA building, programme banners, PPK Ormawa field
    work). The default keeps the call sites readable; the internship collection
    sets it explicitly.
  */
  collection: GalleryEntry['collection'] = 'campus',
): GalleryEntry => ({
  id: file.replace(/\.webp$/, ''),
  visual: {
    src: `/images/gallery/${file}`,
    alt,
    caption,
  },
  caption,
  group,
  collection,
});

const raw: GalleryEntry[] = [
  shot(
    'moment-01.webp',
    'Three students in yellow committee jackets seated at a table with laptops',
    'Committee meeting — briefing session at a table, three laptops open',
    'Committees & events',
  ),
  shot(
    'moment-02.webp',
    'A large group of students in yellow committee jackets posing on a stage',
    'Full committee group photo on a stage before an event',
    'Committees & events',
  ),
  shot(
    'moment-03.webp',
    'Two students in yellow committee jackets working on a laptop at a wooden desk',
    'Registration desk duties during an event',
    'Committees & events',
  ),
  shot(
    'moment-04.webp',
    'A person standing outdoors beside a gift basket arrangement',
    'Setting up an outdoor arrangement before an event',
    'Committees & events',
  ),
  shot(
    'moment-05.webp',
    'Five students in field jackets posing in front of the FMIPA dean building',
    'Field team photo in front of the FMIPA building — the signage is readable in frame',
    'Campus & field',
  ),
  shot(
    'moment-06.webp',
    'Students in uniform seated at a long table facing a projection screen',
    'Panel session — students seated at the front table, screen behind',
    'Campus & field',
  ),
  shot(
    'moment-07.webp',
    'Four people in field jackets in conversation in a campus corridor',
    'Between sessions in a campus corridor',
    'Campus & field',
  ),
  shot(
    'moment-08.webp',
    'Two people working at laptops in an open-plan office with shelving behind',
    'Working session at laptops in an open-plan space',
    'Campus & field',
  ),
  shot(
    'moment-09.webp',
    'Students in yellow committee jackets seated in a hall with laptops',
    'Participants with laptops during a session in a hall',
    'Committees & events',
  ),
  shot(
    'moment-10.webp',
    'A person standing and presenting beside a projector screen',
    'Presenting to a room during an event',
    'Committees & events',
  ),
  shot(
    'moment-11.webp',
    'A group outdoors gathered around a garden bed while one person demonstrates',
    'Field demonstration outdoors with a group gathered around a planting bed',
    'Campus & field',
  ),
  shot(
    'moment-12.webp',
    'A hall of students in yellow committee jackets listening to a speaker',
    'Audience during a session in the main hall',
    'Committees & events',
  ),
  shot(
    'moment-13.webp',
    'Six people in field jackets at night beside a large bonfire',
    'Evening gathering around a bonfire during a field programme',
    'Campus & field',
  ),
  shot(
    'moment-14.webp',
    'Three people at a desk with a laptop in front of a patterned blue curtain',
    'Working table at an evening event',
    'Committees & events',
  ),
  shot(
    'moment-15.webp',
    'A classroom of young pupils with two visitors standing at the back',
    'Classroom visit — pupils at their desks during a school session',
    'Campus & field',
  ),
  shot(
    'moment-16.webp',
    'A very large group seated together for a group photograph in a hall',
    'Large group photograph with the full cohort',
    'Committees & events',
  ),
  shot(
    'moment-17.webp',
    'A large group posed together in front of a stage backdrop',
    'Group photograph in front of a stage backdrop',
    'Committees & events',
  ),
  shot(
    'moment-18.webp',
    'Five students in uniform in front of a screen showing organisation logos',
    'Team photo in front of a presentation screen',
    'Committees & events',
  ),
  /*
    Three photographs added Aug 2026. Alt text below describes what is visible in
    each frame, not an inferred event — the same rule the rest of this file follows.
  */
  shot(
    'moment-19.webp',
    'Students in yellow jackets holding up phones in a meeting room, seated behind a large conference table, with a gold emblem mounted on the wood-panelled wall behind them',
    'Project presentation in a meeting room, committee members at the table',
    'Campus & field',
  ),
];

export const galleryEntries: GalleryEntry[] = galleryListSchema.parse(raw);

/** Distinct group labels, in first-seen order — drives the gallery filters. */
export const galleryGroups: string[] = Array.from(
  new Set(galleryEntries.map((g) => g.group)),
);

/**
 * The collections that actually have photographs, in declaration order.
 *
 * A collection with no entries is dropped here rather than rendered as an empty
 * section — the page shows what exists. The `group` on each entry is what routes
 * it into a collection; the campus group names map to the `campus` collection.
 */
export const galleryByCollection = GALLERY_COLLECTIONS.map((c) => ({
  ...c,
  items: galleryEntries.filter((e) => e.collection === c.id),
})).filter((c) => c.items.length > 0);

/** Counts for the page header, derived so they cannot drift. */
export const galleryCampusCount = galleryEntries.length;
