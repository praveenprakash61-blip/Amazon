import { test, expect } from "@playwright/test";

test('Buy JBL headset from Amazon', async ({ page, context }) => {

  await page.goto('https://www.amazon.in');

  await page.getByPlaceholder('Search Amazon.in').fill('JBL Headset');
  await page.locator('#nav-search-submit-button').click();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a:has-text("JBL")').first().click()
  ]);

  await newPage.waitForLoadState('domcontentloaded');

  // Wait for product page to stabilize
  await newPage.waitForTimeout(2000);

  // Try Buy Now, fallback to Add to Cart
  if (await newPage.getByRole('button', { name: /Buy Now/i }).isVisible()) {
    await newPage.getByRole('button', { name: /Buy Now/i }).click();
  } else {
    await newPage.getByRole('button', { name: /Add to Cart/i }).click();
  }

  // Fix: correct property name
  if (await newPage.getByRole('button', { name: /Proceed to Buy/i }).isVisible()) {
    await newPage.getByRole('button', { name: /Proceed to Buy/i }).click();
  }

  await expect(newPage).toHaveURL(/amazon/);
});