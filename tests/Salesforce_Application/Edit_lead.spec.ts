import  { test,chromium,firefox,webkit,expect } from "@playwright/test";
//import { channel } from "node:diagnostics_channel";
test.use({storageState:'data/salesforceStorage.json'});


test(`Test to launch browser`,async() => { // => fat arrow


    const browser = await chromium.launch({channel: "chrome", headless:false});
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto(`https://agility-page-2751.lightning.force.com/lightning/o/Lead/list?filterName=Recent`);
    await page1.getByText('Leads',{exact:true}).click();
    await page1.click("//a[@title='Leads']");
    await page1.locator("(//span[@class='slds-checkbox--faux slds-checkbox_faux'])[2]").click();
    await page1.locator("//button[@title='Edit List']").click();
    //await page1.getByLabel('Title').fill('My Title');
    const titleInput = page1.locator(
  "//div[.//span[normalize-space()='Title']]//input[contains(@class,'slds-grow') and contains(@class,'input')]"
);

   await titleInput.fill('My Title');
   await page1.keyboard.press('Enter');
   const cell = page1.locator("(//span[@class='slds-truncate uiOutputText'])[2]");
   await cell.dblclick();

  // await page1.locator(
  //"(//span[@class='slds-truncate uiOutputText'])[2]").click();
   //await page1.locator("//button[@title='Edit Company: Item 1']").click();
   //await page1.keyboard.press('Enter');
   //await page1.locator("//button[contains(@class,'test-saveButton')]").click();
   await page1.locator("//input[@class='slds-grow input']").fill('updated');
   await page1.keyboard.press('Enter');
   await page1.locator("//button[contains(@class,'test-saveButton')]").click();
   //await page1.click("//button[@name='SaveEdit']");
   await page1.waitForTimeout(1000);

   /* await page1.locator("(//button[@class='slds-button slds-button_neutral' and contains(text(),'Edit')])[3]").click();
    await page1.waitForTimeout(1000);
    await page1.fill("//input[@name='lastName']", "Gomathiupdated");
    await page1.fill("//input[@name='Company']", "GOMSupdated");
    await page1.click("//button[@name='SaveEdit']");
    await page1.waitForTimeout(1000);*/
    const successToast = page1.locator("//div[contains(@class,'forceToastMessage') and contains(@class,'slds-theme--success')]");
    await expect.soft(successToast).toBeVisible({ timeout: 5000 });
});