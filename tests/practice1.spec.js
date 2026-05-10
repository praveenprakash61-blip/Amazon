import {test , expect} from '@playwright/test';

test('Practice1 test', async ({page}) => {

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.getByPlaceholder('email@example.com').fill('erds@gmail.com');
await page.getByPlaceholder('enter your passsword').fill('Lol@pp#21');
await page.getByRole('button',{name:'login'}).click();
await page.locator('.row').getByRole('button',{name:'Add To Cart'}).nth(2).click();

await page.locator('[routerlink*=cart]').click();

await page.getByRole('button',{name:'Checkout'}).click();

await page.getByPlaceholder('Select Country').pressSequentially('indo');

await page.getByRole('button', { name: 'Indonesia' }).click();

await page.getByText('Place Order', { exact: true }).click();


await expect(
  page.getByRole('heading', { name: 'Thankyou for the order.' })
).toBeVisible();



});