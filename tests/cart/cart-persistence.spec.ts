import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Cart - state persistence', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
  });

  test('should preserve cart contents after page reload', async () => {
    await inventoryPage.getItemByName('Sauce Labs Backpack').addToCart();

    await inventoryPage.reload();

    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after refresh').toHaveText('1');
  });
});
