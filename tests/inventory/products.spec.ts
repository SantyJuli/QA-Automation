import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory - product listing', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
  });

  test('should display no more than 9 products on the page', async () => {
    const items = await inventoryPage.getItems();
    expect(items.length).toBeLessThanOrEqual(9);
  });

  test('should open product details when clicking product by name', async () => {

    await (await inventoryPage.getItems())[1].openDetails();

    await expect(inventoryPage.page).toHaveURL(/inventory-item\.html\?id=\d+/);

  });

  test('should open product details when clicking the second item in the list', async () => {
    const items = await inventoryPage.getItems();
    await items[1].openDetails();
    await expect(inventoryPage.page).toHaveURL(/inventory-item\.html\?id=\d+/);
  });
});
