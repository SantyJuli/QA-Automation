import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/',{ timeout: 1000 });

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' },).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('page has the correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// NEGATIVE test — checks that something is NOT present.
// In QA, this is just as important as positive checks.
test('page does not contain error text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // .not.toBeVisible() = assert the element is NOT visible on the page
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
});
