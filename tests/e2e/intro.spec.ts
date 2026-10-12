import { expect, test } from "@playwright/test";

test("the introduction counts to 100 and releases the page", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const progress = page.getByRole("progressbar", {
    name: "Introduction progress",
  });
  await expect(progress).toBeVisible();
  await expect(page.locator(".site-content")).toHaveAttribute("inert", "");
  await page.screenshot({ path: testInfo.outputPath("intro.png") });
  await expect(progress).toHaveAttribute("aria-valuenow", "100");
  await expect(page.locator(".site-intro")).toHaveCount(0);
  await expect(page.locator(".site-content")).not.toHaveAttribute("inert");
  await expect(page.locator("html")).not.toHaveAttribute("data-intro");
});

test("Skip and Escape dismiss the introduction", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.locator(".site-intro")).toHaveCount(0);
  await page.reload();
  await page.getByRole("button", { name: "Skip intro" }).waitFor();
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-intro")).toHaveCount(0);
});

test("direct links and reduced motion skip the introduction", async ({
  page,
}) => {
  await page.goto("/#products");
  await expect(page.locator(".site-intro")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".site-intro")).toHaveCount(0);
});

test("a live reduced-motion change ends the introduction", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).waitFor();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".site-intro")).toHaveCount(0);
});
