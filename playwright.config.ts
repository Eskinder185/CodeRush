import { defineConfig, devices } from '@playwright/test'

// Runs against the production build served under /CodeRush/, the same path as GitHub Pages.
export default defineConfig({
  testDir: 'e2e',
  outputDir: 'e2e-report/artifacts',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4187/CodeRush/',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npx vite preview --host 127.0.0.1 --port 4187 --strictPort',
    url: 'http://127.0.0.1:4187/CodeRush/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
