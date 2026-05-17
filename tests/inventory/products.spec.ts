import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { standardUser } from '../../test-data/users';

test.describe('Inventory - product listing', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, standardUser);
  });

  test('should display no more than 9 products on the page', async ({ page }) => {
    const count = await page.locator('.inventory_item').count();
    expect(count).toBeLessThanOrEqual(9);
  });

  test('should open product details when clicking product by name', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await items
      .filter({ hasText: 'Sauce Labs Bike Light' })
      .locator('[data-test="item-0-title-link"]')
      .click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
  });

  test('should open product details when clicking the second item in the list', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await items.nth(1).locator('[data-test="item-0-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
  });
});
