/**
 * PROFILE CONTENT
 * ============================================================================
 * Every fact here is traceable to one of the two source documents:
 *   [P] = Profile.pdf (LinkedIn export) — authoritative for identity + dates
 *   [D] = PORTOFOLIO HAMZAH (3).pdf (portfolio deck) — authoritative for
 *         descriptions, skills, projects, certifications, publications
 *
 * Nothing in this file is invented. Where a fact is genuinely unknown it is
 * marked with a TODO and rendered as a visible placeholder rather than filled
 * with a guess.
 * ============================================================================
 */

import { profileSchema } from './schemas';
import type { ContactLink } from '@/types/content';

/**
 * Whether the phone number is shown anywhere on the site.
 *
 * The number comes from [D]; [P] masks it. Flip this to `true` to surface it —
 * no component changes required. Default is `false` because the brief asked for
 * it to be easy to enable and never visually dominant.
 */
export const CONTACT_PHONE_ENABLED = false;

export interface Profile {
  name: string;
  shortName: string;
  /** Monogram used in the header mark. */
  initials: string;
  /** One-line professional identity, from [P]'s headline. */
  headline: string;
  /** Supporting positioning lines. */
  positioning: string[];
  /** Current city/region. [P] says "Indonesia"; the current role is Tangerang. */
  location: string;
  /** Current-status line shown in the hero. */
  currentStatus: string;
  currentRole: string;
  /** About narrative — one paragraph per array entry. */
  summary: string[];
  /** Short labels for what the work centres on. */
  focusAreas: string[];
  contactLinks: ContactLink[];
  email: string;
  /** Tagline from [D]'s closing slide. */
  tagline: string;
}

const rawProfile: Profile = {
  name: 'Hamzah Naufal Zuhdi',
  shortName: 'Hamzah Naufal',
  initials: 'HNZ',

  // [P] headline
  headline: 'Information Technology Administration Staff at AirNav Indonesia',

  // [P] headline sub-line + [D] cover page
  positioning: ['Information Systems Graduate', 'Data & Technology Enthusiast'],

  location: 'Tangerang, Indonesia',

  // [P] current employment
  currentStatus: 'Currently at AirNav Indonesia',
  currentRole: 'Information Technology Administration Staff',

  /**
   * About narrative. Derived from [P]'s summary and [D]'s "About Me" and cover
   * text, tightened into three paragraphs. No claim here goes beyond what those
   * two documents state.
   */
  summary: [
    'I am an Information Systems graduate from Universitas Negeri Semarang, currently working as Information Technology Administration Staff at AirNav Indonesia, where I am learning how air navigation services operate from an information technology perspective — the systems, the business processes and day-to-day IT operations.',
    'My work centres on turning raw data into something usable: analysing it, building dashboards and integrated data systems, and mapping the business processes around them so the result actually fits how a team works. I have built a marketing data system from scratch, developed a procurement monitoring dashboard, and published research applying machine learning methods to real evaluation problems.',
    'Alongside the technical side, coordinating events and leading teams has shaped how I communicate, plan and make decisions across different functions. I am drawn to problems where data, process and technology meet, and I am continuing to build depth in data analytics, business intelligence and process improvement.',
  ],

  /** Labels for the work areas shown in the hero and About section. */
  focusAreas: [
    'Data & Analytics',
    'Technology & Systems',
    'Business Process',
    'Digital Solutions',
    'UI/UX & Product Thinking',
    'Research & Publications',
  ],

  email: 'naufalhamzahhh05@gmail.com',

  // [D] closing slide
  tagline: 'Learning never stops — every project is a chance to grow.',

  contactLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/hamzahnaufal',
      external: true,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/hamz_nz',
      external: true,
    },
    {
      label: 'Email',
      href: 'mailto:naufalhamzahhh05@gmail.com',
    },
    {
      // Hidden unless CONTACT_PHONE_ENABLED is switched on. Source: [D].
      // The brief requires this number never appear in rendered HTML by default.
      label: 'Phone',
      href: 'tel:+6289653051681',
      enabled: CONTACT_PHONE_ENABLED,
    },
  ],
};

/** Validated at load time — a missing required field fails the build here. */
export const profile: Profile = profileSchema.parse(rawProfile);

/**
 * Contact links with disabled entries removed.
 * Components must use THIS, not `profile.contactLinks`, so a disabled entry can
 * never leak into rendered HTML.
 */
export const activeContactLinks: ContactLink[] = profile.contactLinks.filter(
  (link) => link.enabled !== false,
);
