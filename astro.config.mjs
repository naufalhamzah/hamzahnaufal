// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// NOTE: update `site` to the real domain before deploying.
// It is used for canonical URLs, sitemap and Open Graph tags.
export const SITE_URL = 'https://hamzahnaufal.example.com';

export default defineConfig({
  site: SITE_URL,

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
