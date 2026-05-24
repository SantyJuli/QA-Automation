import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { problemUser } from '../test-data/users';

test.describe('Problem user - cart behavior', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(problemUser);

    inventoryPage = new InventoryPage(page);
  });

  test('should show cart badge with count 1 after adding a product', async () => {
    await (await inventoryPage.items())[0].addToCart();

    await expect(
      inventoryPage.cartBadge,
      'Cart badge should show 1 after adding a product',
    ).toHaveText('1');
  });

  // Known bug: Remove button does not actually remove the product for problem_user.
  // Test is expected to fail until the bug is fixed.
  test('should hide cart badge after removing product (KNOWN BUG — currently fails)', async () => {
    const item = (await inventoryPage.items())[0];
    item.addToCart();

    await expect(
      inventoryPage.cartBadge,
      'Cart badge should show 1 after adding a product',
    ).toHaveText('1');

    await item.remove();

    await expect(
      inventoryPage.cartBadge,
      'Cart badge should not be visible after removing product',
    ).not.toBeVisible();
  });
});
