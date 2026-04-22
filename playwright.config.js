// @ts-check
import { defineConfig } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',             
   timeout :50*1000,
    retries: 1,
 

expect: {
    timeout: 50*1000 
       },

  reporter: 'html',  
  

  use: {
    browserName: 'chromium',
    headless: true,      
    Screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'       

  },

  

});
