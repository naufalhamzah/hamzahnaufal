/**
 * ACHIEVEMENTS
 * ============================================================================
 * SOURCE: [D] = PORTOFOLIO HAMZAH (3).pdf (awards and certificates shown in the
 *         deck), cross-checked against [P].
 *
 * Wording policy: each entry states only what the document states — no ranking
 * inflation (a school-level olympiad medal is described as such, not as a
 * national title) and no invented figures.
 * ============================================================================
 */

import { achievementListSchema } from './schemas';
import type { AchievementEntry } from '@/types/content';

const raw: AchievementEntry[] = [
  {
    id: 'olimpiade-numerasi-silver',
    title: 'Silver Medal — Olimpiade Numerasi Nasional',
    detail:
      'Awarded a Silver Medal at the Olimpiade Numerasi Nasional, alongside participation in Karya Ilmiah Remaja (KIR), during secondary school.',
    year: '2022',
    kind: 'award',
    context: 'Secondary school — SMAN 1 Kabupaten Tangerang',
    source: 'portfolio',
  },
  {
    id: 'lomba-esai-pab-ukmp',
    title: 'Finalist — Lomba Esai PAB UKMP',
    detail:
      'Selected as a finalist in the Lomba Esai PAB UKMP essay competition.',
    year: '2022',
    kind: 'competition',
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
    source: 'portfolio',
  },
];

export const achievementEntries: AchievementEntry[] =
  achievementListSchema.parse(raw);
