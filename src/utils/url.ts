/**
 * URL HELPERS — deploy-base awareness.
 * ============================================================================
 * GitHub Pages serves a PROJECT site from a path, not from the domain root: a
 * repository called `naufalhamzah` is published at
 * `https://naufalhamzah.github.io/naufalhamzah/`, not at the apex.
 *
 * Astro rewrites the URLs it generates itself (bundled CSS, JS, fonts) when
 * `base` is set, but it does NOT touch a string a template wrote by hand. So
 * every `href="/about"` and every `src="/images/..."` stays root-absolute and
 * 404s under the prefix. These helpers are the fix:
 *
 *   withBase('/about')               -> '/naufalhamzah/about'
 *   stripBase('/naufalhamzah/about') -> '/about'
 *
 * `withBase` is safe to apply to ANY link: a value that does not begin with a
 * slash (an https:// URL, a mailto:, a #fragment) is returned untouched, so
 * external links cannot be mangled by it.
 *
 * IF THE SITE EVER MOVES TO THE DOMAIN ROOT — a renamed `<user>.github.io`
 * repository, or a custom domain — empty `base` in `astro.config.mjs` and both
 * helpers become no-ops. Nothing else has to change.
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
 * Every image path in the data layer is stored canonically (`/images/...`), so
 * the data files stay deployment-agnostic and the UI is the layer that knows
 * where the site is served from. This is the single place that knowledge is
 * applied, which is why components call it at every render site rather than the
 * data files storing a prefixed path.
 *
 * Safe on any value: an absolute `https://` URL or a `data:` URI passes through.
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
