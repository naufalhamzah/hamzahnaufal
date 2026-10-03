/**
 * NAVIGATION — the single source of truth for the site's information
 * architecture.
 * ============================================================================
 * Two levels, deliberately: the HOMEPAGE is a curated INTRODUCTION (preview
 * sections + CTAs); the PAGES hold the full INFORMATION.
 *
 * WHY `primary` EXISTS: the brief asked for navigation that is not cramped.
 * Nine destinations in one flat row makes a bar feel full, so the primary row
 * carries only the pages a visitor needs first; the rest live under "More". The
 * grouping lives HERE, not in the navbar, so the bar, the mobile panel and the
 * footer all follow the same decision.
 */

import { withBase, stripBase } from './url';

export interface NavPage {
  /** Route path, e.g. '/projects'. */
  href: string;
  /** Full label, used in the mobile panel, footer and breadcrumbs. */
  label: string;
  /** Compact label for the desktop bar where space is tighter. */
  short?: string;
  /** One-line description, shown in the mobile panel and the "More" menu. */
  blurb?: string;
  /** In the desktop bar's primary row rather than under "More". */
  primary?: boolean;
  /** Kept out of navigation entirely but still routable. */
  hidden?: boolean;
}

/** A homepage anchor target. */
export interface HomeSection {
  id: string;
  label: string;
}

/**
 * Order defines the desktop bar, the mobile panel and the footer.
 *
 * PRIMARY ROW  About · Projects · Experience · Skills  (+ More + CTA)
 * MORE MENU    My Journal · Publications · Certifications · Achievements · Gallery
 *
 * My Journal sits FIRST under "More": it is the only entry there that is a living
 * record rather than a finished credential, so it is the most likely to have
 * changed since a reader last visited.
 */
const ALL_PAGES: NavPage[] = [
  {
    href: withBase('/about'),
    label: 'About',
    blurb: 'Background, focus areas and how I work',
    primary: true,
  },
  {
    href: withBase('/projects'),
    label: 'Projects',
    blurb: 'Systems, dashboards and research work',
    primary: true,
  },
  {
    href: withBase('/experience'),
    label: 'Experience',
    blurb: 'Professional and organisational experience',
    primary: true,
  },
  {
    href: withBase('/skills'),
    label: 'Skills',
    blurb: 'Tools and methods I work with',
    primary: true,
  },
  {
    href: withBase('/journal'),
    label: 'My Journal',
    short: 'Journal',
    blurb: 'Dated record from my internship at AirNav Indonesia',
  },
  {
    href: withBase('/publications'),
    label: 'Publications',
    blurb: 'Peer-reviewed research and articles',
  },
  {
    href: withBase('/certifications'),
    label: 'Certifications',
    blurb: 'Courses, credentials and programme certificates',
  },
  {
    href: withBase('/achievements'),
    label: 'Achievements',
    blurb: 'Awards, competitions and programme funding',
  },
  {
    href: withBase('/gallery'),
    label: 'Gallery',
    blurb: 'Selected moments from activities and events',
  },
  {
    href: withBase('/contact'),
    label: 'Contact',
    blurb: 'Get in touch',
    hidden: true, // rendered as the navbar CTA instead of a nav link
  },
];

/** Pages that appear in navigation (every route except /contact). */
export const navPages: NavPage[] = ALL_PAGES.filter((p) => !p.hidden);

/** The desktop bar's main row. */
export const primaryNav: NavPage[] = navPages.filter((p) => p.primary);

/** Everything not in the main row — under "More" on desktop, inline elsewhere. */
export const secondaryNav: NavPage[] = navPages.filter((p) => !p.primary);

/** Homepage preview sections in composition order (src/pages/index.astro);
 *  drives the hero's jump row. */
export const homeSections: HomeSection[] = [
  { id: 'about-preview', label: 'About' },
  { id: 'featured', label: 'Selected Work' },
  { id: 'experience-preview', label: 'Experience' },
  { id: 'skills-preview', label: 'Skills' },
  { id: 'contact-preview', label: 'Contact' },
];

/**
 * Which nav entry is "current" for a pathname. Exact match first, then a prefix
 * match, so /projects/marketing-data-system still highlights /projects.
 */
export function activePageFor(pathname: string): NavPage | undefined {
  /* `Astro.url.pathname` carries the deploy base — strip it before matching, or
     no nav item is ever marked current. */
  const clean = stripBase(pathname).replace(/\/+$/, '') || '/';
  const exact = navPages.find((p) => p.href === clean);
  if (exact) return exact;
  return navPages.find((p) => p.href !== '/' && clean.startsWith(p.href));
}
