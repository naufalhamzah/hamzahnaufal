import type { SiteMeta } from '@/types/site';

/**
 * Site-level metadata. This is intentionally the ONE place that holds
 * deployment/branding settings rather than personal content — personal
 * content lives in `src/content/`.
 */
export const site: SiteMeta = {
  // TODO(you): replace with the real domain once it exists, and mirror the
  // same value in `astro.config.mjs` (`SITE_URL`). Used for canonical URLs,
  // the sitemap and Open Graph tags.
  url: 'https://hamzahnaufal.example.com',
  locale: 'en',
  // TODO(you): swap for a purpose-written 1200x630 social preview image.
  defaultOgImage: '/images/og-default.svg',
};
