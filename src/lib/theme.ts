/**
 * Theme handling.
 *
 * The site is dark-first, but we must honour three inputs in this order:
 *   1. What the visitor explicitly chose (persisted in localStorage)
 *   2. What their operating system prefers
 *   3. The default (dark)
 *
 * The *application* of the theme happens in a tiny inline script inside
 * BaseLayout's <head>. It has to run before the first paint, otherwise the
 * page flashes light before switching to dark ("FOUC"). Keeping that script
 * inline and dependency-free is deliberate.
 *
 * This module holds the shared constants so the inline script and the toggle
 * component cannot drift apart.
 */

export const THEME_STORAGE_KEY = 'hnz-theme';

export const THEMES = ['dark', 'light'] as const;

export type Theme = (typeof THEMES)[number];

/**
 * Reads the theme that should currently be active.
 * Mirrors the logic in the inline bootstrap script.
 */
export function resolveTheme(): Theme {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }
  return 'dark';
}

/** Applies a theme to <html> and remembers the choice. */
export function applyTheme(theme: Theme, persist = true): void {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* private mode / storage disabled — the visual change still applies */
    }
  }
}
