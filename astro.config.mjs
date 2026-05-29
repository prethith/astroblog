// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
  site: 'https://disaggregate.pages.dev',
  // Self-hosted, build-time-optimized fonts (downloaded & served locally, no Google CDN).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Spectral',
      cssVariable: '--font-spectral',
      weights: [400, 700],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-ibm-plex-sans',
      weights: [400],
      styles: ['normal', 'italic'],
    },
  ],
  // remark-gfm gives us auto-numbered footnotes ([^1] syntax → linked superscripts).
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  integrations: [
    mdx({
      gfm: false,
      remarkPlugins: [remarkGfm],
    }),
    sitemap(),
  ],
});
