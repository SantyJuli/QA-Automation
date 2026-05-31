import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  // Checkout info
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Overview
  readonly itemNames: Locator;
  readonly finishButton: Locator;

  // Finish
  readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.errorMessage = page.getByTestId('error');

    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    this.successHeader = page.getByTestId('complete-header');
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
