import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart - contents', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('should show product name on cart page after adding it', async () => {
    const items = await inventoryPage.getItems();
    const item = items[0];
    const expectedName = await item.getName();
    await item.addToCart();
    await inventoryPage.cartLink.click();

    await expect(cartPage.itemNames).toContainText(expectedName);
  });
});
