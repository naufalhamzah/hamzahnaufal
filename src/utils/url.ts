/**
 * URL HELPERS — deploy-base awareness.
 * ============================================================================
 * GitHub Pages serves a PROJECT site from a path, not the domain root: the repo
 * `naufalhamzah` publishes at `https://naufalhamzah.github.io/naufalhamzah/`.
 *
 * Astro rewrites the URLs it generates itself (CSS, JS, fonts) when `base` is
 * set, but NOT a string a template wrote by hand — so every `href="/about"` and
 * `src="/images/..."` stays root-absolute and 404s under the prefix. These
 * helpers are the fix:
 *
 *   withBase('/about')               -> '/naufalhamzah/about'
 *   stripBase('/naufalhamzah/about') -> '/about'
 *
 * withBase is safe on ANY link: a value not starting with a slash (https://,
 * mailto:, #fragment) passes through untouched.
 *
 * If the site moves to the domain root — a renamed `<user>.github.io` repo or a
 * custom domain — empty `base` in `astro.config.mjs` and both helpers become
 * no-ops. Nothing else changes.
 */

/** The deploy base path, without a trailing slash ('' when served at root). */
export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a root-absolute path with the deploy base. Other values pass through. */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  if (!BASE_PATH) return path;
  return path === '/' ? `${BASE_PATH}/` : `${BASE_PATH}${path}`;
}

/**
 * Prefix an IMAGE source with the deploy base.
 *
 * Data files store image paths canonically (`/images/...`) so they stay
 * deployment-agnostic; the UI is the layer that knows where the site is served
 * from, and this is the single place that knowledge is applied. Safe on any
 * value: an `https://` URL or `data:` URI passes through.
 */
export function asset(src: string): string {
  return withBase(src);
}

/** Remove the deploy base from a pathname so it matches a route path again. */
export function stripBase(pathname: string): string {
  if (!BASE_PATH) return pathname;
  if (pathname === BASE_PATH || pathname === `${BASE_PATH}/`) return '/';
  return pathname.startsWith(`${BASE_PATH}/`)
    ? pathname.slice(BASE_PATH.length)
    : pathname;
}
