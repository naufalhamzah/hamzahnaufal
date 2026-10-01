/**
 * EDUCATION
 * ============================================================================
 * SOURCE: [P] = Profile.pdf (authoritative), [D] = portfolio deck.
 *
 * No graduation month and no GPA are shown: neither document states them. The
 * TODO on the university entry says so explicitly rather than inventing a date.
 * ============================================================================
 */

import { educationListSchema } from './schemas';
import type { EducationEntry } from '@/types/content';

const raw: EducationEntry[] = [
  {
    id: 'unnes',
    institution: 'Universitas Negeri Semarang',
    degree: "Bachelor's Degree",
    field: 'Information Systems',
    /*
      Graduation month confirmed by the user: MARCH 2026. It is stated as a range
      end so the education entry reads like every other dated record on the site,
      and the TODO below was removed because the question is now answered.
    */
    dateRange: '2022 – March 2026',
    sortKey: '2022-08',
    location: 'Semarang, Jawa Tengah, Indonesia',
    highlights: [
      'First author of two published papers in IJIRSE',
      'Co-author of a Smart Farming paper in the AMPOEN journal',
      'Led an organisational bureau for one year while studying',
    ],
    logo: {
      src: '/images/logos/unnes.webp',
      alt: 'Universitas Negeri Semarang crest',
      /*
        REAL file size — 800x1069, not the 800x800 an earlier version claimed.
        The wrong pair was not cosmetic: these numbers become the <img> width and
        height attributes, so the browser reserved a SQUARE box for a portrait
        file. Against the portrait image that reserve is wrong in both
        directions, and inside a fixed square plate the crest was then squeezed —
        which is what the user saw as a cut-off logo.
      */
      width: 800,
      height: 1069,
    },
    source: 'both',
  },
  {
    id: 'sman1-tangerang',
    institution: 'SMAN 1 Kabupaten Tangerang',
    degree: 'Science',
    field: 'Matematika dan Ilmu Alam',
    dateRange: '2019 – 2022',
    sortKey: '2019-07',
    location: 'Kabupaten Tangerang, Banten, Indonesia',
    highlights: [
      'Silver Medal — Olimpiade Numerasi Nasional',
      'Participated in Karya Ilmiah Remaja (KIR)',
    ],
    logo: {
      src: '/images/logos/sma.webp',
      alt: 'SMAN 1 Kabupaten Tangerang crest',
      width: 800,
      height: 800,
    },
    source: 'portfolio',
  },
];

export const educationEntries: EducationEntry[] = educationListSchema.parse(raw);

export const educationSorted = [...educationEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);
