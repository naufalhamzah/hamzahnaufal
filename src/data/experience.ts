/**
 * SOURCE: [P] = Profile.pdf, [D] = PORTOFOLIO HAMZAH (3).pdf
 * [P] is authoritative for dates and current employment status; [D] supplies
 * descriptions and detail.
 *
 * The PT PLN entry uses [P]'s description, NOT the deck's — the deck's PLN body
 * text is verbatim identical to its JAIST editorial text (a copy-paste error) and
 * says nothing about IT support.
 *
 * TO ADD A ROLE: append one object. Set `current: true` to pin it to the top
 * with the "Current" marker.
 */

import { experienceListSchema } from './schemas';
import type { ExperienceEntry } from '@/types/content';

const raw: ExperienceEntry[] = [
  {
    id: 'airnav',
    company: 'AirNav Indonesia',
    companyFull: 'Perum LPPNPI — AirNav Indonesia',
    /*
      INTERNSHIP, not a permanent post — the brief is explicit that this must not
      read as employment, so the label says "Intern" and the description stays
      within "learning / supporting / developing a project". This role is also
      deliberately NOT the site's identity (the hero leads with "Information
      Systems Graduate"); AirNav appears only here.
    */
    role: 'Information Technology Administration Staff Intern',
    dateRange: 'September 2026 – Present',
    // Far-future sort key keeps the current role pinned to the top.
    sortKey: '9999-09',
    location: 'Tangerang, Indonesia',
    current: true,
    // PROVISIONAL — supplied by Hamzah, to be expanded later.
    summary:
      'Learning how air navigation services operate from an information technology perspective, and supporting IT-related activity within the organisation. Building understanding of company systems, business processes and day-to-day IT operations, while developing a web-based application project intended to support company performance.',
    highlights: [
      'Learning how air navigation services operate from an information technology perspective',
      'Building understanding of company systems, business processes and day-to-day IT operations',
      'Supporting IT-related activities within the organisation',
      'Developing a web-based application project to support company performance',
    ],
    tools: ['Web application development'],
    logo: {
      src: '/images/logos/airnav.webp',
      /*
        The vector twin. `src` is the raster fallback the pipeline writes from this
        SVG; the site renders the SVG wherever it can. Both files come from
        `scripts/airnav-logo.py` + `npm run assets`.
      */
      srcVector: '/images/logos/airnav.svg',
      alt: 'AirNav Indonesia logo',
      /*
        The VECTOR's own size — a square 352-unit viewBox. The previous 357x354 was
        the raster's size and would have reserved a 1:1 box 1.4% wider than the
        artwork; the trace made the mark exactly round.
      */
      width: 352,
      height: 352,
    },
    /*
      ONE photograph, unambiguously AirNav: the onboarding session has the AirNav
      Indonesia screen in frame. The campus-and-control-tower shot was removed at
      the user's request. More photographs are expected later — this array takes
      any count, and the strip beside the entry adapts.
    */
    photos: [
      {
        src: '/images/experience/airnav-onboarding.webp',
        alt: 'AirNav Indonesia onboarding session, with the AirNav Indonesia screen visible behind the group',
        width: 1800,
        caption: 'Onboarding session at AirNav Indonesia',
      },
    ],
    source: 'profile',
  },
  {
    id: 'jaist',
    company: 'JAIST',
    companyFull:
      'Journal of Advances in Information Systems and Technology (JAIST)',
    role: 'Editorial Staff',
    /*
      End date CONFIRMED by the user: January 2025 to June 2026. The deck said
      "Januari 2025 - Sekarang", which is why this previously read as ongoing with
      a `9999-01` sentinel sortKey; the real end month removes both.
    */
    dateRange: 'January 2025 – June 2026',
    sortKey: '2025-01',
    location: 'Semarang, Indonesia',
    current: false,
    summary:
      'Editorial staff for a Sinta 4-accredited campus journal, responsible for checking that manuscripts meet format and eligibility requirements before publication, and supporting the editorial process from initial review through to publication.',
    highlights: [
      'Checked manuscript format compliance and article eligibility before publication',
      'Supported the editorial process from initial review through to publication',
      'Coordinated with authors, reviewers and editors to keep the publication flow on track',
    ],
    /*
      TOOLS: DERIVED, not stated. The deck describes this role's responsibilities
      but never names its tools, so this list is assembled from tools the SAME deck
      documents as skills (its Office & Documentation and Collaboration slides) and
      restricted to the ones an editorial review workflow actually uses. Every
      entry appears in the source; the LINK between tool and role is inferred,
      which is why this comment exists. Kept short on purpose — padding it would
      wrongly imply Excel and PowerPoint reporting.
    */
    tools: [
      'Google Docs',
      'Microsoft Word',
      'Google Drive',
      'Manuscript review',
      'Scientific writing',
    ],
    logo: {
      src: '/images/logos/jaist.webp',
      alt: 'JAIST journal logo',
      width: 1400,
      height: 238,
    },
    photos: [
      {
        src: '/images/experience/jaist-page.webp',
        alt: 'The JAIST journal website showing published articles',
        width: 1200,
        caption: 'JAIST journal',
      },
    ],
    source: 'portfolio',
    /*
      SOURCING NOTE: the start month comes from the portfolio deck, while the
      profile export does not list this role at all. The two supplied documents
      disagree on the role's existence, so whoever edits next should know which
      source produced the start month.
    */
  },
  {
    id: 'beauty-innovation',
    company: 'Beauty Innovation Laboratories',
    role: 'Data & Marketing',
    dateRange: 'October 2025 – February 2026',
    sortKey: '2025-10',
    location: 'Kota Semarang, Jawa Tengah, Indonesia',
    summary:
      'Marketing & Data Intern responsible for both customer relationship management and internal data system development. Handled customer communications, followed up with existing clients, reached out to prospective brands and new customers, and supported negotiations through to deal closures.',
    highlights: [
      'Built the marketing data management system from the ground up using Google Sheets and JavaScript',
      'Designed a structured workflow tracking customer information, sales pipeline progress and follow-up status',
      'Automated data integration across related tables so business data was recorded accurately and accessible in real time',
      'Completed the system in less than one month, aligned with the company’s operational needs',
      'Ensured the system’s sustainability — implementation, adaptation and day-to-day use — as the person with the deepest understanding of its workflow and structure',
    ],
    tools: ['Google Sheets', 'JavaScript', 'Marketing data management'],
    logo: {
      src: '/images/logos/beauty-lab.webp',
      alt: 'Beauty Innovation Laboratories logo',
      width: 1200,
      height: 246,
    },
    /*
      NO PHOTOGRAPHS YET, on the user's instruction: "untuk di bagian pengalaman
      tidak pakai foto saja (akan ditambahkan suatu saat nanti)". Left EMPTY rather
      than filled with a stand-in. The system screenshot that used to sit here now
      serves as the marketing project's own cover and gallery, where it is read at
      full width. The component renders without a photo strip; dropping photos back
      in later is an edit to this array alone.
    */
    photos: [],
    source: 'both',
  },
  {
    id: 'pln',
    company: 'PT PLN (Persero) PUSHARLIS UP2W I',
    companyFull:
      'PT PLN (Persero) Pusharlis — Unit Pelaksana Produksi dan Workshop (UP2W) I',
    role: 'IT Support',
    dateRange: 'February 2025 – July 2025',
    sortKey: '2025-02',
    location: 'Cilegon, Banten, Indonesia',
    summary:
      'IT Support Engineering intern working across digital solution development, data management and technical support. Main project was an interactive dashboard to monitor the procurement process.',
    highlights: [
      'Developed an interactive dashboard using Google Looker Studio to monitor the procurement process, improving data readability and accelerating analysis',
      'Processed, validated and visualised company data to meet operational standards for use across departments',
      'Created a business process flowchart for the production division, mapping the workflow in detail to support coordination',
      'Supported IT infrastructure: hardware and software troubleshooting, internal system maintenance, and technology assistance to staff',
    ],
    tools: ['Google Looker Studio', 'Business process flowcharting'],
    logo: {
      src: '/images/logos/pln-pusharlis.webp',
      alt: 'PT PLN (Persero) Pusharlis logo',
      width: 1200,
      height: 369,
    },
    photos: [
      {
        src: '/images/experience/pln-work.webp',
        alt: 'A meeting room at PT PLN (Persero) Pusharlis with staff seated around a table and a laptop open',
        width: 1400,
        caption: 'Working session at PLN Pusharlis',
      },
    ],
    source: 'both',
  },
];

/** Parsed through the schema at load time; a missing field fails the build here. */
export const experienceEntries: ExperienceEntry[] =
  experienceListSchema.parse(raw);

/** Newest first, with current roles pinned above everything. */
export const experienceSorted = [...experienceEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);

export const currentExperience = experienceSorted.filter((e) => e.current);

/** Only roles that carry employer logos — used for the "worked with" strip. */
export const experienceLogos = experienceSorted.filter((e) => e.logo);
