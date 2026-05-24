import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { standardUser } from '../../test-data/users';

test.describe('Cart - removing products', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, standardUser);
  });

  test('should decrease cart badge count by one when removing one of three products', async ({ page }) => {
    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should not be visible',
    ).not.toBeVisible();

    const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    await addToCartButtons.nth(0).click();
    await addToCartButtons.nth(1).click();
    await addToCartButtons.nth(2).click();

    const removeButtons = page.getByRole('button', { name: 'Remove' });
    await removeButtons.nth(0).click();

    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should show 2 after removing a product',
    ).toHaveText('2');
  });

  test('should hide cart badge after removing the only product in the cart', async ({ page }) => {
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
