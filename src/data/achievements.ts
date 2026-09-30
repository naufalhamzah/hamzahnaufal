/**
 * ACHIEVEMENTS
 * ============================================================================
 * SOURCE: [D] awards and certificates shown in the deck, cross-checked vs [P].
 *
 * Wording policy: each entry states only what the document states — no ranking
 * inflation. A school-level olympiad medal is described as a Silver Medal at
 * the Olimpiade Numerasi Nasional, not upgraded to something it was not.
 *
 * TO ADD: append one object. `kind` picks the marker glyph.
 * ============================================================================
 */

import { achievementListSchema } from './schemas';
import type { AchievementEntry } from '@/types/content';

const raw: AchievementEntry[] = [
  {
    id: 'olimpiade-numerasi-silver',
    /**
     * YEAR CORRECTION: the award scan's file name and piagam both read 2020,
     * so this is 2020 — previously recorded as 2022 from a slide thumbnail.
     */
    title: 'Silver Medal — Olimpiade Numerasi Nasional',
    detail:
      'Awarded a Silver Medal (Medali Perak) at the Olimpiade Numerasi Nasional, Level 5, representing SMAN 1 Kabupaten Tangerang. Awarded alongside participation in Karya Ilmiah Remaja (KIR) during secondary school.',
    year: '2020',
    kind: 'award',
    context: 'Secondary school — SMAN 1 Kabupaten Tangerang',
    /** The piagam itself, so the claim is verifiable on the page. */
    visual: {
      src: '/images/certificates/cert-silver-medal-onn.webp',
      alt: 'Olimpiade Numerasi Nasional Silver Medal piagam awarded to Hamzah Naufal Zuhdi, SMAN 1 Kabupaten Tangerang',
    },
    source: 'portfolio',
  },
  {
    id: 'lomba-esai-pab-ukmp',
    title: 'Finalist — Lomba Esai PAB UKMP',
    detail: 'Selected as a finalist in the Lomba Esai PAB UKMP essay competition.',
    year: '2022',
    kind: 'competition',
    visual: {
      src: '/images/certificates/cert-finalist-pab-ukmp.webp',
      alt: 'Certificate recognising Hamzah Naufal Zuhdi as a finalist in the Lomba Esai PAB UKMP',
    },
    source: 'portfolio',
  },
  {
    id: 'kemdikbud-funding-smart-farming',
    title: 'Kemdikbud 2024 Programme Funding',
    detail:
      'The Smart Farming programme secured Kemdikbud 2024 funding totalling more than Rp30 million.',
    year: '2024',
    kind: 'funding',
    context: 'Smart Farming — Automatic Irrigation System integrated with SIMPELDES',
    visual: {
      src: '/images/certificates/cert-ppk-ormawa.webp',
      alt: 'PPK Ormawa 2024 certificate from Kemendikbudristek for HIMA Ilmu Komputer UNNES',
    },
    source: 'portfolio',
  },
];

export const achievementEntries: AchievementEntry[] =
  achievementListSchema.parse(raw);
