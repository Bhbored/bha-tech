import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  test(`${theme} theme fits each viewport and passes an accessibility scan`, async ({
    page,
    context,
  }, testInfo) => {
    await context.addInitScript(
      (value) => localStorage.setItem("bha-theme", value),
      theme,
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [320, 390, 600, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      for (const id of ["about", "products", "services", "contact"]) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      audit.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map(({ target }) => target),
      })),
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`full-${theme}.png`),
      fullPage: true,
    });
    await page.evaluate(() => {
      document.documentElement.style.zoom = "2";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
