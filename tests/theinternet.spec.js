
import{test,expect,chromium} from '@playwright/test'; 

test("The Internet practice test",async({})=>{ 


const browser = await chromium.launch();

const context = await browser.newContext();

const page = await context.newPage(); 


    await page.goto('https://the-internet.herokuapp.com/windows'); 


    await page.screenshot({ path: 'screenshot.png' });




//    // File donwload 
//     await page.getByText('File Download',{exact:true}).click(); 

//     const [download] = await Promise.all([ 
//             page.waitForEvent('download'), 
//             page.click('[href*="testfile"]') 
        
//         ]);

//          await download.saveAs('path/to/testfile.txt'); 


// //File uplpad 

//  await page.getByText('File Upload',{exact:true}).click(); 

//  await page.setInputFiles('input[type ="file"]' ,'path/to/file1.txt');

// //JS Aleart handling
// await page.getByText('JavaScript Alerts',{exact:true}).click(); 

// page.once('dialog', async dialog => {
//   await dialog.accept();
// });

// await page.getByRole('button', {
//   name: 'Click for JS Alert'
// }).click();

//  await page.getByText('JavaScript Alerts',{exact:true}).click(); 
// page.once('dialog', async dialog => {
//   await dialog.accept('Praveen');
// });

// await page.getByText('Hovers', { exact: true }).click();

// // hover on visible avatar image
// await page.getByRole('img', { name: 'User Avatar' }).first().hover();

// // now hidden caption/link becomes visible
// await page.locator('[href*="users/1"]').click();

// await expect(
//   page.getByRole('heading', { name: 'Not Found' })
// ).toBeVisible();


// await page.getByText('Drag and Drop', { exact: true }).click();

// const source =  page.locator('#column-a');

// const target =  page.locator('#column-b');

// await source.dragTo(target);

// await expect(page.locator('#column-a header')).toHaveText('B');


//file download 

// await page.getByText('File Download',{exact:'true'}).click();


// const[download] = await Promise.all([

//         page.waitForEvent('download'),

//       page.click('[href*="/testing.pdf"]')

// ]);
  
//     await download.saveAs('path/to/testing.pdf'); 



//new tab handeling 

// const[newPage] = await Promise.all([

//   context.waitForEvent('page'),
//   page.click('[href*="new"]')

// ]);

//     await newPage.waitForLoadState();

//     console.log(await newPage.title());

//     await expect(newPage.locator('h3'))
//         .toHaveText('New Window');





// //Alert

// page.once('dialog',async dialog=>
//   await dialog.accept('Praveen') );







 });




