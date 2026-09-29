/**
 * EDUCATION
 * ============================================================================
 * SOURCE: [P] = Profile.pdf (authoritative), [D] = portfolio deck.
 *
 * No graduation month is shown: [P] gives only "August 2022 – 2026" and the
 * deck gives only "2022 – 2026". No GPA is shown because none is documented.
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
    dateRange: '2022 – 2026',
    sortKey: '2022-08',
    location: 'Semarang, Jawa Tengah, Indonesia',
    highlights: [
      'First author of two published papers in IJIRSE',
      'Co-author of a Smart Farming paper in the AMPOEN journal',
      'Led an organisational bureau for one year while studying',
    ],
    source: 'both',
    todo: 'Graduation month is not documented in either source.',
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
    source: 'portfolio',
  },
];

export const educationEntries: EducationEntry[] = educationListSchema.parse(raw);

export const educationSorted = [...educationEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);
