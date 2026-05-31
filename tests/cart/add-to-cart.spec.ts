import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Cart - adding products', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
  });

  test('should show cart badge with count 1 after adding a single product', async () => {

    const items = await inventoryPage.getItems();
    await items[0].addToCart();

    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding a product').toHaveText('1');
  });

  test('should show cart badge with count 3 after adding three products', async () => {
    await expect(inventoryPage.cartBadge, 'Cart badge should not be visible before adding products').not.toBeVisible();

    const items = await inventoryPage.getItems();
    await items[0].addToCart();
    await items[1].addToCart();
    await items[2].addToCart();

    await expect(inventoryPage.cartBadge, 'Cart badge should show 3 after adding the products').toHaveText('3');
  });
});
