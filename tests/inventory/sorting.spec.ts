import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory - sorting', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
  });

  test('should sort products by price from low to high', async () => {
    await inventoryPage.sortBy('lohi');

    const items = await inventoryPage.items();
    await expect(items[0].name).toHaveText('Sauce Labs Onesie');
  });
});
