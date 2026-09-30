/**
 * PROFILE
 * ============================================================================
 * Every fact is traceable to one of the two source documents:
 *   [P] = Profile.pdf (LinkedIn export)     — identity + dates
 *   [D] = PORTOFOLIO HAMZAH (3).pdf (deck)  — descriptions, skills, projects
 *
 * Where a fact is genuinely unknown it is marked with a TODO rather than
 * guessed. Nothing here is invented.
 * ============================================================================
 */

import { profileSchema } from './schemas';
import type { ContactLink, MediaAsset } from '@/types/content';

/**
 * Whether the phone number appears anywhere on the site.
 *
 * The number comes from [D]; [P] masks it. Flip to `true` to surface it —
 * no component changes required. Default `false` per the brief: never publish
 * a phone number publicly.
 */
export const CONTACT_PHONE_ENABLED = false;

export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  /** One-line professional identity, from [P]'s headline. */
  headline: string;
  /** Short positioning tags shown under the name. */
  positioning: string[];
  /** The phrase set in very large display type in the hero. */
  displayWord: string;
  location: string;
  currentStatus: string;
  currentRole: string;
  /** About narrative — one paragraph per array entry. */
  summary: string[];
  /** Short labels for what the work centres on. */
  focusAreas: string[];
  contactLinks: ContactLink[];
  email: string;
  tagline: string;
  /** Hero portrait — a real photograph against a black backdrop. */
  portrait: Required<Pick<MediaAsset, 'src' | 'alt' | 'width' | 'height'>>;
}

const rawProfile: Profile = {
  name: 'Hamzah Naufal Zuhdi',
  shortName: 'Hamzah Naufal',
  initials: 'HNZ',

  /**
   * PRIMARY IDENTITY.
   * The brief is explicit: the site must lead with "Information Systems
   * Graduate", NOT with an employer. AirNav appears only inside Experience.
   */
  headline: 'Information Systems Graduate',

  positioning: ['Data', 'Technology', 'Business Process', 'Digital Solutions'],

  /**
   * The hero's large display word. Names the discipline rather than making a
   * claim about it — factual and suited to the oversized serif treatment.
   */
  displayWord: 'Portfolio',

  location: 'Tangerang, Indonesia',
  currentStatus: 'Information Systems Graduate',
  /** Shown on the Experience page only — never as the site's identity. */
  currentRole: 'Information Technology Administration Staff Intern',

  /**
   * About narrative. Rewritten for this pass: shorter sentences, concrete
   * verbs, no generic self-praise ("passionate", "results-driven"). Every
   * claim still traces to [P] or [D].
   */
  summary: [
    'I am an Information Systems graduate from Universitas Negeri Semarang. My work sits where data, business process and technology meet: analysing how something currently works, then building the system or dashboard that makes it work better.',
    'In practice that has meant building a marketing data management system from scratch, developing a procurement monitoring dashboard for PT PLN (Persero), and publishing research that applies machine learning to real evaluation problems. Each project started with the same question — what decision is this supposed to support?',
    'I am currently at AirNav Indonesia as an Information Technology Administration Staff Intern, learning how air navigation services operate from an IT perspective: the systems, the business processes and day-to-day operations behind them.',
  ],

  focusAreas: [
    'Data & Analytics',
    'Information Systems',
    'Business Process',
    'Digital Solutions',
    'UI/UX & Product Thinking',
    'Research & Publications',
  ],

  email: 'naufalhamzahhh05@gmail.com',

  // [D] closing slide
  tagline: 'Learning never stops — every project is a chance to grow.',

  /**
   * The hero portrait. A real photograph taken for the portfolio (originally
   * `Foto Cover.png`), shot against a black backdrop — which is what makes the
   * dark editorial hero treatment work.
   *
   * CROPPED to a head-to-chest 3:4 by the asset pipeline, measured from the
   * subject's actual extent. The supplied frame is full-length, so at hero size
   * the face became a small figure on a large empty field.
   *
   * NOTE the file has NO BACKDROP — it is a cut-out with roughly 40% of its
   * pixels fully transparent, so the hero renders it as a silhouette in the page
   * (drop-shadow, soft pool) rather than a pasted rectangle. The uncropped
   * original is still produced as `/images/hero/portrait-full.webp`.
   */
  portrait: {
    src: '/images/hero/portrait.webp',
    alt: 'Portrait of Hamzah Naufal Zuhdi, wearing a graduation sash',
    width: 1400,
    height: 1866,
  },

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
 * Components must use THIS, not `profile.contactLinks`, so a disabled entry
 * can never leak into rendered HTML.
 */
export const activeContactLinks: ContactLink[] = profile.contactLinks.filter(
  (link) => link.enabled !== false,
);
