/**
 * PROJECTS
 * ============================================================================
 * SOURCE: [P] = Profile.pdf, [D] = PORTOFOLIO HAMZAH (3).pdf
 * IMAGES: real screenshots from ./konten, optimised into /public/images/projects
 *
 * Outcome policy: `outcomes` contains ONLY statements the documents actually
 * make. No metrics, no KPIs, no impact figures have been invented.
 *
 * TO ADD A PROJECT: append one object below. Its card, its gallery and its
 * /projects/<id>/ case-study page are all generated automatically.
 * ============================================================================
 */

import { projectListSchema } from './schemas';
import type { ProjectEntry } from '@/types/content';

const raw: ProjectEntry[] = [
  /* ======================= TIER 1 — FEATURED ============================ */
  {
    id: 'marketing-data-system',
    title: 'Marketing Data Management System',
    subtitle: 'Beauty Innovation Laboratories',
    categories: ['systems', 'data'],
    role: 'System Developer',
    dateRange: 'January 2026',
    year: '2026',
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
      src: '/images/projects/marketing-sheet-1.webp',
      alt: 'The marketing data management spreadsheet, showing customer records with brand, no-HP reference, drive link, product detail, customer type, sample value, payment status and PIC columns',
      width: 1700,
      height: 956,
    },
    gallery: [
      {
        src: '/images/projects/marketing-sheet-1.webp',
        alt: 'Main data sheet listing customers with product, sample value and payment-status columns',
        width: 1700,
        height: 956,
        caption: 'Customer and proposal tracking sheet',
      },
      {
        src: '/images/projects/marketing-script-1.webp',
        alt: 'Google Apps Script editor showing the JavaScript that automates the customer data system, including record creation and update functions',
        width: 1500,
        height: 844,
        caption: 'Automation logic in Google Apps Script',
      },
    ],
    featured: true,
    source: 'both',
  },
  {
    id: 'procurement-dashboard',
    title: 'Monitoring Pengadaan Dashboard',
    subtitle: 'PT PLN (Persero) Pusharlis UP2W I',
    categories: ['data', 'systems'],
    role: 'Dashboard Developer',
    dateRange: '2025',
    year: '2025',
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
    /**
     * VISUALS — the four newest dashboard captures replace the earlier
     * screenshots; each is a distinct view, so the gallery shows the breadth
     * of the dashboard rather than four near-identical frames.
     */
    visual: {
      src: '/images/projects/pln-dashboard-1.webp',
      alt: 'Procurement monitoring dashboard in Google Looker Studio — top-level cards and monthly trend line',
      width: 748,
      height: 422,
    },
    gallery: [
      {
        src: '/images/projects/pln-dashboard-1.webp',
        alt: 'Dashboard overview with summary cards and a monthly procurement trend line',
        width: 748,
        height: 422,
        caption: 'Overview and monthly trend',
      },
      {
        src: '/images/projects/pln-dashboard-2.webp',
        alt: 'Dashboard view combining a trend line with procurement status and bar breakdowns',
        width: 748,
        height: 422,
        caption: 'Status breakdown and volume',
      },
      {
        src: '/images/projects/pln-dashboard-3.webp',
        alt: 'Dashboard view with a procurement timeline, bar chart and donut chart by category',
        width: 748,
        height: 422,
        caption: 'Trend, volume and category mix',
      },
      {
        src: '/images/projects/pln-dashboard-4.webp',
        alt: 'Vendor performance detail view listing vendors with procurement figures',
        width: 748,
        height: 422,
        caption: 'Vendor performance detail',
      },
    ],
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
    dateRange: '2024',
    year: '2024',
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
      'Supported the programme’s reported improvement in agricultural productivity and water management efficiency',
    ],
    tools: ['IoT-based smart farming', 'Automatic irrigation system', 'SIMPELDES'],
    visual: {
      src: '/images/projects/smart-farming-article.webp',
      alt: 'Cover page of the Ampoen journal article on Smart Farming in Desa Gonoharjo, listing the author team and the article DOI',
      fit: 'contain',
      width: 1200,
      height: 1635,
    },
    gallery: [
      {
        src: '/images/projects/smart-farming-article.webp',
        alt: 'Cover page of the published Smart Farming article in Ampoen journal',
        fit: 'contain',
        width: 1200,
        height: 1635,
        caption: 'Published article — Ampoen Vol. 2 No. 2',
      },
      {
        src: '/images/experience/ppk-ormawa.webp',
        alt: 'PPK Ormawa team photograph at the village site',
        width: 1500,
        height: 999,
        caption: 'Field programme',
      },
    ],
    featured: true,
    source: 'both',
    todo:
      'Dates conflict between documents (Feb–Dec 2024 vs Jun–Nov 2024). Only the year is shown until confirmed.',
  },

  /* ======================= TIER 2 — RESEARCH ============================ */
  {
    id: 'knn-creditworthiness',
    title: 'KNN Creditworthiness Evaluation',
    subtitle: 'Case study on Bank ABC',
    categories: ['research', 'data'],
    role: 'First author',
    dateRange: '2024',
    year: '2024',
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
      src: '/images/projects/knn-paper.webp',
      alt: 'Cover of the Indonesian Journal of Informatic Research and Software Engineering (IJIRSE), Vol. 4 No. 1, March 2024 — the issue carrying the K-Nearest Neighbors creditworthiness paper',
      fit: 'contain',
      width: 976,
      height: 1379,
    },
    featured: false,
    source: 'portfolio',
  },
  {
    id: 'naive-bayes-ipusnas',
    title: 'Naive Bayes Sentiment Analysis',
    subtitle: 'iPusnas app reviews on Google Play Store',
    categories: ['research', 'data'],
    role: 'First author',
    dateRange: '2025',
    year: '2025',
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
      src: '/images/projects/naive-bayes-paper.webp',
      alt: 'Cover of the Indonesian Journal of Informatic Research and Software Engineering (IJIRSE), Vol. 5 No. 1, March 2025 — the issue carrying the iPusnas Naive Bayes sentiment paper',
      fit: 'contain',
      width: 976,
      height: 1379,
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
    sortKey: '2024-01',
    year: '2024',
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
      src: '/images/projects/guzelev-2.webp',
      alt: 'Guzelev home decor app screen showing product browsing in the mobile interface',
      width: 473,
      height: 972,
    },
    gallery: [
      {
        src: '/images/projects/guzelev-2.webp',
        alt: 'Guzelev app product listing screen',
        width: 473,
        height: 972,
        caption: 'Product browsing',
      },
      {
        src: '/images/projects/guzelev-1.webp',
        alt: 'Guzelev app detail and planner screen',
        width: 473,
        height: 972,
        caption: 'Detail and planner view',
      },
    ],
    link: {
      label: 'View design',
      href: 'https://bit.ly/Guzelev-Project',
      external: true,
    },
    featured: false,
    source: 'portfolio',
    todo:
      'No date documented for this course project. Only the year is shown and it is inferred from the course period.',
  },
  {
    id: 'wellmind',
    title: 'WellMind',
    subtitle: 'Mental Health Consultation App — UI/UX Design',
    categories: ['uiux'],
    role: 'UI/UX Designer',
    sortKey: '2024-02',
    year: '2024',
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
      src: '/images/projects/wellmind-2.webp',
      alt: 'WellMind app showing the list of licensed mental health professionals',
      width: 473,
      height: 972,
    },
    gallery: [
      {
        src: '/images/projects/wellmind-2.webp',
        alt: 'WellMind counsellor listing screen',
        width: 473,
        height: 972,
        caption: 'Counsellor listing',
      },
      {
        src: '/images/projects/wellmind-3.webp',
        alt: 'WellMind article and education screen',
        width: 473,
        height: 972,
        caption: 'Educational content',
      },
      {
        src: '/images/projects/wellmind-1.webp',
        alt: 'WellMind splash screen',
        width: 473,
        height: 972,
        caption: 'App entry screen',
      },
    ],
    link: {
      label: 'View design',
      href: 'https://bit.ly/WellMind-Project',
      external: true,
    },
    featured: false,
    source: 'portfolio',
    todo:
      'No date documented for this course project. Only the year is shown and it is inferred from the course period.',
  },
  {
    id: 'kedai-nyam',
    title: 'Kedai Nyam',
    subtitle: 'Snack Store App — UI/UX Design',
    categories: ['uiux'],
    role: 'UI/UX Designer',
    sortKey: '2024-03',
    year: '2024',
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
      src: '/images/projects/kedai-nyam-1.webp',
      alt: 'Kedai Nyam desktop dashboard with sales summary and transaction figures',
      width: 689,
      height: 491,
    },
    gallery: [
      {
        src: '/images/projects/kedai-nyam-1.webp',
        alt: 'Kedai Nyam desktop sales summary dashboard',
        width: 689,
        height: 491,
        caption: 'Desktop — sales summary',
      },
      {
        src: '/images/projects/kedai-nyam-4.webp',
        alt: 'Kedai Nyam desktop transaction and report table',
        width: 689,
        height: 448,
        caption: 'Desktop — transaction report',
      },
      {
        src: '/images/projects/kedai-nyam-2.webp',
        alt: 'Kedai Nyam mobile ordering screen',
        width: 473,
        height: 972,
        caption: 'Mobile — ordering',
      },
      {
        src: '/images/projects/kedai-nyam-3.webp',
        alt: 'Kedai Nyam mobile product listing screen',
        width: 473,
        height: 972,
        caption: 'Mobile — product listing',
      },
    ],
    links: [
      {
        label: 'Desktop design',
        href: 'https://bit.ly/KedaiNyam-ProjectDesktop',
        external: true,
      },
      {
        label: 'Mobile design',
        href: 'https://bit.ly/KedaiNyam-ProjectMobile',
        external: true,
      },
    ],
    featured: false,
    source: 'portfolio',
    todo:
      'No date documented for this course project. Only the year is shown and it is inferred from the course period.',
  },
];

export const projectEntries: ProjectEntry[] = projectListSchema.parse(raw);

/** Featured first, then newest. */
export const projectsSorted = [...projectEntries].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return b.sortKey.localeCompare(a.sortKey);
});

export const featuredProjects = projectsSorted.filter((p) => p.featured);
export const otherProjects = projectsSorted.filter((p) => !p.featured);

/** Look up one project by id (used by the case-study page). */
export function getProject(id: string): ProjectEntry | undefined {
  return projectEntries.find((p) => p.id === id);
}

/** Up to `limit` other projects sharing a category — for the "related" strip. */
export function relatedProjects(id: string, limit = 2): ProjectEntry[] {
  const base = getProject(id);
  if (!base) return [];
  return projectEntries
    .filter((p) => p.id !== id)
    .filter((p) => p.categories.some((c) => base.categories.includes(c)))
    .slice(0, limit);
}
