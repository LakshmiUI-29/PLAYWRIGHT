import { test, expect } from '@playwright/test';

test('complete purchase flow with price validation', async ({ page }) => {
  test.setTimeout(60000); // 60 second timeout for cloud execution
  // Login
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  
  // Verify login
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.locator('.inventory_list')).toBeVisible();
  
  // Select and add item to cart
  await page.click('[data-test="item-4-title-link"]');
  
  // Validate item price before adding to cart
  const itemPrice = await page.locator('[data-test="inventory-item-price"]').textContent();
  expect(itemPrice).toMatch(/\$\d+\.\d{2}/); // Validate price format
  
  await page.click('[data-test="add-to-cart"]');
  await page.click('[data-test="shopping-cart-link"]');
  
  // Checkout
  await page.click('[data-test="checkout"]');
  
  // Fill in personal info (cleaned up - no duplicate clicks)
  await page.fill('[data-test="firstName"]', 'Laksh');
  await page.fill('[data-test="lastName"]', 'N');
  await page.fill('[data-test="postalCode"]', '627009');
  
  await page.click('[data-test="continue"]');
  
  // Validate prices on review page
  const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
  const taxText = await page.locator('[data-test="tax-label"]').textContent();
  const totalText = await page.locator('[data-test="total-info-label"]').textContent();
  
  expect(subtotalText).toBeTruthy();
  expect(subtotalText).toContain('$');
  expect(taxText).toBeTruthy();
  expect(taxText).toContain('$');
  //expect(totalText).toBeTruthy();
  //expect(totalText).toContain('$');
  
  // Finish purchase
  await page.click('[data-test="finish"]');
  
  // Verify order completion
  const completeHeader = page.locator('[data-test="complete-header"]');
  await expect(completeHeader).toBeVisible();
  await expect(completeHeader).toContainText(/Thank you|Order complete/i);
  
  // Return to products
  await page.click('[data-test="back-to-products"]');
  await expect(page.locator('.inventory_list')).toBeVisible();
});
