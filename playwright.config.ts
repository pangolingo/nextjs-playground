import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config({ path: ".env.local" });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run build && npm run start",
    // url: 'http://127.0.0.1:3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});

// import { type PlaywrightTestConfig } from '@playwright/test';

// const config: PlaywrightTestConfig = {
//   webServer: {
//     command: 'npm run build && npm run preview',
//     port: 4173
//   },
//   testDir: 'tests',
//   testMatch: /(.+\.)?(test|spec)\.[jt]s/,
//   use: {
//     screenshot: 'only-on-failure'
//   },
//   projects: [
//     { name: 'setup', testMatch: /.*\.setup\.ts/ },
//     {
//       name: 'all tests',
//       dependencies: ['setup']
//     }
//   ]
// };

// export default config;
