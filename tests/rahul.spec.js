import {test ,expect} from "@playwright/test";

test('Rahul testing EtoE', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill('erds@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Lol@pp#21');
    await page.getByRole('button',{name:'login'}).click();
    await page.locator('.card-body').filter({hasText:'ADIDAS ORIGINAL'}).getByRole('button',{name:' Add To Cart'}).click();

    await page.getByRole('button',{name:'cart 1'}).click();

    await page.getByRole('button',{name:'Checkout'}).click();
    // const cardnumber = '4542 9931 9292 0000';

    // const cardvalue = await page.locator('.input').first();
    // await cardvalue.fill(cardnumber);

    await page.getByRole('textbox').first().fill('4542 9931 9292 1234');
    await page.getByRole('textbox').nth(1).fill('345');
    await page.getByRole('textbox').nth(2).fill('Praveen');
    await  page.getByRole('combobox').first().selectOption('03');
    await page.getByRole('combobox').nth(1).selectOption('22');




await page.getByPlaceholder('Select Country').pressSequentially('india');

await expect(page.locator('.ta-results')).toBeVisible();

await page.locator('.ta-results button') .filter({ hasText: 'India' }).nth(1).click();

// await page.getByRole('link', { name: /Place Order/i }).click();

//     await page.getByRole('textbox',{name:'Select Country'}).pressSequentially('indo');
//     await page.locator('.fa-search').click();

//    // await page.getByRole('link',{name:'Place Order'}).click();
      await   page.getByText('Place Order', { exact: true }).click();
//    await page.getByRole('link', { name: /place order/i }).click();

    await expect(page.locator('.title').nth(0)).toHaveText('ADIDAS ORIGINAL');



    // await  page.pause();


})