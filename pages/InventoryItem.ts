import { type Locator } from "@playwright/test";

export class InventoryItem {
  readonly root: Locator;
  readonly name: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.name = root.locator('[data-test="inventory-item-name"]');
    this.price = root.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = root.getByRole('button', { name: 'Add to cart' });
    this.removeButton = root.getByRole('button', { name: 'Remove' });
  }

  async openDetails() {
    await this.root.locator('[data-test$="-title-link"]').click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async remove() {
    await this.removeButton.click();
  }
}
