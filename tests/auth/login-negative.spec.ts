import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login page - negative scenarios', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('should show error when password is incorrect', async ({ page }) => {

    await loginPage.login({ username: 'standard_user', password: 'wrong_password' });

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match');
  });

  test('should show "Username is required" error when both fields are empty', async ({ page }) => {

    await loginPage.login({ username: '', password: '' });

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage)
      .toContainText('Username is required');
  });

  test('should show "Username is required" error when username is empty', async ({ page }) => {

    await loginPage.login({ username: '', password: 'secret_sauce' });

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage)
      .toContainText('Username is required');
  });

  test('should show "Password is required" error when password is empty', async ({ page }) => {

    await loginPage.login({ username: 'standard_user', password: '' });

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage)
      .toContainText('Password is required');
  });
});
