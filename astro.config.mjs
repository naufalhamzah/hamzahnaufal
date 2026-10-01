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
 * ============================================================================
 * This repository is `naufalhamzah/naufalhamzah`, which is NOT the special
 * `<user>.github.io` name. GitHub therefore publishes it under the repository
 * name as a path — `https://naufalhamzah.github.io/naufalhamzah/` — not at the
 * domain root, so every link and image has to carry that prefix or it 404s.
 *
 * WHY THIS IS DERIVED AND NOT A HARDCODED '/naufalhamzah'
 * The prefix must be PRESENT when deploying and ABSENT when developing. Hard-
 * coding it makes `npm run dev` serve at `localhost:4321/naufalhamzah/`, which
 * is awkward to work in; emptying it locally and forgetting to restore it ships
 * a site whose every link points at the domain root. Deriving it from the
 * environment removes the choice: GitHub Actions sets `GITHUB_ACTIONS=true`,
 * and a local `npm run dev` does not, so the two can never disagree.
 *
 * Astro rewrites the URLs IT generates (bundled CSS/JS, fonts) to include this
 * prefix, but it cannot rewrite a string written by hand — those go through the
 * `withBase()` / `asset()` helpers in `src/utils/url.ts`.
 *
 * IF THE SITE MOVES TO THE DOMAIN ROOT — a renamed `<user>.github.io`
 * repository, or a custom domain — this becomes a no-op and nothing else
 * changes: the helpers pass their input straight through.
 */
export const BASE_PATH = process.env.GITHUB_ACTIONS ? '/naufalhamzah' : '';

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
