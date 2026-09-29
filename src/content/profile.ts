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
 *
 * STAGE 1 SCOPE: this module only holds what the global shell (header, footer,
 * meta tags) needs. The full content layer — experience, projects,
 * publications, certifications, achievements, education, skills — is built in
 * Stage 2.
 * ============================================================================
 */

import type { ContactLink } from '@/types/content';

/**
 * Whether the phone number is shown anywhere on the site.
 *
 * The number comes from [D] (+62 896-5305-1681). [P] masks it. Flip this to
 * `true` to surface it — no component changes required. Default is off because
 * the brief asked for it to be easy to enable and not visually dominant.
 */
export const CONTACT_PHONE_ENABLED = false;

export interface Profile {
  name: string;
  shortName: string;
  /** Monogram used in the header mark. */
  initials: string;
  /** One-line professional identity, from [P]'s headline. [P] */
  headline: string;
  /** Supporting positioning lines. [P] */
  positioning: string[];
  /** Current city/region. [P] gives "Indonesia"; the current role is Tangerang. */
  location: string;
  /** Availability / current-status line shown in the hero. [P] */
  currentStatus: string;
  /** Where the person is right now, shown as a status pill. [P] */
  currentRole: string;
  contactLinks: ContactLink[];
  email: string;
  /** Optional tagline. [D] closing slide. */
  tagline: string;
}

export const profile: Profile = {
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
      // Hidden unless CONTACT_PHONE_ENABLED is switched on. Source: [D]
      label: 'Phone',
      href: 'tel:+6289653051681',
      enabled: CONTACT_PHONE_ENABLED,
    },
  ],
};

/** Contact links with disabled entries removed — what components should use. */
export const activeContactLinks: ContactLink[] = profile.contactLinks.filter(
  (link) => link.enabled !== false,
);
