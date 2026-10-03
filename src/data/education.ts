/**
 * SOURCE: [P] = Profile.pdf (authoritative), [D] = portfolio deck.
 * No graduation month and no GPA are shown: neither document states them.
 */

import { educationListSchema } from './schemas';
import type { EducationEntry } from '@/types/content';

const raw: EducationEntry[] = [
  {
    id: 'unnes',
    institution: 'Universitas Negeri Semarang',
    degree: "Bachelor's Degree",
    field: 'Information Systems',
    /* Graduation month confirmed by the user: MARCH 2026, stated as a range end
       so the entry reads like every other dated record on the site. */
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
        These numbers become the <img> width/height attributes, so a square reserve
        against a portrait file squeezed the crest inside a fixed square plate.
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
