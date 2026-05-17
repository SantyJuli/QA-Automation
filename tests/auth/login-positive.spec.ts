import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { standardUser, problemUser } from '../../test-data/users';

test.describe('Login - positive scenarios', () => {
  test('should redirect to inventory page after successful login with standard_user', async ({ page }) => {
    await login(page, standardUser);

    await expect(page).toHaveURL(/inventory/);
  });

  test('should redirect to inventory page after successful login with problem_user', async ({ page }) => {
    await login(page, problemUser);

    await expect(page).toHaveURL(/inventory/);
  });
});
