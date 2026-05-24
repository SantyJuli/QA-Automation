import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { standardUser } from '../../test-data/users';

test.describe('Cart - adding products', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, standardUser);
  });

  test('should show cart badge with count 1 after adding a single product', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should show 1 after adding a product',
    ).toHaveText('1');
  });

  test('should show cart badge with count 3 after adding three products', async ({ page }) => {
    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should not be visible',
    ).not.toBeVisible();

    const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    await addToCartButtons.nth(0).click();
    await addToCartButtons.nth(1).click();
    await addToCartButtons.nth(2).click();

    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should show 3 after adding the products',
    ).toHaveText('3');
  });
});
