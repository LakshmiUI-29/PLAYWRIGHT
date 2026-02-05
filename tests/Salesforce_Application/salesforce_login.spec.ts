import { test, chromium } from '@playwright/test';

test('Salesforce login and save storage', async ({page}) => {
    //const browser = await chromium.launch({ channel: 'chrome', headless: false });
    //const context = await browser.newContext();
    //const page = await context.newPage();

    await page.goto('https://login.salesforce.com/');
    await page.fill('#username', 'nec.lakshmigoms-tpzd@force.com');
    await page.fill('#password', 'Radhu@29');
    await page.click('#Login');
    await page.waitForTimeout(30000);
    //await page.waitForURL('**/lightning/**');
    
    await page.context().storageState({ path: 'data/salesforceStorage.json' });
   // await browser.close();
});
