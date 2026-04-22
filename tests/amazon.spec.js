import { test, expect } from '@playwright/test';
import { HomePage } from '../pageobject/homepage';
import { SearchPage } from '../pageobject/searchpage';
import { ProductPage } from '../pageobject/productpage';

test('E2E Amazon flow', async ({ page, context }) => {

  await page.goto('https://www.amazon.in');

  const home = new HomePage(page);
  await home.searchProduct('JBL Headset');

  const search = new SearchPage(page);
  const newPage = await search.selectFirstProduct(context);

  const product = new ProductPage(newPage);
  await product.purchaseFlow();

  await expect(newPage).toHaveURL(/amazon/);
});