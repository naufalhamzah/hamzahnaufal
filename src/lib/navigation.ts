/**
 * The one true source for the site's section navigation.
 * Both the sticky header and the footer read from this list, so a new section
 * only ever needs to be added in one place.
 */

export interface NavItem {
  /** DOM id of the section it points at. */
  id: string;
  /** Visible label. */
  label: string;
  /** Short label used in the compact desktop bar / mobile menu. */
  short?: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'featured-work', label: 'Featured Work', short: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills & Tools', short: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
