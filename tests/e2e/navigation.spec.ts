import { expect, test } from "@playwright/test";

test("the navbar contracts and expands with scroll direction", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo({ top: 550, behavior: "instant" }));
  await expect(page.locator(".site-header")).toHaveClass(/is-compact/);
  await page.screenshot({ path: testInfo.outputPath("compact-navbar.png") });
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
  await expect(page.locator(".site-header")).not.toHaveClass(/is-compact/);
});

test("desktop links reach every section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const id of ["home", "about", "products", "services", "contact"]) {
    await page.locator(`[data-nav-link="${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
  }
});

test("the mobile menu is keyboard operable and closes on navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Products", exact: true })
    .click();
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  await expect(page).toHaveURL(/#products$/);
});
