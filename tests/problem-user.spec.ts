import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { problemUser } from '../test-data/users';

test.describe('Problem user - cart behavior', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, problemUser);
  });

  test('should show cart badge with count 1 after adding a product', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should show 1 after adding a product',
    ).toHaveText('1');
  });

  // Known bug: Remove button does not actually remove the product for problem_user.
  // Test is expected to fail until the bug is fixed.
  test('should hide cart badge after removing product (KNOWN BUG — currently fails)', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should show 1 after adding a product',
    ).toHaveText('1');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should not be visible after removing product',
    ).not.toBeVisible();
  });
});
