/**
 * ZOD SCHEMAS
 * ============================================================================
 * Why this file exists: the brief's hardest rule is "never invent information".
 * A schema is how that rule becomes mechanical rather than a promise.
 *
 * Each content file is parsed through the matching schema at module load. If a
 * required field is missing, `zod` throws during the build and Astro fails the
 * build with the field name in the message. It is impossible to ship a page
 * with a silently-empty gap.
 *
 * Optional fields stay optional on purpose: an unknown fact should be *absent*
 * (or flagged with `todo`), not faked with an empty string.
 * ============================================================================
 */

import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/* Shared building blocks                                                     */
/* -------------------------------------------------------------------------- */

export const sourceRefSchema = z.enum(['profile', 'portfolio', 'both']);

export const contentLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

export const contactLinkSchema = contentLinkSchema.extend({
  enabled: z.boolean().optional(),
});

export const projectCategorySchema = z.enum(['data', 'systems', 'research', 'uiux']);

/**
 * Image slot. `src` must be a public path, and alt text is mandatory — an
 * image without a description is an accessibility failure, so the schema
 * refuses it. `isPlaceholder` marks generated stand-ins so the UI can label
 * them honestly.
 */
export const mediaAssetSchema = z.object({
  src: z
    .string()
    .startsWith('/', 'Image src must be a public path beginning with "/"'),
  alt: z.string().min(3, 'Every image needs descriptive alt text'),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  caption: z.string().optional(),
  isPlaceholder: z.boolean().optional(),
});

export const projectVisualSchema = mediaAssetSchema.extend({
  aspect: z.enum(['16/9', '3/2', '4/3', '1/1', '3/4', '9/16']).optional(),
});

/* -------------------------------------------------------------------------- */
/* Profile                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Hero portrait: dimensions are REQUIRED here (unlike a generic MediaAsset) so
 * the hero can reserve the correct aspect ratio and avoid layout shift.
 */
export const portraitSchema = z.object({
  src: z.string().startsWith('/'),
  alt: z.string().min(3),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  initials: z.string().min(1).max(4),
  headline: z.string().min(1),
  positioning: z.array(z.string().min(1)).min(1),
  displayWord: z.string().min(1),
  location: z.string().min(1),
  currentStatus: z.string().min(1),
  currentRole: z.string().min(1),
  summary: z.array(z.string().min(1)).min(1),
  focusAreas: z.array(z.string().min(1)).min(1),
  contactLinks: z.array(contactLinkSchema).min(1),
  email: z.email(),
  tagline: z.string().min(1),
  portrait: portraitSchema,
});

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

export const experienceEntrySchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  companyFull: z.string().optional(),
  role: z.string().min(1),
  dateRange: z.string().min(1),
  sortKey: z.string().regex(/^\d{4}-\d{2}$/, 'sortKey must be YYYY-MM'),
  location: z.string().min(1),
  current: z.boolean().optional(),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)),
  tools: z.array(z.string().min(1)).optional(),
  logo: mediaAssetSchema.optional(),
  photos: z.array(mediaAssetSchema).optional(),
  source: sourceRefSchema,
  todo: z.string().optional(),
});

export const experienceListSchema = z.array(experienceEntrySchema);

/* -------------------------------------------------------------------------- */
/* Organizations                                                              */
/* -------------------------------------------------------------------------- */

export const organizationEntrySchema = z.object({
  id: z.string().min(1),
  organization: z.string().min(1),
  role: z.string().min(1),
  dateRange: z.string().min(1),
  sortKey: z.string().regex(/^\d{4}-\d{2}$/),
  location: z.string().optional(),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)).optional(),
  tools: z.array(z.string().min(1)).optional(),
  durationMonths: z.number().positive().optional(),
  group: z.string().min(1),
  logo: mediaAssetSchema.optional(),
  photos: z.array(mediaAssetSchema).optional(),
  source: sourceRefSchema,
});

export const organizationListSchema = z.array(organizationEntrySchema);

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

export const projectEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  categories: z.array(projectCategorySchema).min(1, 'A project needs at least one category'),
  role: z.string().min(1),
  dateRange: z.string().optional(),
  year: z.string().regex(/^\d{4}$/).optional(),
  sortKey: z.string().regex(/^\d{4}-\d{2}$/),
  organisation: z.string().optional(),
  tagline: z.string().min(1),
  context: z.string().optional(),
  approach: z.array(z.string().min(1)).optional(),
  outcomes: z.array(z.string().min(1)),
  tools: z.array(z.string().min(1)).min(1, 'List the tools this project used'),
  visual: projectVisualSchema,
  gallery: z.array(mediaAssetSchema).optional(),
  link: contentLinkSchema.optional(),
  links: z.array(contentLinkSchema).optional(),
  featured: z.boolean(),
  source: sourceRefSchema,
  todo: z.string().optional(),
});

export const projectListSchema = z.array(projectEntrySchema);

/* -------------------------------------------------------------------------- */
/* Publications                                                               */
/* -------------------------------------------------------------------------- */

export const publicationEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  titleId: z.string().optional(),
  authors: z.array(z.string().min(1)).min(1),
  authorPosition: z.number().int().positive(),
  venue: z.string().min(1),
  venueFull: z.string().optional(),
  publisher: z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  year: z.string().min(4),
  issn: z.string().optional(),
  issnPrint: z.string().optional(),
  accreditation: z.string().optional(),
  metric: z.string().optional(),
  method: z.string().optional(),
  abstract: z.string().optional(),
  keywords: z.array(z.string().min(1)).optional(),
  link: contentLinkSchema.optional(),
  visual: projectVisualSchema,
  gallery: z.array(mediaAssetSchema).optional(),
  source: sourceRefSchema,
  todo: z.string().optional(),
});

export const publicationListSchema = z.array(publicationEntrySchema);

/* -------------------------------------------------------------------------- */
/* Certifications                                                             */
/* -------------------------------------------------------------------------- */

export const certificationEntrySchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['credential', 'programme', 'organisation']),
  issuer: z.string().min(1),
  title: z.string().min(1),
  path: z.string().optional(),
  date: z.string().optional(),
  sortKey: z.string().regex(/^\d{4}-\d{2}[a-z]?$/),
  credentialId: z.string().optional(),
  detail: z.string().optional(),
  visual: projectVisualSchema,
  issuerLogo: mediaAssetSchema.optional(),
  source: sourceRefSchema,
  todo: z.string().optional(),
});

export const certificationListSchema = z.array(certificationEntrySchema);

/* -------------------------------------------------------------------------- */
/* Achievements                                                               */
/* -------------------------------------------------------------------------- */

export const achievementEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  detail: z.string().min(1),
  year: z.string().optional(),
  kind: z.enum(['award', 'funding', 'competition']),
  context: z.string().optional(),
  visual: mediaAssetSchema.optional(),
  source: sourceRefSchema,
});

export const achievementListSchema = z.array(achievementEntrySchema);

/* -------------------------------------------------------------------------- */
/* Education                                                                  */
/* -------------------------------------------------------------------------- */

export const educationEntrySchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().optional(),
  dateRange: z.string().min(1),
  sortKey: z.string().regex(/^\d{4}-\d{2}$/),
  location: z.string().optional(),
  highlights: z.array(z.string().min(1)).optional(),
  logo: mediaAssetSchema.optional(),
  source: sourceRefSchema,
  todo: z.string().optional(),
});

export const educationListSchema = z.array(educationEntrySchema);

/* -------------------------------------------------------------------------- */
/* Skills                                                                     */
/* -------------------------------------------------------------------------- */

export const skillItemSchema = z.object({
  name: z.string().min(1),
  /** Key into the icon registry, or null for a text-only skill. */
  icon: z.string().nullable(),
});

export const skillGroupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  items: z.array(skillItemSchema).min(1),
  source: sourceRefSchema,
});

export const skillGroupListSchema = z.array(skillGroupSchema);

/* -------------------------------------------------------------------------- */
/* Gallery / Moments                                                          */
/* -------------------------------------------------------------------------- */

export const galleryEntrySchema = z.object({
  id: z.string().min(1),
  visual: mediaAssetSchema,
  caption: z.string().min(3),
  group: z.string().min(1),
});

export const galleryListSchema = z.array(galleryEntrySchema);

