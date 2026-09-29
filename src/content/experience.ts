/**
 * EXPERIENCE
 * ============================================================================
 * SOURCE: [P] = Profile.pdf, [D] = PORTOFOLIO HAMZAH (3).pdf
 *
 * Date policy (per the agreed priority rules):
 *   - [P] is authoritative for dates and current employment status.
 *   - [D] supplies descriptions and detail.
 *
 * The PT PLN entry uses [P]'s description, NOT the portfolio deck's — the deck
 * contains a copy-paste error there (its PLN body text is verbatim identical to
 * its JAIST editorial text) and says nothing about IT support.
 * ============================================================================
 */

import { experienceListSchema } from './schemas';
import type { ExperienceEntry } from '@/types/content';

const raw: ExperienceEntry[] = [
  {
    id: 'airnav',
    company: 'AirNav Indonesia',
    companyFull: 'Perum LPPNPI — AirNav Indonesia',
    role: 'Information Technology Administration Staff',
    dateRange: 'September 2026 – Present',
    // Far-future sort key keeps the current role pinned to the top.
    sortKey: '9999-09',
    location: 'Tangerang, Indonesia',
    current: true,
    // PROVISIONAL — provided and approved by you, to be updated later.
    summary:
      'Currently learning and supporting information technology activities within AirNav Indonesia. Learning how air navigation services operate from an information technology perspective, including understanding company systems, business processes, and IT operations. Also developing a web-based application project to support company performance.',
    highlights: [
      'Learning how air navigation services operate from an information technology perspective',
      'Building understanding of company systems, business processes and IT operations',
      'Developing a web-based application project to support company performance',
    ],
    tools: ['Web application development'],
    source: 'profile',
    todo:
      'Provisional description. Replace with specific responsibilities, systems and tools once confirmed.',
  },
  {
    id: 'jaist',
    company: 'JAIST',
    companyFull:
      'Journal of Advances in Information Systems and Technology (JAIST)',
    role: 'Editorial Staff',
    dateRange: 'January 2025 – Present',
    sortKey: '9999-01',
    location: 'Semarang, Indonesia',
    current: true,
    summary:
      'Editorial staff for a Sinta 4-accredited campus journal, responsible for checking that manuscripts meet format and eligibility requirements before publication, and supporting the editorial process from initial review through to publication.',
    highlights: [
      'Checked manuscript format compliance and article eligibility before publication',
      'Supported the editorial process from initial review through to publication',
      'Coordinated with authors, reviewers and editors to keep the publication flow on track',
    ],
    source: 'portfolio',
    todo:
      'Role start month is from the portfolio deck; the profile export does not list this role. Confirm whether the role is still active.',
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
    tools: ['Google Sheets', 'JavaScript'],
    source: 'both',
  },
  {
    id: 'pln',
    company: 'PT PLN (Persero)',
    companyFull: 'PT PLN (Persero) Pusharlis — Unit Pelaksana Produksi dan Workshop (UP2W) I',
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
    source: 'both',
  },
  {
    id: 'gurumengajar',
    company: 'GuruMengajar.id',
    role: 'Freelance Admin',
    // [D] gives only month and year.
    dateRange: 'February 2024',
    sortKey: '2024-02',
    location: 'Indonesia',
    summary:
      'Supported the day-to-day operation of the platform by managing customer communication, payment transactions and administrative documentation.',
    highlights: [
      'Handled customer chat and responded quickly to questions and complaints',
      'Managed transaction data to keep information accurate and detailed',
    ],
    source: 'portfolio',
    todo: 'Only month and year are documented; no end date is given.',
  },
];

/**
 * Parsed through the schema at load time. If any required field is missing or
 * malformed, the build fails here with the offending field named.
 */
export const experienceEntries: ExperienceEntry[] =
  experienceListSchema.parse(raw);

/** Newest first. */
export const experienceSorted = [...experienceEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);

/** Only the currently-held roles. */
export const currentExperience = experienceSorted.filter((e) => e.current);
