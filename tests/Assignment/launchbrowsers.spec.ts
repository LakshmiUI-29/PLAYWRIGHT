import { test, chromium, webkit, expect } from '@playwright/test';

test('Launch Edge and WebKit browsers', async () => {
  const edgeBrowser = await chromium.launch({ channel: 'msedge', headless: false });
  const edgePage = await edgeBrowser.newPage();
  await edgePage.goto('https://www.redbus.in');

  console.log(await edgePage.title());
  console.log(edgePage.url());

  //expect(edgePage.title()).toContain('redBus');

  await edgeBrowser.close();

  const webkitBrowser = await webkit.launch({ headless: false });
  const webkitPage = await webkitBrowser.newPage();
  await webkitPage.goto('https://www.flipkart.com');

  console.log(await webkitPage.title());
  console.log(webkitPage.url());

  //await edgeBrowser.close();
  //expect(webkitPage.title()).toContain('Flipkart');
  await webkitBrowser.close();
});
