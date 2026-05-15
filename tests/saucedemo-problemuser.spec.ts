import { test, expect } from '@playwright/test';

test.describe('Sauce Demo problem user', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('check inventory URL', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });

  test('add product and show count', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should show 1 after adding a product"
    ).toHaveText("1");
  });

  test('remove product and no count', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should show 1 after adding a product"
    ).toHaveText("1");

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

// Remove functionality is not working, bug. Test should fail
    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should not be visible after removing product"
    ).not.toBeVisible();
  });
});