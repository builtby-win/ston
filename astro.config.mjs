// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeMermaid from 'rehype-mermaid';

/** Lazy-load and async-decode every markdown image (they are plain <img> from /public). */
function rehypeLazyImages() {
  /** @param {{ type: string, tagName?: string, properties?: Record<string, unknown>, children?: unknown[] }} node */
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      node.properties = { loading: 'lazy', decoding: 'async', ...node.properties };
    }
    for (const child of node.children ?? []) visit(/** @type {typeof node} */ (child));
  };
  return visit;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://builtby.win',
  output: 'static',
  trailingSlash: 'always',
  // Inline CSS into the HTML: no render-blocking stylesheet request.
  build: { inlineStylesheets: 'always' },
  // Prefetch internal links on hover/focus so navigation feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Self-hosted, preloaded JetBrains Mono: no Google Fonts round trips.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Fira Code', 'SF Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
    },
  ],
  markdown: {
    // Footnote label as a <p>, not an <h2>: no unstyled sr-only heading, and it stays out of the TOC.
    remarkRehype: { footnoteLabel: 'footnotes', footnoteLabelTagName: 'p' },
    rehypePlugins: [
      rehypeLazyImages,
      [rehypeMermaid, { strategy: 'pre-mermaid' }]
    ],
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => page !== 'https://builtby.win/',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
