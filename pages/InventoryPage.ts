import { type Locator, type Page } from "@playwright/test";
import { InventoryItem } from "./InventoryItem";
import { SortOptions } from "../test-data/sort-options";

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  private readonly itemsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
    this.itemsLocator = page.locator(".inventory_item");
  }

  async getItems(): Promise<InventoryItem[]> {
    return (await this.itemsLocator.all()).map(x => new InventoryItem(x));
  }

  async sortBy(option: SortOptions): Promise<void> {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }
}
