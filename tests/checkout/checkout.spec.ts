import { test, expect } from '@playwright/test';
import { standardUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('should show error message if checkout info is incomplete', async () => {
    const items = await inventoryPage.getItems();
    await items[0].addToCart();
    await inventoryPage.cartLink.click();

    await cartPage.checkoutButton.click();
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('should complete checkout successfully with valid info', async () => {
    const items = await inventoryPage.getItems();
    const item = items[0];
    const itemName = await item.getName();


    await test.step('Add product to cart', async () => {
      await item.addToCart();
      await inventoryPage.cartLink.click();
    });

    await test.step('Proceed to checkout and fill in customer info', async () => {
      await cartPage.checkoutButton.click();
      await checkoutPage.fillInfo('John', 'Doe', '12345');
    });

    await test.step('Overview page shows the selected product', async () => {
      
      await expect(checkoutPage.itemNames).toContainText(itemName);
    });

    await test.step('Finish the order and verify success', async () => {
      await checkoutPage.finish();
      await expect(checkoutPage.successHeader).toBeVisible();
      await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
    });
  });
});
