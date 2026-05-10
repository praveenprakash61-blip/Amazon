import { test, expect } from "@playwright/test";

const users = [
  { username: "standard_user", password: "secret_sauce", valid: true },
  { username: "locked_out_user", password: "secret_sauce", valid: false },
  { username: "problem_user", password: "secret_sauce", valid: false },
];

test.describe("Login test", () => {
  users.forEach((user) => {
    test(`login test for ${user.username}`, async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.fill("#user-name", user.username);
      await page.fill("#password", user.password);
      await page.click("#login-button");

      if (user.valid) {
        await expect(page).toHaveURL("/inventory/");
        await expect(page.locator(".ttile")).toHaveText("Products");
      } else {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
      }
    });
  });
});
