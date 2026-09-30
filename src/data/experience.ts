/**
 * EXPERIENCE
 * ============================================================================
 * SOURCE: [P] = Profile.pdf, [D] = PORTOFOLIO HAMZAH (3).pdf
 *
 * Date policy: [P] is authoritative for dates and current employment status.
 * [D] supplies descriptions and detail.
 *
 * The PT PLN entry uses [P]'s description, NOT the deck's — the deck contains a
 * copy-paste error there (its PLN body text is verbatim identical to its JAIST
 * editorial text) and says nothing about IT support.
 *
 * TO ADD A ROLE: append one object. Set `current: true` to pin it to the top
 * with the "Current" marker.
 * ============================================================================
 */

import { experienceListSchema } from './schemas';
import type { ExperienceEntry } from '@/types/content';

const raw: ExperienceEntry[] = [
  {
    id: 'airnav',
    company: 'AirNav Indonesia',
    companyFull: 'Perum LPPNPI — AirNav Indonesia',
    /**
     * INTERNSHIP, not a permanent post. The brief is explicit that this must
     * not read as employment, so the label says "Intern" and the description
     * stays within "learning / supporting / developing a project".
     *
     * NOTE: this role is deliberately NOT the site's identity — the hero and
     * About lead with "Information Systems Graduate". AirNav appears only here.
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
      alt: 'AirNav Indonesia logo',
      width: 447,
      height: 447,
    },
    /**
     * Both images are UNAMBIGUOUSLY AirNav: the onboarding session has the
     * AirNav screen in frame, and the second is the AirNav campus with its
     * control tower. Nothing here is an assumed attribution.
     */
    photos: [
      {
        src: '/images/experience/airnav-onboarding.webp',
        alt: 'AirNav Indonesia onboarding session, with the AirNav Indonesia screen visible behind the group',
        width: 1800,
        caption: 'Onboarding session at AirNav Indonesia',
      },
      {
        src: '/images/experience/airnav-building.webp',
        alt: 'The AirNav Indonesia campus and control tower in Tangerang',
        width: 1200,
        caption: 'AirNav Indonesia campus, Tangerang',
      },
    ],
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
    /*
      End date CONFIRMED by the user: the role ran January 2025 to June 2026.

      The deck said "Januari 2025 - Sekarang", which is why this previously read
      as ongoing with `sortKey: 9999-01` — a sentinel that sorts a current role to
      the top. With a real end month the sentinel is gone and the entry sorts by
      its actual dates, so it no longer claims to be current work.
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
      TOOLS: DERIVED, not stated.

      The deck describes this role's responsibilities but never names the tools
      it was performed with, so this list is assembled from tools the SAME deck
      documents as skills (its Office & Documentation and Collaboration slides:
      Microsoft Word, Google Docs, Google Drive, technical and scientific
      writing) and restricted to the ones an editorial review workflow actually
      uses. Nothing here is invented — every entry appears in the source — but
      the LINK between tool and role is inferred rather than quoted, which is why
      this comment exists.

      Kept deliberately short. Padding it with every office tool on the skills
      slide would imply the role involved Excel and PowerPoint reporting, which
      nothing suggests.
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
      height: 221,
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
      The TODO that used to sit here ("confirm whether the role is still active")
      is resolved: the end date came from the user directly. The remaining note is
      only that the START month comes from the deck, because the profile export
      does not list this role at all — worth keeping visible so nobody later
      assumes both dates came from the same source.
    */
    todo:
      'Start month is from the portfolio deck; the profile export does not list this role. End date confirmed by the author.',
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
    logo: {
      src: '/images/logos/beauty-lab.webp',
      alt: 'Beauty Innovation Laboratories logo',
      width: 1200,
      height: 242,
    },
    photos: [
      {
        /*
          The ACTUAL system, not the building.

          This slot previously held a photograph of an office building captioned
          "Beauty Innovation Laboratories". Nothing in that frame showed any
          signage or name, so the caption asserted a link the picture could not
          support. The deck does attribute this spreadsheet to BeautyLab, and
          this entry already describes building it — so this image is both
          relevant and provable, while the building shot was neither.
        */
        src: '/images/about/beautylab-system.webp',
        alt: 'The Beauty Innovation Laboratories customer data spreadsheet, listing brand, product, sample value, payment status and PIC columns',
        width: 1400,
        height: 788,
        caption: 'Customer data management system',
      },
    ],
    source: 'both',
  },
  {
    id: 'pln',
    company: 'PT PLN (Persero)',
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
      height: 361,
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

/**
 * Parsed through the schema at load time. If any required field is missing or
 * malformed, the build fails here with the offending field named.
 */
export const experienceEntries: ExperienceEntry[] =
  experienceListSchema.parse(raw);

/** Newest first, with current roles pinned above everything. */
export const experienceSorted = [...experienceEntries].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);

export const currentExperience = experienceSorted.filter((e) => e.current);

/** Only roles that carry employer logos — used for the "worked with" strip. */
export const experienceLogos = experienceSorted.filter((e) => e.logo);
