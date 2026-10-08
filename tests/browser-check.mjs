import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || "msedge",
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "dark",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const base = process.env.PREVIEW_URL || "http://127.0.0.1:5173";
await mkdir("artifacts", { recursive: true });

try {
  await page.goto(base);
  const intro = page.getByRole("progressbar", {
    name: "Introduction progress",
  });
  await intro.waitFor();
  const firstPercentage = Number(await intro.getAttribute("aria-valuenow"));
  assert.equal(
    await page.locator(".site-content").evaluate((element) => element.inert),
    true,
  );
  await page.waitForFunction(
    (value) =>
      Number(
        document
          .querySelector('[role="progressbar"]')
          ?.getAttribute("aria-valuenow"),
      ) > value,
    firstPercentage,
  );
  await page.screenshot({ path: "artifacts/intro.png" });
  await page.waitForFunction(
    () =>
      document
        .querySelector('[role="progressbar"]')
        ?.getAttribute("aria-valuenow") === "100",
  );
  await page
    .locator(".site-intro")
    .waitFor({ state: "detached", timeout: 5000 });
  assert.equal(
    await page.locator(".site-content").evaluate((element) => element.inert),
    false,
  );
  assert.equal(await page.locator("html").getAttribute("data-intro"), null);

  await page.reload();
  await page.getByRole("button", { name: "Skip intro" }).waitFor();
  await page.keyboard.press("Escape");
  await page.locator(".site-intro").waitFor({ state: "detached" });
  await page.goto(`${base}/#products`);
  assert.equal(await page.locator(".site-intro").count(), 0);
  await page.goto(base);
  await page.getByRole("button", { name: "Skip intro" }).waitFor();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".site-intro").waitFor({ state: "detached" });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.screenshot({ path: "artifacts/desktop-dark.png" });
  const canvas = page.locator("canvas");
  const firstFrame = await canvas.evaluate((element) => element.toDataURL());
  await page.waitForTimeout(180);
  assert.notEqual(
    await canvas.evaluate((element) => element.toDataURL()),
    firstFrame,
    "Artwork should animate",
  );
  await page.getByRole("button", { name: "Pause motion" }).click();
  const pausedFrame = await canvas.evaluate((element) => element.toDataURL());
  await page.waitForTimeout(180);
  assert.equal(
    await canvas.evaluate((element) => element.toDataURL()),
    pausedFrame,
    "Pause must stop rendering",
  );
  await page.getByRole("button", { name: "Play motion" }).click();
  await page.evaluate(() => window.scrollTo({ top: 550, behavior: "instant" }));
  await page.locator(".site-header.is-compact").waitFor();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "artifacts/navbar-compact.png" });
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
  await page.waitForFunction(
    () =>
      !document.querySelector(".site-header")?.classList.contains("is-compact"),
  );
  await page.reload();
  await page.getByRole("button", { name: "Skip intro" }).click();
  assert.equal(await page.locator(".site-intro").count(), 0);
  assert.equal(await page.locator("html").getAttribute("data-intro"), null);

  for (const width of [320, 390, 600, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => {
        localStorage.setItem("bha-theme", value);
      }, theme);
      await page.reload();
      await page.getByRole("heading", { level: 1 }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, `${width}px ${theme} must not overflow`);
      for (const id of ["about", "products", "services", "contact"]) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(80);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          `${id} must fit at ${width}px`,
        );
      }
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  for (const id of ["home", "about", "products", "services", "contact"]) {
    await page.locator(`[data-nav-link="${id}"]`).click();
    assert.equal(new URL(page.url()).hash, `#${id}`);
  }
  for (const summary of await page.locator("summary").all()) {
    await summary.scrollIntoViewIfNeeded();
    await summary.click();
    assert.equal(
      await summary.evaluate((element) => element.parentElement.open),
      true,
    );
  }
  await page.getByRole("link", { name: "Discuss this service" }).last().click();
  assert.equal(new URL(page.url()).hash, "#contact");
  await page.getByLabel("Full name").fill("Test Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page
    .getByLabel("Service interested in")
    .selectOption("Web Application");
  await page
    .getByLabel("Estimated project type")
    .selectOption("New product or system");
  await page
    .getByLabel("Message", { exact: false })
    .fill("A browser check of the contact form.");
  await page.getByRole("checkbox").check();
  if (
    await page
      .getByText("Online inquiry submission is temporarily unavailable.", {
        exact: false,
      })
      .isVisible()
  ) {
    assert.equal(
      await page.getByRole("button", { name: "Send Inquiry" }).isDisabled(),
      true,
    );
  }
  await page.getByRole("button", { name: "Back to top" }).click();
  await page.waitForFunction(() => scrollY < 10);
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.waitForTimeout(350);
  assert.equal(await page.locator("html").getAttribute("class"), "light");
  await page.screenshot({ path: "artifacts/desktop-light.png" });

  for (const route of ["privacy", "terms"]) {
    await page.goto(`${base}/${route}`);
    await page.getByRole("heading", { level: 1 }).waitFor();
    assert.equal(
      await page.locator("canvas").count(),
      0,
      "Legal routes should not mount artwork",
    );
    await page.getByRole("link", { name: "BHA Tech home" }).first().click();
    await page
      .getByRole("heading", { name: "Good ideas. Great software." })
      .waitFor();
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.getByRole("button", { name: "Open menu" }).click();
  assert.equal(
    await page.locator("main").evaluate((element) => element.inert),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Open menu" })
      .evaluate((element) => element === document.activeElement),
    true,
  );
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Products", exact: true })
    .click();
  assert.equal(
    await page.locator("main").evaluate((element) => element.inert),
    false,
  );
  assert.equal(new URL(page.url()).hash, "#products");
  await page.goto(base);
  await page.screenshot({ path: "artifacts/mobile-light.png", fullPage: true });
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: "artifacts/mobile-dark.png" });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  assert.equal(await page.locator(".site-intro").count(), 0);
  await canvas.waitFor();
  await page.waitForTimeout(100);
  const reducedFrame = await canvas.evaluate((element) => element.toDataURL());
  await page.waitForTimeout(180);
  assert.equal(
    await canvas.evaluate((element) => element.toDataURL()),
    reducedFrame,
    "Reduced motion must stop artwork",
  );
  assert.equal(
    await page.getByRole("button", { name: "Pause motion" }).isVisible(),
    false,
  );
  assert.deepEqual(errors, [], "No browser runtime errors");
  for (const theme of ["dark", "light"]) {
    await page.evaluate(
      (value) => localStorage.setItem("bha-theme", value),
      theme,
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.reload();
    await page.getByRole("heading", { level: 1 }).waitFor();
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(
      audit.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
      [],
      `${theme} accessibility audit`,
    );
    await page.screenshot({
      path: `artifacts/full-${theme}.png`,
      fullPage: true,
    });
    await page
      .locator("footer")
      .screenshot({ path: `artifacts/footer-${theme}.png` });
    await page.getByRole("link", { name: "Return to the top" }).click();
    await page.waitForFunction(() => scrollY < 10);
    await page.evaluate(() => {
      document.documentElement.style.zoom = "2";
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `${theme} 200% zoom must reflow`,
    );
    await page.evaluate(() => {
      document.documentElement.style.zoom = "1";
    });
  }
  console.log(
    "PASS: six viewport sizes, both themes, motion controls, reduced motion, services, form controls, mobile navigation, legal routes, 200% zoom, WCAG A/AA scans, and no runtime errors.",
  );
} finally {
  await browser.close();
}
