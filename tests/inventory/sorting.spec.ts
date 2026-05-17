import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { standardUser } from '../../test-data/users';

test.describe('Inventory - sorting', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, standardUser);
  });

  test('should sort products by price from low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    await expect(
      page.locator('[data-test="inventory-item-name"]').first(),
    ).toHaveText('Sauce Labs Onesie');
  });
});
