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
  /**
   * One-line professional identity, from [P]'s headline.
   * Set in accent italic directly under the name — the primary claim.
   */
  headline: string;
  /** Short positioning tags shown under the name. */
  positioning: string[];
  /**
   * The small eyebrow word above the name, in the hero. Content, not chrome —
   * which is why it lives here rather than being typed into the component.
   */
  displayWord: string;
  location: string;
  /**
   * The quiet status line at the FOOT of the hero, paired with `location`.
   *
   * It must NOT repeat `headline`. It used to hold the identical string, so the
   * hero printed "Information Systems Graduate" twice within one screen — once as
   * the accent role line, once in the bottom-right rule — which reads as a
   * copy-paste slip, not as emphasis. What belongs here is the record fact the
   * hero does not otherwise carry.
   */
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
  /*
    The hero's bottom-right rule. It carries the record fact the hero does not
    otherwise state — the degree and where it is from — instead of repeating
    `headline` verbatim, which it did before.
  */
  currentStatus: "Bachelor's Degree, Information Systems",
  /** Shown on the Experience page only — never as the site's identity. */
  currentRole: 'Information Technology Administration  at AirNav Indonesia',

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

  /*
    Tagline — the line the footer signs off with.

    This replaces "Learning never stops — every project is a chance to grow."
    That was true but generic: it could sit under any name on any portfolio and
    say nothing about this one. The replacement is anchored to what the record
    actually shows — systems built, questions asked, things measured — so it
    reads as a description of the work rather than a slogan about it.
  */
  tagline: 'I build the system, then keep asking what it should measure.',

  /**
   * The hero portrait — `Foto Cover 1.png`, cropped and optimised by the asset
   * pipeline.
   *
   * THIS FILE HAS NO BACKDROP. It is a cut-out: roughly 67% of its pixels are
   * fully transparent, so the hero renders it as a silhouette standing in the
   * page (drop-shadow following the alpha shape, a soft pool behind it) rather
   * than a pasted rectangle. An earlier revision gave it a border and a shadow
   * box, which drew a visible rectangle around a person who has none — that is
   * what makes a cut-out read as "stuck on", and it is worth not regressing.
   *
   * CROPPED to a head-to-chest 3:4, measured from the subject's actual extent
   * rather than estimated (x 547..2591, y 963..4687 of 3125x4688). Three details
   * that were wrong before and must not regress:
   *   · the crop leaves ~37px of headroom above the crown. An earlier pass cut
   *     111px off the top of the head, which reads as a mistake at hero size;
   *   · the width (0.7242) is the NARROWEST that still contains the whole figure.
   *     The subject spans 0.6544 of the frame, so a tighter crop sliced the arms
   *     off at the edge — a 0.55 attempt cut 296px;
   *   · the bottom edge falls below the sash's medal, so the whole sash stays in
   *     frame instead of being sliced mid-way.
   *
   * The uncropped original is still produced as `/images/hero/portrait-full.webp`.
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
