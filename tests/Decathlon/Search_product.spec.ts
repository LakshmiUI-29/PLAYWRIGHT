import { test,expect,chromium } from '@playwright/test';

test('Search Product and Add to Cart in Decathlon', async () => {

    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.decathlon.in/', { waitUntil: 'domcontentloaded' });
    await page.pause();
    await expect(page).toHaveURL('https://www.decathlon.in/')
    await expect(page.locator("//*[local-name()='svg' and contains(@class,'cursor-pointer')]")).toBeVisible();
    const searchIcon = page.locator("svg.text-grey-500").first();
    await expect(searchIcon).toBeVisible({ timeout: 10000 });
    await searchIcon.click();

  
     const searchInput = page.getByRole('textbox');
     await expect(searchInput).toBeVisible({ timeout: 10000 });
     await expect(searchInput).toBeEnabled();

 
     await searchInput.fill('Shoes');
    //const searchBox = page.locator("//input[contains(@placeholder,'Search')]");
   // await expect(searchBox).toBeVisible();
   // await expect(searchBox).toBeEnabled();
   // await searchBox.click();
 
   // await searchBox.fill('Shoes');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*Shoes.*/);
    //await expect(page.getByText(/shoes/i)).toBeVisible();
    await page.locator("//span[@class='ais-Panel-header' and contains(text(),'Sport')]").click();
    await page.locator("//span[@class='aisRefinementListLabelText' and contains(text(),'Running')]").click();
    await page.mouse.wheel(0, -1000);
    await page.waitForLoadState('domcontentloaded');
    await page.locator("//span[@class='aisRefinementListLabelText' and contains(text(),'Men')]").click();
    await page.locator("//span[@class='ais-Panel-header' and contains(text(),'Size')]").click();

    const uk10Size = page.locator("//span[@class='aisRefinementListLabelText' and contains(text(),'Uk 10')]");
    //await uk10Size.scrollIntoViewIfNeeded();
    await uk10Size.click();
    async function setPriceRange(page) {
  const slider = page.locator('[class*="slider"]').first();
  await slider.scrollIntoViewIfNeeded();

  const box = await slider.boundingBox();
  if (!box) throw new Error('Slider not visible');

  const y = box.y + box.height / 2;

  // Move MIN handle left → right
  await page.mouse.move(box.x + 8, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.15, y); // adjust this
  await page.mouse.up();

  await page.waitForTimeout(800); // debounce

  // Move MAX handle right → left
  await page.mouse.move(box.x + box.width - 8, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.75, y); // adjust this
  await page.mouse.up();

  await page.waitForTimeout(800);
}

await setPriceRange(page);



    //await setPriceRange(page); // ≈ ₹1000–₹3000
    await page.waitForLoadState('domcontentloaded');
    const firstProduct = page.locator("//p[@class='text-12 lg:text-14 text-black']")
    await firstProduct.first().click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator("//div[contains(text(),'10.5')]").click();
    const addToCartButton = page.locator("//span[@class='font-medium text-white']");
    //const firstProduct = page.locator("//div[@data-testid='product-card']").first();
    //await page.pause();

    await addToCartButton.click();
    const successPopup = page.locator("//*[contains(text(),'added to cart') or contains(text(),'Added to Cart')]");

await expect(successPopup).toBeVisible({ timeout: 10000 });
});