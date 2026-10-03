/**
 * Theme handling.
 *
 * Dark-first, honouring in this order: an explicit choice persisted in
 * localStorage, then the OS preference, then dark as the default.
 *
 * APPLICATION happens in the inline script in BaseLayout's <head>: it must run
 * before first paint, or a dark-first site flashes light ("FOUC") — hence it
 * stays inline and dependency-free. This module holds the shared constants so
 * that script and the toggle cannot drift apart.
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

/** How long `.theme-switching` stays on. Slightly longer than --t-theme (320ms)
 *  so the transition finishes before the rule is removed. */
const THEME_FADE_MS = 340;

/** Applies a theme to <html> and remembers the choice. */
export function applyTheme(theme: Theme, persist = true, animate = false): void {
  const root = document.documentElement;

  /* The fade lives on `.theme-switching` so colours animate only during a real
     theme change — never on first paint or on hover. */
  if (animate) {
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), THEME_FADE_MS);
  }

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
