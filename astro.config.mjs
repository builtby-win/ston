// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { strategy: 'img-svg' }]
    ],
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
  },
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
