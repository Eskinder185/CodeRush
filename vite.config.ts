import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/CodeRush/' : '/',
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['monaco-editor']
  },
  server: {
    port: 3000,
    strictPort: true
  }
}))
