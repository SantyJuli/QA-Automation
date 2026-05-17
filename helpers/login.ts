import { Page } from '@playwright/test';
import { User } from '../test-data/users';

export async function login(page: Page, user: User): Promise<void> {
  await page.goto('/');
  await page.getByTestId('username').fill(user.username);
  await page.getByTestId('password').fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();
}
