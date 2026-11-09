// GitHub Pages serves 404.html for unknown paths. Copying the SPA shell there
// lets deep links such as /CodeRush/lab/linux load the app, which then routes client-side.
import { copyFileSync, existsSync } from 'node:fs'

if (!existsSync('dist/index.html')) {
  console.error('dist/index.html is missing; run vite build first.')
  process.exit(1)
}
copyFileSync('dist/index.html', 'dist/404.html')
console.log('Copied dist/index.html to dist/404.html for SPA deep links.')
