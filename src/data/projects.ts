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
    tools: ['Google Sheets', 'Google Apps Script', 'JavaScript', 'Data modelling', 'Workflow automation', 'Data validation'],
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
    linkPending: 'Open the marketing system',
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
    tools: ['Google Looker Studio', 'Google Sheets', 'Data visualisation', 'Dashboard design', 'Data integration', 'Business process mapping'],
    /**
     * VISUALS — the four newest dashboard captures replace the earlier
     * screenshots; each is a distinct view, so the gallery shows the breadth
     * of the dashboard rather than four near-identical frames.
     */
    /*
      VISUALS — five distinct VIEWS of the dashboard, not five frames of the same
      screen. Each caption states which view it is, because that is what a reader
      needs in order to read the picture: the 2024 and 2025 pages share a layout
      and are only distinguishable by the period and the figures.

      All five are 1600x900 (1600:900, exactly 16:9), so they fill the frame
      without letterboxing and without a crop.
    */
    visual: {
      src: '/images/projects/pln-dashboard-1.webp',
      alt: 'Procurement monitoring dashboard in Google Looker Studio — summary cards, monthly value trend, procurement-type donut, monthly volume bars and vendor breakdowns',
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: '/images/projects/pln-dashboard-1.webp',
        alt: 'Dashboard overview with summary cards, a monthly procurement value trend, and breakdowns by procurement type, month and vendor',
        width: 1600,
        height: 900,
        caption: 'Overview — monthly trend and breakdowns',
      },
      {
        src: '/images/projects/pln-dashboard-2.webp',
        alt: 'Recapitulation for 2025 showing cumulative procurement value rising to Rp11.65B across the year',
        width: 1600,
        height: 900,
        caption: '2025 recapitulation — cumulative value',
      },
      {
        src: '/images/projects/pln-dashboard-3.webp',
        alt: 'Recapitulation for 2024 showing 366 procurement records, four vendors and Rp18.58B in total value across twelve months',
        width: 1600,
        height: 900,
        caption: '2024 recapitulation — 366 records, Rp18.58B',
      },
      {
        src: '/images/projects/pln-dashboard-4.webp',
        alt: 'Annual summary comparing 2024 and 2025 procurement value, with monthly volume and type composition',
        width: 1600,
        height: 900,
        caption: 'Annual summary — 2024 against 2025',
      },
      {
        src: '/images/projects/pln-dashboard-5.webp',
        alt: 'Procurement vendor summary table ranking four vendors by total work orders and value, led by PT Maju Jaya',
        width: 1600,
        height: 900,
        caption: 'Vendor summary — ranked by total value',
      },
    ],
    /*
      LINK — the direct Looker Studio URL, verified 200.

      This replaced a bit.ly shortener that already resolved to the same report.
      A shortener adds a third party between the visitor and the dashboard (and
      its own failure mode: an expired or rate-limited link), for no benefit on a
      site that renders the full URL nowhere. The report is publicly viewable at
      the address below.
    */
    link: {
      label: 'Open the dashboard',
      href: 'https://datastudio.google.com/reporting/fa9a8329-2d0e-494f-9ef8-3e8c4d9e15be',
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
    tools: ['IoT-based smart farming', 'Automatic irrigation system', 'ESP32 / ESP8266', 'Sensor integration', 'SIMPELDES', 'Renewable energy', 'Scientific writing'],
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
    linkPending: 'Open the SIMPELDES village system',
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
    tools: ['K-Nearest Neighbors', 'Python', 'Confusion matrix', 'Model evaluation', 'Classification', 'Academic writing'],
    visual: {
      /*
        The paper's OWN first page — its header carries the volume, issue, pages
        and ISSN, so the image is evidence of the record rather than decoration.
        (An earlier version pointed at the issue COVER, which identifies the issue
        but not the article.)
      */
      src: '/images/publications/ijirse-article-knn.webp',
      alt: 'First page of the KNN creditworthiness paper, headed IJIRSE Vol. 4 No. 1, Maret 2024, pp. 40–46',
      fit: 'contain',
      width: 1194,
      height: 1686,
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
    tools: ['Naive Bayes', 'Python', 'Sentiment analysis', 'Text preprocessing', 'Train–test split', 'Academic writing'],
    visual: {
      src: '/images/publications/ijirse-article-nb.webp',
      alt: 'First page of the iPusnas sentiment analysis paper, headed IJIRSE Vol. 5 No. 1, Maret 2025, pp. 12–19',
      fit: 'contain',
      width: 1194,
      height: 1686,
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
    tools: ['Figma', 'UI/UX design', 'Wireframing', 'Prototyping', 'Augmented Reality concept'],
    visual: {
      src: '/images/projects/guzelev-home.webp',
      alt: 'Guzelev home screen showing saved interior projects with progress states and room visualisation shortcuts',
      width: 1000,
      height: 2049,
    },
    /*
      FOUR SCREENS, ONE PER STAGE OF THE FLOW.

      The previous pair were two captures of the same product-browsing list, so
      the gallery showed the same screen twice. These four are distinct: entry,
      home, catalogue, and the augmented-reality viewer — the last of which is the
      only visual evidence on the site for the AR claim in the description, so it
      earns its place rather than padding the set.

      The hero `visual` above is also the first gallery entry; the detail page
      filters that one out so no screen is shown twice on the same page.
    */
    gallery: [
      {
        src: '/images/projects/guzelev-welcome.webp',
        alt: 'Guzelev welcome screen with the app name and sign-in options',
        width: 1000,
        height: 2049,
        caption: 'Welcome screen',
      },
      {
        src: '/images/projects/guzelev-home.webp',
        alt: 'Guzelev home screen showing saved interior projects and room visualisation shortcuts',
        width: 1000,
        height: 2049,
        caption: 'Home — saved projects',
      },
      {
        src: '/images/projects/guzelev-shop.webp',
        alt: 'Guzelev shop screen listing furniture by room with prices in rupiah',
        width: 1000,
        height: 2049,
        caption: 'Shop — furniture catalogue',
      },
      {
        src: '/images/projects/guzelev-ar.webp',
        alt: 'Guzelev AR view placing a lamp inside a photographed room, with colour options to choose from',
        width: 1000,
        height: 2049,
        caption: 'AR view — colour selection',
      },
    ],
    link: {
      label: 'View prototype',
      href: 'https://www.figma.com/proto/TdaI4t3acPhu1JsKx5vw8y/Projek-Akhir-Guzelev?node-id=115-92&t=YGus7S8cKDWkV1OR-1&scaling=scale-down&page-id=115%3A88&starting-point-node-id=115%3A92&show-proto-sidebar=1',
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
    tools: ['Figma', 'Canva', 'UI/UX design', 'User flow', 'Prototyping', 'Accessibility'],
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
    tools: ['Figma', 'UI/UX design', 'Design system', 'Responsive design', 'Role-based flows'],
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
/**
 * Grid order — chosen so the FIRST FEW CARDS ARE NOT ALL THE SAME KIND.
 *
 * The previous sort was "featured first, then newest". That put the marketing
 * data system at the head of the grid and then ran straight into the procurement
 * dashboard — two data/systems projects back to back — while the three UI/UX
 * case studies sat at the very bottom, which is the opposite of what a visitor
 * should meet first: the grid looked like one kind of work repeated.
 *
 * The rule now alternates by PRIMARY CATEGORY, so the opening row shows the
 * RANGE of the work rather than its most recent slice, and no category is buried
 * at the end. Within a category the newest still comes first, so nothing about
 * the relative importance of the entries changes — only the interleaving.
 *
 * Featured is no longer a leading sort key. It still exists and still drives the
 * homepage's selection, but in the full grid it is one signal among several and
 * letting it lead is what produced the clustering.
 */
export const projectsSorted = [...projectEntries].sort((a, b) => {
  // Newest first within a category.
  return b.sortKey.localeCompare(a.sortKey);
});

/**
 * The same set, re-ordered so consecutive cards differ in primary category.
 *
 * Implemented as a round-robin over per-category queues: take the newest
 * remaining project from the category with the most entries left, then the next
 * category, and so on. That keeps the output deterministic (no randomness) and
 * leaves the relative recency ordering intact inside each category.
 */
/**
 * Grid order for /projects.
 *
 * The order is EXPLICIT, not derived from dates or categories. It follows the
 * priority the work should be read in:
 *
 *   1. the dashboard    — the most complete case study (a real system, in use)
 *   2. the UI/UX set    — product design across three different products
 *   3. the BeautyLab system — the from-scratch build
 *   4. everything else  — the published research
 *
 * WHY NOT SORT BY DATE OR CATEGORY
 * Sorting by date put the newest first, which buried the UI/UX work entirely.
 * Grouping by category clustered three data/systems projects at the top, so the
 * opening row showed one kind of work repeated. This list is the honest answer:
 * a deliberate editorial order, stated as such rather than dressed up as an
 * algorithm. Anything not named here keeps its recency order at the end, so
 * ADDING a project does not require touching this function.
 */
const PRIORITY = [
  'procurement-dashboard',
  'guzelev',
  'wellmind',
  'kedai-nyam',
  'marketing-data-system',
];

export const projectsInterleaved = [
  // Named entries first, in the order above.
  ...PRIORITY.map((id) => projectEntries.find((p) => p.id === id)).filter(
    (p): p is (typeof projectEntries)[number] => Boolean(p),
  ),
  // Then everything else, newest first — including any project added later.
  ...projectsSorted.filter((p) => !PRIORITY.includes(p.id)),
];/**
 * The homepage's three selected projects.
 *
 * NOT simply "the newest three" and not simply every `featured` entry. Both of
 * those were all systems/data work — the marketing system, the procurement
 * dashboard and the smart-farming programme — which meant the homepage showed
 * one kind of project three times while the three UI/UX case studies never
 * appeared at all.
 *
 * The selection below is chosen to show the RANGE of the work: two data systems
 * and one published research programme. `featured` still marks which entries
 * have the depth for a large card; this list decides which of them the homepage
 * actually spends its image budget on.
 *
 * Order is deliberate, and it is the order the user asked for: the marketing
 * data system, then the procurement monitoring dashboard, then the smart-farming
 * programme. All three render server-side in the rail, so no ordering decision
 * here changes what is crawlable.
 */
export const featuredProjects = [
  'marketing-data-system',
  'procurement-dashboard',
  'smart-farming',
]
  .map((id) => projectEntries.find((p) => p.id === id))
  .filter((p): p is (typeof projectEntries)[number] => Boolean(p));
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
