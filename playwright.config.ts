import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  // Fully serial on purpose: this site renders heavy Three.js/GSAP content
  // (a WebGL globe, a full 3D driving scene), and running even 2 browser
  // instances at once on a modest machine starves both of CPU, causing
  // cascading timeouts that have nothing to do with the site itself.
  workers: 1,
  fullyParallel: false,
  retries: 0,
  timeout: 60000,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    // Visible only in headed mode (`--headed`); harmless/ignored headless.
    launchOptions: { slowMo: process.env.PWDEBUG_SLOWMO ? Number(process.env.PWDEBUG_SLOWMO) : 0 },
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
