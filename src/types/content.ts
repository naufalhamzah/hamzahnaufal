/**
 * CONTENT TYPES
 * ============================================================================
 * These describe the SHAPE of content, never the content itself. Components
 * import these; the actual facts live in `src/content/*`.
 *
 * Zod schemas in `src/content/schemas.ts` mirror these types and validate the
 * content files at build time, so a missing required field fails the build
 * instead of silently rendering an empty gap.
 * ============================================================================
 */

/** Where a fact came from, kept so any claim can be traced back. */
export type SourceRef = 'profile' | 'portfolio' | 'both';

/* -------------------------------------------------------------------------- */
/* Links & shared bits                                                        */
/* -------------------------------------------------------------------------- */

export interface ContentLink {
  label: string;
  href: string;
  external?: boolean;
}

/** An external or internal link used anywhere on the site. */
export interface ContactLink extends ContentLink {
  /**
   * Controls whether the link is rendered at all. Lets you hide the phone
   * number, for example, without deleting it from the data file.
   * See CONTACT_PHONE_ENABLED in `src/content/profile.ts`.
   */
  enabled?: boolean;
}

/** A date shown as free text, because the sources only give month/year. */
export type DateRangeText = string;

/** Project filter categories, as requested in the brief. */
export type ProjectCategory = 'data' | 'systems' | 'research' | 'uiux';

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  data: 'Data / Analytics',
  systems: 'Information Systems',
  research: 'Research / ML',
  uiux: 'UI/UX',
};

/** Ordered list used by the filter bar so the order lives in one place. */
export const PROJECT_CATEGORY_ORDER: ProjectCategory[] = [
  'data',
  'systems',
  'research',
  'uiux',
];

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

export interface ExperienceEntry {
  id: string;
  company: string;
  /** Optional longer legal/unit name, e.g. "PT PLN (Persero) Pusharlis UP2W I". */
  companyFull?: string;
  role: string;
  /** Display date range, kept as text because sources give months only. */
  dateRange: string;
  /** Sort key (YYYY-MM). The current role uses a far-future value. */
  sortKey: string;
  location: string;
  /** True for the current role — gets visual priority. */
  current?: boolean;
  summary: string;
  highlights: string[];
  tools?: string[];
  source: SourceRef;
  /** Notes about unresolved or provisional content. Rendered as a TODO badge. */
  todo?: string;
}

/* -------------------------------------------------------------------------- */
/* Organizations / leadership                                                 */
/* -------------------------------------------------------------------------- */

export interface OrganizationEntry {
  id: string;
  organization: string;
  role: string;
  dateRange: string;
  sortKey: string;
  location?: string;
  summary: string;
  highlights?: string[];
  /** Tools evidenced in the role's description. */
  tools?: string[];
  /** Duration in months for the timeline bars. Only set where documented. */
  durationMonths?: number;
  /** Parent body this role belongs to, used to group the timeline. */
  group: string;
  source: SourceRef;
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

/** A labelled placeholder slot for an image that does not exist yet. */
export interface ProjectVisual {
  /** Path under /public. Placeholders live in /images/placeholders/. */
  src: string;
  alt: string;
  /** True when this is a stand-in, so the UI can label it honestly. */
  isPlaceholder: boolean;
  aspect?: '16/9' | '4/3' | '1/1' | '3/4';
}

export interface ProjectEntry {
  id: string;
  title: string;
  subtitle?: string;
  categories: ProjectCategory[];
  role: string;
  /** Display date. Omitted where the source gives no usable period. */
  dateRange?: string;
  sortKey: string;
  organisation?: string;
  /** One-line summary for cards. */
  tagline: string;
  /** Long-form body for the case study. */
  context?: string;
  approach?: string[];
  /** Only documented outcomes. Empty array means "none documented". */
  outcomes: string[];
  tools: string[];
  visual: ProjectVisual;
  link?: ContentLink;
  featured: boolean;
  source: SourceRef;
  todo?: string;
}

/* -------------------------------------------------------------------------- */
/* Publications                                                               */
/* -------------------------------------------------------------------------- */

export interface PublicationEntry {
  id: string;
  title: string;
  /** Indonesian title where the paper carries both. */
  titleId?: string;
  authors: string[];
  /** 1-based position of Hamzah in the author list. */
  authorPosition: number;
  venue: string;
  venueFull?: string;
  publisher?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: string;
  issn?: string;
  issnPrint?: string;
  accreditation?: string;
  /** Only stated results. Never inferred. */
  metric?: string;
  abstract?: string;
  keywords?: string[];
  link?: ContentLink;
  visual: ProjectVisual;
  source: SourceRef;
  todo?: string;
}

/* -------------------------------------------------------------------------- */
/* Certifications                                                             */
/* -------------------------------------------------------------------------- */

export interface CertificationEntry {
  id: string;
  issuer: string;
  title: string;
  /** Optional learning path / specialisation shown on the certificate. */
  path?: string;
  date?: string;
  sortKey: string;
  credentialId?: string;
  /** Placeholder scan slot — real scans can be dropped in later. */
  visual: ProjectVisual;
  source: SourceRef;
  todo?: string;
}

/* -------------------------------------------------------------------------- */
/* Achievements                                                               */
/* -------------------------------------------------------------------------- */

export interface AchievementEntry {
  id: string;
  title: string;
  detail: string;
  year?: string;
  /** Rendered as a small marker: 'award' | 'funding' | 'competition'. */
  kind: 'award' | 'funding' | 'competition';
  context?: string;
  source: SourceRef;
}

/* -------------------------------------------------------------------------- */
/* Education                                                                  */
/* -------------------------------------------------------------------------- */

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  dateRange: string;
  sortKey: string;
  location?: string;
  highlights?: string[];
  source: SourceRef;
  todo?: string;
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                     */
/* -------------------------------------------------------------------------- */

export interface SkillGroup {
  id: string;
  title: string;
  /** One-line explanation of what the group covers. */
  description?: string;
  items: string[];
  source: SourceRef;
}
