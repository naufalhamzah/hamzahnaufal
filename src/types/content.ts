/**
 * Shared content types.
 *
 * These describe the SHAPE of content, never the content itself. Stage 2 turns
 * them into Zod schemas so a missing required field fails the build instead of
 * silently rendering an empty gap.
 */

/** A date shown as free text, because the sources only give month/year. */
export type DateRangeText = string;

/** An external or internal link used anywhere on the site. */
export interface ContactLink {
  label: string;
  href: string;
  /** Opens in a new tab (used for third-party profiles and project links). */
  external?: boolean;
  /**
   * Controls whether the link is rendered at all. Lets you hide the phone
   * number, for example, without deleting it from the data file.
   * See CONTACT_PHONE_ENABLED in `src/content/profile.ts`.
   */
  enabled?: boolean;
}

/** A tag used for the project filter (Data, Systems, Research, UI/UX). */
export type ProjectCategory = 'data' | 'systems' | 'research' | 'uiux';
