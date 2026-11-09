import { defineConfig, devices } from '@playwright/test'

// Runs against the production build served under /CodeRush/, the same path as GitHub Pages.
export default defineConfig({
  testDir: 'e2e',
  outputDir: 'e2e-report/artifacts',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173/CodeRush/',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/CodeRush/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
