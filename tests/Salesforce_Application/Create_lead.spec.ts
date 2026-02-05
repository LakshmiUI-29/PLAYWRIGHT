import  { test,chromium,firefox,webkit,expect } from "@playwright/test";
//import { channel } from "node:diagnostics_channel";
test.use({storageState:'data/salesforceStorage.json'});


test(`Test to launch browser`,async() => { // => fat arrow


    const browser = await chromium.launch({channel: "chrome", headless:false});
    const context = await browser.newContext();
    const page1 = await context.newPage();
    //const page2 = await context.newPage();



//nec.lakshmigoms-tpzd@force.com
//Radhu@29
   /* await page1.goto(`https://login.salesforce.com/`);
    await page1.fill(`//input[@id="username"]`, `gauthami.vn@testleaf.com`);
    await page1.fill(`//input[@id="password"]`, `Qeagle@2025`);
    await page1.click(`//input[@type="submit"]`);*/
    //await page1.click("(//span[@class='slds-var-m-top_xxx-small appItemLabel'])[4]");
    
    await page1.goto(`https://agility-page-2751.lightning.force.com/lightning/o/Lead/list?filterName=Recent`);
    await page1.getByText('Leads',{exact:true}).click();
    await page1.click("//a[@title='Leads']");
    await page1.click("//div[@title='New']");
    await page1.waitForTimeout(1000);
    await page1.fill("//input[@name='lastName']", "Gomathi");
    await page1.fill("//input[@name='Company']", "GOMS");
    
    await page1.click("//button[@name='SaveEdit']");
    await page1.waitForTimeout(1000);
    const successToast = page1.locator(
  "//div[contains(@class,'forceToastMessage') and contains(@class,'slds-theme--success')]"
);

    await expect.soft(successToast).toBeVisible({ timeout: 5000 });


});

    //await page2.goto(`https://www.flipkart.com/`)
/*import { test } from '@playwright/test';

test('Create Lead using storage session', async ({ page }) => {
    await page.goto('https://login.salesforce.com/');

    await page.getByText('Leads').click();
    await page.click("//div[@title='New']");
    await page.fill("//input[@name='LastName']", 'Gomathi');
    await page.fill("//input[@name='Company']", 'GOMS');
    await page.click("//button[@name='SaveEdit']");
});*/

