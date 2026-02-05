import { test,expect,chromium } from '@playwright/test';

test('Search Product and Add to Cart in Decathlon', async () => {

    const browser = await chromium.launch({ channel: 'chrome', headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.decathlon.in/', { waitUntil: 'domcontentloaded' });
});