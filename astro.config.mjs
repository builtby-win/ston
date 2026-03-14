// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react(), mdx(), mermaid()],
  vite: {
    plugins: [tailwindcss()],
  },
});
