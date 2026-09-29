/**
 * PROJECTS
 * ============================================================================
 * SOURCE: [P] = Profile.pdf, [D] = PORTOFOLIO HAMZAH (3).pdf
 *
 * Outcome policy: `outcomes` contains ONLY statements the documents actually
 * make. No metrics, no KPIs, no impact figures have been invented — where a
 * document gives no quantified result, the array is simply shorter.
 *
 * Visual policy: real screenshots are not available as separate files, so every
 * project points at a clearly-labelled placeholder SVG. Swapping in a real
 * image later means changing `visual.src` only — no component edits.
 * ============================================================================
 */

import { projectListSchema } from './schemas';
import type { ProjectEntry } from '@/types/content';

const raw: ProjectEntry[] = [
  /* ====================== FEATURED / TIER 1 ============================== */
  {
    id: 'marketing-data-system',
    title: 'Marketing Data Management System',
    subtitle: 'Beauty Innovation Laboratories',
    categories: ['systems', 'data'],
    role: 'System Developer',
    dateRange: 'January 2026',
    sortKey: '2026-01',
    organisation: 'Beauty Innovation Laboratories',
    tagline:
      'An integrated marketing data system built from scratch to track customers, proposal progress and follow-ups in real time.',
    context:
      'The marketing team’s customer and pipeline information needed a single, reliable structure. Data was spread across ad-hoc records, making it hard to see where a proposal stood, what follow-up was due, or whether the business data was complete. I was trusted to build the internal data system from the ground up.',
    approach: [
      'Built the system from the ground up using Google Sheets and JavaScript',
      'Designed a structured workflow to track customer information, sales pipeline progress and follow-up status',
      'Automated data integration across related tables so records stayed consistent',
      'Kept the system usable by the marketing team day to day, rather than a one-off deliverable',
    ],
    outcomes: [
      'Built an integrated marketing data system from scratch',
      'Automated customer record-keeping and follow-up progress tracking',
      'Completed the system in under one month',
      'Improved the marketing team’s monitoring efficiency and data accuracy',
      'Ensured all business data was recorded accurately and accessible in real time',
      'Helped sustain the system in daily operations after handover',
    ],
    tools: ['Google Sheets', 'JavaScript'],
    visual: {
      src: '/images/placeholders/project-marketing-system.svg',
      alt: 'Placeholder for the Marketing Data Management System interface',
      isPlaceholder: true,
      aspect: '16/9',
    },
    featured: true,
    source: 'both',
  },
  {
    id: 'procurement-dashboard',
    title: 'Monitoring Pengadaan Dashboard',
    subtitle: 'PT PLN (Persero) Pusharlis UP2W I',
    categories: ['data', 'systems'],
    role: 'Dashboard Developer',
    // [P] gives Feb–Jul 2025; [D] gives no period for the project itself.
    dateRange: '2025',
    sortKey: '2025-06',
    organisation: 'PT PLN (Persero) Pusharlis UP2W I',
    tagline:
      'An interactive Looker Studio dashboard monitoring procurement data, work progress and material status.',
    context:
      'Procurement monitoring relied on data that was difficult to read and slow to analyse, which held back reporting and evaluation. My main project during the internship was to build an interactive dashboard that made the procurement process visible and analysable.',
    approach: [
      'Developed an interactive dashboard using Google Looker Studio',
      'Integrated data from multiple sources into a single view',
      'Built real-time report visualisations covering procurement data, work progress and material status',
      'Processed, validated and visualised company data to meet operational standards for use across departments',
    ],
    outcomes: [
      'Improved data readability and accelerated analysis of the procurement process',
      'Supported more effective decision-making',
      'Made monitoring performance, material-need analysis and management reporting easier',
      'Made the evaluation process faster, more accurate and more efficient',
    ],
    tools: ['Google Looker Studio', 'Google Sheets'],
    visual: {
      src: '/images/placeholders/project-procurement-dashboard.svg',
      alt: 'Placeholder for the PLN procurement monitoring dashboard',
      isPlaceholder: true,
      aspect: '16/9',
    },
    link: {
      label: 'View project',
      href: 'https://bit.ly/DashboardMonitoring-Project',
      external: true,
    },
    featured: true,
    source: 'both',
  },
  {
    id: 'smart-farming',
    title: 'Smart Farming — Automatic Irrigation System',
    subtitle: 'SIMPELDES · PPK Ormawa HIMA ILKOM UNNES 2024',
    categories: ['research', 'systems'],
    role: 'Research & Publication Team',
    // [D] project slide gives Feb–Dec 2024; [P] Kampus Merdeka gives Jun–Nov 2024.
    // The conflict is unresolved, so only the year is displayed.
    dateRange: '2024',
    sortKey: '2024-06',
    organisation: 'PPK Ormawa HIMA ILKOM UNNES 2024',
    tagline:
      'Renewable-energy automatic irrigation integrated with the SIMPELDES village information system, for Desa Gonoharjo.',
    context:
      'Desa Gonoharjo, on the slopes of Mount Ungaran, has strong agricultural potential but faced sub-optimal conventional irrigation — especially during the dry season — alongside manual village services. The PPK Ormawa programme addressed this through IoT-based technology and a digital information system.',
    approach: [
      'Contributed to activity proposals that secured programme funding',
      'Prepared scientific publications documenting the programme',
      'Wrote popular articles to support programme promotion and community education',
      'Worked within a multi-author research team covering site surveys, technology socialisation, irrigation installation, farmer education, and monitoring and evaluation',
    ],
    outcomes: [
      'Secured Kemdikbud 2024 funding totalling more than Rp30 million',
      'Produced scientific publications and popular articles across online media',
      'Contributed to documentation and publication that increased the programme’s exposure',
      'Supported the programme’s reported significant improvement in agricultural productivity and water management efficiency',
    ],
    tools: ['IoT-based smart farming', 'Automatic irrigation system', 'SIMPELDES'],
    visual: {
      src: '/images/placeholders/project-smart-farming.svg',
      alt: 'Placeholder for the Smart Farming programme',
      isPlaceholder: true,
      aspect: '16/9',
    },
    featured: true,
    source: 'both',
    todo:
      'Dates conflict between documents (Feb–Dec 2024 vs Jun–Nov 2024). Only the year is shown until you confirm.',
  },

  /* ====================== TIER 2 — Research ============================== */
  {
    id: 'knn-creditworthiness',
    title: 'KNN Creditworthiness Evaluation',
    subtitle: 'Case study on Bank ABC',
    categories: ['research', 'data'],
    role: 'Author',
    dateRange: '2024',
    sortKey: '2024-03',
    tagline:
      'Applying the K-Nearest Neighbors algorithm to creditworthiness evaluation in the banking sector.',
    context:
      'A published study applying K-Nearest Neighbors to creditworthiness evaluation, using a bank case study. Hamzah Naufal Zuhdi is the first author.',
    approach: [
      'Applied the K-Nearest Neighbors algorithm to creditworthiness classification',
      'Evaluated model performance using a confusion matrix',
      'Wrote the study as first author with Budi Prasetyo',
    ],
    outcomes: [
      'Reported accuracy of 93.33%–95.00% across the tested K values',
      'Published in IJIRSE Vol. 4 No. 1, Maret 2024, pp. 40–46',
    ],
    tools: ['K-Nearest Neighbors', 'Confusion matrix', 'Python'],
    visual: {
      src: '/images/placeholders/project-knn-research.svg',
      alt: 'Placeholder for the KNN creditworthiness research paper',
      isPlaceholder: true,
      aspect: '16/9',
    },
    featured: false,
    source: 'portfolio',
  },
  {
    id: 'naive-bayes-ipusnas',
    title: 'Naive Bayes Sentiment Analysis',
    subtitle: 'iPusnas app reviews on Google Play Store',
    categories: ['research', 'data'],
    role: 'Author',
    dateRange: '2025',
    sortKey: '2025-03',
    tagline:
      'Sentiment classification of iPusnas application reviews using a Naive Bayes classifier.',
    context:
      'A published sentiment analysis of user reviews for the iPusnas digital library application on the Google Play Store, using a Naive Bayes classifier. Hamzah Naufal Zuhdi is the first author.',
    approach: [
      'Applied a Naive Bayes classifier to review sentiment',
      'Evaluated the model with an 80:20 train–test split',
      'Wrote the study as first author with Budi Prasetyo',
    ],
    outcomes: [
      'Reported a 75% F1-score on an 80:20 data split',
      'Published in IJIRSE Vol. 5 No. 1, Maret 2025, pp. 12–19',
    ],
    tools: ['Naive Bayes', 'Python'],
    visual: {
      src: '/images/placeholders/project-naive-bayes-research.svg',
      alt: 'Placeholder for the iPusnas sentiment analysis paper',
      isPlaceholder: true,
      aspect: '16/9',
    },
    featured: false,
    source: 'portfolio',
  },

  /* ========================= TIER 3 — UI/UX ============================= */
  {
    id: 'guzelev',
    title: 'Guzelev',
    subtitle: 'Home Decor App — UI/UX Design',
    categories: ['uiux'],
    role: 'UI/UX Designer',
    // [D] gives no date for the UI/UX projects.
    sortKey: '2024-01',
    tagline:
      'A home decor shopping app with a 5D Planner and Augmented Reality visualisation, designed in Figma.',
    context:
      'Designed the UI/UX for Guzelev as part of a Kewirausahaan (entrepreneurship) course. The app delivers an interactive home-decor shopping experience with a 5D Planner and Augmented Reality technology, letting users design, adjust and visualise their interior in real time.',
    approach: [
      'Designed the UI/UX in Figma',
      'Focused on an interactive shopping and interior-visualisation experience',
      'Explored 5D Planner and Augmented Reality features',
    ],
    outcomes: [],
    tools: ['Figma'],
    visual: {
      src: '/images/placeholders/project-guzelev-uiux.svg',
      alt: 'Placeholder for the Guzelev home decor app design',
      isPlaceholder: true,
      aspect: '4/3',
    },
    link: {
      label: 'View design',
      href: 'https://bit.ly/Guzelev-Project',
      external: true,
    },
    featured: false,
    source: 'portfolio',
    todo: 'No date documented for this course project.',
  },
  {
    id: 'wellmind',
    title: 'WellMind',
    subtitle: 'Mental Health Consultation App — UI/UX Design',
    categories: ['uiux'],
    role: 'UI/UX Designer',
    sortKey: '2024-01',
    tagline:
      'An online mental health consultation platform offering chat and video counselling with licensed professionals.',
    context:
      'Designed the UI/UX for WellMind as an online mental health consultation platform. The app provides counselling via chat and video call with licensed experts, alongside educational information about mental health, focusing on user experience and ease of access for the general public.',
    approach: [
      'Designed the UI/UX in Figma with supporting assets in Canva',
      'Focused on user experience and accessible service entry',
      'Covered counselling flows via chat and video call',
    ],
    outcomes: [],
    tools: ['Figma', 'Canva'],
    visual: {
      src: '/images/placeholders/project-wellmind-uiux.svg',
      alt: 'Placeholder for the WellMind mental health consultation app design',
      isPlaceholder: true,
      aspect: '4/3',
    },
    link: {
      label: 'View design',
      href: 'https://bit.ly/WellMind-Project',
      external: true,
    },
    featured: false,
    source: 'portfolio',
    todo: 'No date documented for this course project.',
  },
  {
    id: 'kedai-nyam',
    title: 'Kedai Nyam',
    subtitle: 'Snack Store App — UI/UX Design',
    categories: ['uiux'],
    role: 'UI/UX Designer',
    sortKey: '2024-01',
    tagline:
      'A two-sided snack store app: a desktop version for managers and staff, and a mobile version for consumers.',
    context:
      'Designed the UI/UX for Kedai Nyam across two audiences. The desktop version supports cashier, manager, warehouse, sales and supplier roles in monitoring stock, transactions and financial reports. The mobile version lets consumers order online with a fast, easy and interactive shopping experience.',
    approach: [
      'Designed both a desktop and a mobile version in Figma',
      'Structured the desktop system around distinct operational roles',
      'Focused the mobile version on a fast, easy ordering experience',
    ],
    outcomes: [],
    tools: ['Figma'],
    visual: {
      src: '/images/placeholders/project-kedai-nyam-uiux.svg',
      alt: 'Placeholder for the Kedai Nyam snack store app design',
      isPlaceholder: true,
      aspect: '4/3',
    },
    link: {
      label: 'Desktop design',
      href: 'https://bit.ly/KedaiNyam-ProjectDesktop',
      external: true,
    },
    featured: false,
    source: 'portfolio',
    todo:
      'No date documented. A second link exists for the mobile design (bit.ly/KedaiNyam-ProjectMobile) — add it when the content model supports multiple links.',
  },
];

export const projectEntries: ProjectEntry[] = projectListSchema.parse(raw);

/** Featured first, then by date descending. */
export const projectsSorted = [...projectEntries].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return b.sortKey.localeCompare(a.sortKey);
});

export const featuredProjects = projectsSorted.filter((p) => p.featured);
export const otherProjects = projectsSorted.filter((p) => !p.featured);

/** Look up a single project by id (used by the case-study pages). */
export function getProject(id: string): ProjectEntry | undefined {
  return projectEntries.find((p) => p.id === id);
}
