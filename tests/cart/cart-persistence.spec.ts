import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { standardUser } from '../../test-data/users';

test.describe('Cart - state persistence', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, standardUser);
  });

  test('should preserve cart contents after page reload', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await page.reload();

    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should show 1 after refresh',
    ).toHaveText('1');
  });
});
