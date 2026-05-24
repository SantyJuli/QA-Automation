import { test, expect } from '@playwright/test';

test.describe('Login page - negative scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show error when password is incorrect', async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.getByTestId('error');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Username and password do not match');
  });

  test('should show "Username is required" error when both fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.getByTestId('error');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Username is required');
  });

  test('should show "Username is required" error when username is empty', async ({ page }) => {
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.getByTestId('error');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Username is required');
  });

  test('should show "Password is required" error when password is empty', async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.getByTestId('error');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage)
      .toContainText('Password is required');
  });
});
