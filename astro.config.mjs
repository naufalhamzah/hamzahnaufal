// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
    // NOTE: @astrojs/react is intentionally NOT enabled yet.
    // Stage 1 has no React islands, and enabling the integration emits a
    // ~190 kB client runtime that no page actually loads. It gets added back
    // in Stage 8 alongside the first genuinely interactive island
    // (project filtering / certification lightbox).
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
