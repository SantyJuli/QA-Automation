import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Cart - removing products', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
  });

  test('should decrease cart badge count by one when removing one of three products', async () => {
    await expect(inventoryPage.cartBadge, 'Cart badge should not be visible').not.toBeVisible();

    const items = await inventoryPage.items();
    await items[0].addToCart();
    await items[1].addToCart();
    await items[2].addToCart();

    await items[0].remove();

    await expect(inventoryPage.cartBadge, 'Cart badge should show 2 after removing a product').toHaveText('2');
  });

  test('should hide cart badge after removing the only product in the cart', async () => {
    const backpack = inventoryPage.getItemByName('Sauce Labs Backpack');

    await backpack.addToCart();
    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding a product').toHaveText('1');

    await backpack.remove();
    await expect(inventoryPage.cartBadge, 'Cart badge should not be visible after removing product').not.toBeVisible();
  });
});
