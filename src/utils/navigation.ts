/**
 * NAVIGATION — the single source of truth for the site's information
 * architecture.
 * ============================================================================
 * The site is split deliberately into two levels:
 *
 *   HOMEPAGE  a short professional OVERVIEW — preview sections plus CTAs.
 *   PAGES     the full INFORMATION: about, projects, experience, skills,
 *             publications, certifications, gallery, contact.
 *
 * Because navigation is page-based rather than anchor-based, the desktop bar,
 * the mobile panel, the footer and the sitemap all read from ONE list here —
 * adding a page is a one-line change.
 *
 * `homeSections` holds the homepage anchor ids, so the homepage composition and
 * its "jump to" links cannot drift apart.
 */

export interface NavPage {
  /** Route path, e.g. '/projects'. */
  href: string;
  /** Full label, used in the mobile panel, footer and breadcrumbs. */
  label: string;
  /** Compact label for the desktop bar where space is tighter. */
  short?: string;
  /** One-line description, shown in the mobile panel and on home CTA rows. */
  blurb?: string;
  /** Kept out of the main navigation but still routable. */
  hidden?: boolean;
}

/** A homepage anchor target. */
export interface HomeSection {
  id: string;
  label: string;
}

/**
 * Order defines the desktop bar, the mobile panel and the footer.
 * Labels stay short — the site should read as a portfolio, not a CV.
 */
const ALL_PAGES: NavPage[] = [
  {
    href: '/about',
    label: 'About',
    blurb: 'Background, focus areas and how I work',
  },
  {
    href: '/projects',
    label: 'Projects',
    blurb: 'Systems, dashboards and research work',
  },
  {
    href: '/experience',
    label: 'Experience',
    blurb: 'Professional and organisational experience',
  },
  {
    href: '/skills',
    label: 'Skills',
    blurb: 'Tools and methods I work with',
  },
  {
    href: '/publications',
    label: 'Publications',
    short: 'Papers',
    blurb: 'Peer-reviewed research and articles',
  },
  {
    href: '/certifications',
    label: 'Certifications',
    short: 'Certs',
    blurb: 'Courses, credentials and awards',
  },
  {
    href: '/gallery',
    label: 'Gallery',
    blurb: 'Selected moments from activities and events',
  },
  {
    href: '/contact',
    label: 'Contact',
    blurb: 'Get in touch',
  },
];

/** Visible navigation pages, in order. */
export const navPages: NavPage[] = ALL_PAGES.filter((p) => !p.hidden);

/**
 * Homepage preview sections, in the order they are composed in
 * `src/pages/index.astro`. Used for the hero's jump row and the scroll cue.
 */
export const homeSections: HomeSection[] = [
  { id: 'about-preview', label: 'About' },
  { id: 'featured', label: 'Selected Work' },
  { id: 'experience-preview', label: 'Experience' },
  { id: 'skills-preview', label: 'Skills' },
  { id: 'credentials-preview', label: 'Credentials' },
  { id: 'gallery-preview', label: 'Moments' },
  { id: 'contact-preview', label: 'Contact' },
];

/**
 * Which nav entry should be marked "current" for a pathname.
 * Exact match first, then a prefix match, so a nested route such as
 * /projects/marketing-data-system still highlights /projects.
 */
export function activePageFor(pathname: string): NavPage | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const exact = navPages.find((p) => p.href === clean);
  if (exact) return exact;
  return navPages.find((p) => p.href !== '/' && clean.startsWith(p.href));
}
