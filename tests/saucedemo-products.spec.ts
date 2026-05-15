
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo negative login', () => {
  test('shows error for wrong credentials', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('nosecret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Username and password do not match');
  });

  test('shows error for no credentials', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Username is required');
  });

  test('shows error with no username', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Username is required');
  });

  test('shows error with no password', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Password is required');
  });

});

test.describe('Sauce Demo products', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('check inventory URL', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });

  test('count elements', async ({ page }) => {
    const count = await page.locator('.inventory_item').count();
    expect(count).toBeLessThanOrEqual(9);
  });

  test('click by text using filter', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await items
      .filter({ hasText: 'Sauce Labs Bike Light' })
      .locator('[data-test="item-0-title-link"]')
      .click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
  });

  test('click 2nd element', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await items.nth(1).locator('[data-test="item-0-title-link"]').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
  });

  test('add product and show count', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should show 1 after adding a product"
    ).toHaveText("1");
  });

  test('add 3 products and show count', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should not be visible"
    ).not.toBeVisible();

    const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    await addToCartButtons.nth(0).click();
    await addToCartButtons.nth(1).click();
    await addToCartButtons.nth(2).click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should show 3 after adding the products"
    ).toHaveText("3");
  });

  test('remove 1 product should decrease count', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should not be visible"
    ).not.toBeVisible();

    const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });

    await addToCartButtons.nth(0).click();
    await addToCartButtons.nth(1).click();
    await addToCartButtons.nth(2).click();

    const removeButtons = page.getByRole('button', { name: 'Remove' });

    await removeButtons.nth(0).click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should show 2 after removing a product"
    ).toHaveText("2");

  });

  test('remove product and no count', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should show 1 after adding a product"
    ).toHaveText("1");

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(
      page.locator(".shopping_cart_badge"),
      "Cart badge should not be visible after removing product"
    ).not.toBeVisible();

  });

});