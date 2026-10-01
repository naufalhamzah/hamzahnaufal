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
  /*
    The social preview card. A PNG, not the SVG that used to be here: none of
    Facebook, WhatsApp, LinkedIn, Slack or X rasterise SVG for a link preview,
    so an `.svg` here is a valid file that no scraper will ever show. Generated
    by `node scripts/make-og.mjs`, which reads the name and palette from the
    same data and tokens the site renders.
  */
  defaultOgImage: '/images/og-default.png',
};
