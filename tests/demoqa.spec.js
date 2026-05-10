import { test, expect } from "@playwright/test";
import path from "node:path";

test("testing", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/auth/register");
  await page.getByRole("textbox", { name: "First name" }).fill("Praveen");
  await page.getByRole("textbox", { name: "Last name" }).fill("Prakash");
  await page
    .getByRole("textbox", { name: "Date of birth *" })
    .fill("1994-07-05");
  await page.getByRole("combobox", { name: "Country" }).selectOption("India");
  await page.getByRole("textbox", { name: "Postal code" }).fill("201301");
  await page.getByRole("textbox", { name: "House number" }).fill("20");
  await page.getByRole("textbox", { name: "Street" }).fill("Sector");
  await page.getByRole("textbox", { name: "City" }).fill("Noida");
  await page.getByRole("textbox", { name: "Phone" }).fill("9876543210");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("Noida@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Lol@pp#21");
  await page.getByRole("button", { name: "Register" }).click();
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  const email = `praveen${Date.now()}@gmail.com`;

  await page.getByRole("textbox", { name: "Email address" }).fill(email);

  //   await page
  //     .getByRole("textbox", { name: "Email address" })
  //     .fill("61@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Lol@pp#2");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Categories" }).click();
  await page.getByRole("link", { name: "Power Tools" }).click();
  await page.getByRole("heading", { name: " Cordless Drill 20V " }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.locator("#lblCartCount").click();
  await page.getByRole("button", { name: "Proceed to checkout" }).click();
  await page.getByRole("tab", { name: "Continue as Guest" }).click();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("61@gmail.com");
  await page.getByRole("textbox", { name: "First name" }).fill("Praveen");
  await page.getByRole("textbox", { name: "Last name" }).fill("Singh");
  await page.getByRole("button", { name: "Continue as Guest" }).click();
  await page.getByRole("button", { name: "Proceed to checkout" }).click();
  await page.getByRole("combobox", { name: "Country" }).selectOption("India");
  await page.getByRole("textbox", { name: "Postal code" }).fill("201301");
  await page.getByRole("textbox", { name: "House number" }).fill("20");
  await page.getByRole("button", { name: "Proceed to checkout" }).click();
  await page
    .getByRole("combobox", { name: "Payment Method" })
    .selectOption("cash-on-delivery");
  await page.getByRole("button", { name: "Confirm" }).click();

  await expect(page.getByText("Payment was successful")).toBeVisible();

  await page.getByRole("link", { name: "Home" }).click();

  //   await page.getByTestId("eco-friendly-filter").check();

  await page
    .getByRole("checkbox", { name: " Show only eco-friendly products" })
    .check();

  await page.waitForLoadState("networkidle");

  await page.screenshot({ path: "screenshot.png" });
});
