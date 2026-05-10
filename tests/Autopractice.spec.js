import { context } from "@cucumber/cucumber";
import { test, expect } from "@playwright/test";
import { listeners } from "node:cluster";

test("AutoPractice", async ({ page, context }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //   //Radio Button Example

  await page.locator(".radioButton").nth(1).check();

  //Suggession Class Example

  await page
    .getByPlaceholder("Type to Select Countries")
    .pressSequentially("ind");

  await page.getByText("India", { exact: "true" }).click();

  // Dropdown Example

  await page.locator("#dropdown-class-example").selectOption("Option2");

  //Checkbox Example

  await page.locator("#checkBoxOption3").check();

  // Switch Window/tab Example

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.click("#openwindow"),
  ]);

  await newPage.waitForLoadState();

  await expect(
    newPage.getByRole("heading", { name: "Consulting", level: 1 }),
  ).toBeVisible();

  //Switch To Alert/Confirm Example

  await page.getByRole("textbox", { name: "Enter your Name" }).fill("Ankit");

  await page.once("dialog", async (dialog) => await dialog.dismiss());

  await page.click("#confirmbtn");

  const textbox = await page.getByPlaceholder("Hide/Show Example");

  await expect(textbox).toBeVisible();

  await page.getByRole("button", { name: "Hide" }).click();

  await expect(textbox).toBeHidden();

  await page.getByRole("button", { name: "Show" }).click();

  await expect(textbox).toBeVisible();

  // ifrmae

  const name = page.frameLocator("#courses-iframe");

  await name.getByRole("link", { name: "All Access plan" }).click();

  await expect(name.getByText("Enroll Now")).toBeVisible();

  //Hover

  await page.getByRole("button", { name: "Mouse Hover" }).hover();

  await page.getByText("Top", { exact: "true" }).click();
});
