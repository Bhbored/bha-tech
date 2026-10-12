import { expect, test } from "@playwright/test";

test("services lead to the contact form and the footer returns to the top", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const summary of await page.locator("summary").all()) {
    await summary.click();
    await expect(summary.locator("..")).toHaveAttribute("open", "");
  }
  await page.getByRole("link", { name: "Discuss this service" }).last().click();
  await expect(page).toHaveURL(/#contact$/);
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
    await expect(
      page.getByRole("button", { name: "Send Inquiry" }),
    ).toBeDisabled();
  }
  await page.getByRole("link", { name: "Return to the top" }).click();
  await expect(page).toHaveURL(/#home$/);
});

test("legal routes stay reachable from the footer", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [name, route] of [
    ["Privacy policy", "privacy"],
    ["Terms of use", "terms"],
  ] as const) {
    await page.locator("footer").getByRole("link", { name }).click();
    await expect(page).toHaveURL(new RegExp(`/${route}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await page.getByRole("link", { name: "BHA Tech home" }).first().click();
  }
});
