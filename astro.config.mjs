// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// NOTE: update `site` to the real domain before deploying.
// It is used for canonical URLs, sitemap and Open Graph tags.
export const SITE_URL = 'https://naufalhamzah.github.io';

/**
 * THE DEPLOY BASE — GitHub Pages serves a PROJECT site from a path.
 *
 * The Pages repository is `naufalhamzah/naufalhamzah`, which is NOT the special
 * `<user>.github.io` name, so GitHub publishes it at
 * `https://naufalhamzah.github.io/naufalhamzah/` rather than at the apex.
 * Without this every link and image on the site would 404, because a template
 * writes `/about`, not `/naufalhamzah/about`.
 *
 * Astro rewrites the URLs IT generates (bundled CSS/JS, fonts) to include this
 * prefix, but it cannot rewrite a string written by hand — those go through the
 * `withBase()` helper in `src/utils/url.ts`.
 *
 * IF THE SITE MOVES TO THE DOMAIN ROOT — a renamed `<user>.github.io`
 * repository, or a custom domain — set this to '' and nothing else changes:
 * `withBase()` becomes a no-op.
 */
export const BASE_PATH = '/naufalhamzah';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,

  // Static-first: every page is pre-rendered to plain HTML at build time.
  output: 'static',

  integrations: [
    sitemap(),
    // React is used for exactly ONE island: the project category filter, which
    // needs real client-side state. Everything else is static Astro markup.
    react(),
  ],

  /**
   * The dev toolbar is disabled on purpose.
   *
   * It renders a floating bar over the bottom of every page in `npm run dev`
   * and injects ~15 extra script requests per route, which (a) covers content
   * while reviewing layout and (b) makes a dev-mode network trace look nothing
   * like production. The site ships zero client JS outside /projects, so the
   * dev experience should reflect that.
   */
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },
});
