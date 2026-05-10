import {test , expect } from '@playwright/test';
import {Login} from '../utils/loginutils';

// import { LoginPage } from '../pageobject/login';

// test ('Login Test', async({page})=>{

//     const loginPage = new LoginPage(page);
//     await loginPage.goto();

//     await loginPage.login( 'standard_user',
//     'secret_sauce');

// });


test ('Login testing', async ({page})=>{

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await Login(page,'erds@gmail.com','Lol@pp#21');


})
