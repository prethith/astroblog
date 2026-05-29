// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
  // TODO: set this to your production domain (used for RSS + canonical URLs).
  site: 'https://example.com',
  // remark-gfm gives us auto-numbered footnotes ([^1] syntax → linked superscripts).
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  integrations: [
    mdx({
      gfm: false,
      remarkPlugins: [remarkGfm],
    })
  ],
});
