import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';
import { lockedOutUser } from '../test-data/users';

test.only("error message on locked out user", async ({ page }) => {
  await login(page, lockedOutUser);
  await expect(page.getByTestId("error")).toHaveText(
    "Epic sadface: Sorry, this user has been locked out." 
  );
});