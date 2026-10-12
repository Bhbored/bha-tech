import { defineConfig } from "@playwright/test";

const baseURL = process.env.PREVIEW_URL ?? "http://127.0.0.1:5173";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./artifacts/playwright",
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL,
    browserName: "chromium",
    channel: process.env.BROWSER_CHANNEL ?? "msedge",
    trace: "retain-on-failure",
  },
  webServer: process.env.PREVIEW_URL ? undefined : {
    command: "pnpm dev --host 127.0.0.1 --port 5173 --strictPort",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
