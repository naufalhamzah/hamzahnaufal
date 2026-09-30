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
  /** Employer logo. */
  logo?: MediaAsset;
  /** Supporting photographs for the role. */
  photos?: MediaAsset[];
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
  /** Small logo shown beside the role. */
  logo?: MediaAsset;
  /** Supporting photographs shown in the role's gallery. */
  photos?: MediaAsset[];
  source: SourceRef;
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

/** A labelled placeholder slot for an image that does not exist yet. */
export interface MediaAsset {
  /** Path under /public. */
  src: string;
  /** Meaningful alt text — required, never empty. */
  alt: string;
  /** Native pixel width, so layouts can reserve space and avoid shift. */
  width?: number;
  height?: number;
  /** Optional caption shown in galleries / lightboxes. */
  caption?: string;
  /**
   * How the image should fill a fixed frame.
   *
   * `cover` (default) fills the frame and crops the overflow — right for
   * screenshots and photographs, where the frame edge cutting a little off is
   * harmless and the result looks deliberate.
   *
   * `contain` fits the whole image inside the frame and leaves the remainder as
   * matte — REQUIRED for documents (journal covers, article pages, papers).
   * Cropping one of those to fill a card removes the masthead or a column of
   * data, so the picture stops being evidence of anything. The matte is what
   * makes letterboxing look intended rather than broken.
   */
  fit?: 'cover' | 'contain';
  /**
   * True when this is a generated stand-in rather than a real asset.
   * The UI labels these honestly; real assets never carry this flag.
   */
  isPlaceholder?: boolean;
}

/** Visual for a project / publication / certification card. */
export interface ProjectVisual extends MediaAsset {
  aspect?: '16/9' | '3/2' | '4/3' | '1/1' | '3/4' | '9/16';
}

export interface ProjectEntry {
  id: string;
  title: string;
  subtitle?: string;
  categories: ProjectCategory[];
  role: string;
  /** Display date. Omitted where the source gives no usable period. */
  dateRange?: string;
  /** Four-digit year, used for filtering and the card corner label. */
  year?: string;
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
  /** Card / hero visual for the project. */
  visual: ProjectVisual;
  /** Additional images shown in the project gallery. May be empty. */
  gallery?: MediaAsset[];
  link?: ContentLink;
  /** Extra links (e.g. a second platform variant of the same design). */
  links?: ContentLink[];
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
  /** Method / approach, as described in the paper itself. */
  method?: string;
  abstract?: string;
  keywords?: string[];
  link?: ContentLink;
  visual: ProjectVisual;
  /** Article pages shown alongside the cover. */
  gallery?: MediaAsset[];
  source: SourceRef;
  todo?: string;
}

/* -------------------------------------------------------------------------- */
/* Certifications                                                             */
/* -------------------------------------------------------------------------- */

/** How a certificate is framed on the Certifications page. */
export type CertificationKind = 'credential' | 'programme' | 'organisation';

export interface CertificationEntry {
  id: string;
  /** Which group the certificate belongs in. */
  kind: CertificationKind;
  issuer: string;
  title: string;
  /** Optional learning path / specialisation shown on the certificate. */
  path?: string;
  date?: string;
  sortKey: string;
  credentialId?: string;
  /** One-line description of what the certificate evidences. */
  detail?: string;
  /** Certificate scan. Real scans replace placeholders with no code change. */
  visual: ProjectVisual;
  /** Issuer logo where one is available. */
  issuerLogo?: MediaAsset;
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
  /** The piagam / certificate scan evidencing the award, where one exists. */
  visual?: MediaAsset;
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
  /** Institution crest. */
  logo?: MediaAsset;
  source: SourceRef;
  todo?: string;
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A single skill. `icon` names a key in `src/data/skill-icons.ts`; null means
 * the skill has no logo and renders as text only.
 */
export interface SkillItem {
  name: string;
  icon: string | null;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** One-line explanation of what the group covers. */
  description?: string;
  items: SkillItem[];
  source: SourceRef;
}

/* -------------------------------------------------------------------------- */
/* Gallery / Moments                                                          */
/* -------------------------------------------------------------------------- */

/**
 * A personal or activity photograph.
 *
 * IMPORTANT: these are deliberately NOT attached to any employer or role. The
 * source photos are not organised by activity, so attributing one to AirNav,
 * PLN or Beauty Innovation Laboratories would be an assumption. They live in
 * their own Gallery section instead. Anything that IS unambiguous about an
 * employer (recognisable signage, branding) may also appear in that
 * experience's own `photos`.
 */
export interface GalleryEntry {
  id: string;
  visual: MediaAsset;
  /** Factual description of what is visible. Never asserts an event name. */
  caption: string;
  /** Grouping label, e.g. 'Campus & committee', used to cluster the grid. */
  group: string;
  /**
   * Which collection the photograph belongs to — `campus` for university
   * activity, `internship` for workplace photographs.
   *
   * This is the split the page is read by: "what did he do at university" and
   * "what has he done on the job" are different questions. It is REQUIRED, not
   * optional, so a new photograph cannot slip in unclassified and land
   * silently in the wrong section.
   */
  collection: 'campus' | 'internship';
}

