import { test, expect } from '@playwright/test';
import { lockedOutUser } from '../test-data/users';
import { LoginPage } from '../pages/LoginPage';

test("error message on locked out user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(lockedOutUser);

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});