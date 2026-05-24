import { test, expect } from '@playwright/test';
import { standardUser, problemUser } from '../../test-data/users';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login - positive scenarios', () => {
  test('should redirect to inventory page after successful login with standard_user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(standardUser);

    await expect(page).toHaveURL(/inventory/);
  });

  test('should redirect to inventory page after successful login with problem_user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(problemUser);

    await expect(page).toHaveURL(/inventory/);
  });
});
