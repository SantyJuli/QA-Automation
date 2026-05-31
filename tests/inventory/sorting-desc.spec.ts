import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { SortOptions } from '../../test-data/sort-options';

test.describe('Inventory - sorting', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
  });

  test('should sort products by price from high to low', async ({ page }) => {
    await inventoryPage.sortBy(SortOptions.PriceDesc);

    const texts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const prices = texts.map(t => parseFloat(t.replace('$', '')));

    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
