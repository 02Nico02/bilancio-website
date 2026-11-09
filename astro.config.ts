import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const publicSitemapPages = new Set([
  'https://bilancioapp.com/',
  'https://bilancioapp.com/gastos-grupales/',
  'https://bilancioapp.com/finanzas-personales/',
  'https://bilancioapp.com/como-funciona/',
]);

export default defineConfig({
  site: 'https://bilancioapp.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({ filter: (page) => publicSitemapPages.has(page) }),
  ],
});
