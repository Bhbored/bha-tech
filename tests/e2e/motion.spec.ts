import { expect, test } from "@playwright/test";

const snapshot = (canvas: ReturnType<import("@playwright/test").Page["locator"]>) =>
  canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL());

test("the ribbon animates, pauses, and resumes", async ({ page }) => {
  await page.goto("/#home");
  const canvas = page.locator("canvas");
  await canvas.waitFor();
  const first = await snapshot(canvas);
  await page.waitForTimeout(180);
  expect(await snapshot(canvas)).not.toBe(first);
  await page.getByRole("button", { name: "Pause motion" }).click();
  const paused = await snapshot(canvas);
  await page.waitForTimeout(180);
  expect(await snapshot(canvas)).toBe(paused);
  await page.getByRole("button", { name: "Play motion" }).click();
});

test("reduced motion stops artwork and hides its control", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const canvas = page.locator("canvas");
  await canvas.waitFor();
  const still = await snapshot(canvas);
  await page.waitForTimeout(180);
  expect(await snapshot(canvas)).toBe(still);
  await expect(page.getByRole("button", { name: "Pause motion" })).toBeHidden();
});

test("the product panel reveals every Shabakat capability", async ({ page }) => {
  await page.goto("/#products");
  const section = page.locator("#products");
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator(".product-showcase")).toHaveCSS("opacity", "1");
  await expect(section.locator(".product-capability")).toHaveCount(6);
  await expect(section.locator(".product-capability").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(section.getByRole("link", { name: "Explore Shabakat" })).toHaveAttribute(
    "href",
    "https://shabakatlb.com",
  );
});
