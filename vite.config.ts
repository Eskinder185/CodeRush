/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The production site is served from https://eskinder185.github.io/CodeRush/.
// BASE_URL is read by the router (see src/App.tsx) so routes and assets share one source of truth.
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // The dev server runs at /, while build and preview use the GitHub Pages subpath.
  base: command === 'build' || isPreview ? '/CodeRush/' : '/',
  server: { port: 3000, strictPort: true },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        // Content is large and changes less often than UI code, so it gets its own cacheable chunk.
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('/src/content/code/')) return 'content-lessons'
          if (id.includes('/src/content/commands/')) return 'content-commands'
          if (id.includes('/src/content/')) return 'content'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**'],
    css: false,
  },
}))
