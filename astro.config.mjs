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

  vite: {
    plugins: [tailwindcss()],
  },
});
