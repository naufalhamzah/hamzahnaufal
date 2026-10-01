import type { SiteMeta } from '@/types/site';

/**
 * Site-level metadata. This is intentionally the ONE place that holds
 * deployment/branding settings rather than personal content — personal
 * content lives in `src/content/`.
 */
export const site: SiteMeta = {
  // The deployment HOST — keep in step with `SITE_URL` in `astro.config.mjs`.
  // The base path is separate (`src/utils/url.ts`): this site is published as a
  // GitHub Pages PROJECT site, so its pages live under `/naufalhamzah`.
  // Used for canonical URLs, the sitemap and Open Graph tags.
  url: 'https://naufalhamzah.github.io',
  locale: 'en',
  // TODO(you): swap for a purpose-written 1200x630 social preview image.
  defaultOgImage: '/images/og-default.svg',
};
