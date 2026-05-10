import { test, expect } from "@playwright/test";

test("Testing Practice", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/");

  //Dropdown selection

  // await page.getByText('Dropdown',{excat:'true'}).click();

  // await page.locator('#dropdown').selectOption('Option 2');

  // await page.pause();

  // await page.locator('[href="/download"]').click();

  // const[download] = await Promise.all([
  // page.waitForEvent('download'),
  // page.click('[href*="img.web"]')]);

  // await download.saveAs('path/to/img.web');

  // await page.locator('[href="/upload"]').click();
  // await page.setInputFiles('input[type= "file"]','path/to/test.txt')

  // await page.getByRole('button',{name:'Upload'}).click();

  // await expect(page.getByRole('heading',{name:'File Uploaded!',level : 3})).toBeVisible();

  // await page.pause();

  //file download

  //   await page.locator('[href="/download"]').click();

  //   const [download] = await Promise.all([
  //     page.waitForEvent("download"),
  //     page.click('[href*="download/test.txt"]'),
  //   ]);
});
