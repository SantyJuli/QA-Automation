import { test, expect } from '@playwright/test';

test('verify Onliner ', async ({ page }) => {
  const baseUrl = 'https://www.onliner.by/'; // Реальный URL
  const logoText = 'Onlíner'; // Текст логотипа

  await page.goto(baseUrl, { timeout: 2330 }); //flaky
  // Проверяем title страницы (заголовок вкладки)
  await expect(page).toHaveTitle(logoText);
});

test('check mobile phones tab in catalog', async ({ page }) => {
  await page.goto('https://onliner.by/', { timeout: 10000 });

  const mobileLink = page.getByRole('link', {
    name: 'Мобильные телефоны',
    exact: true,
  });

  await expect(mobileLink).toBeVisible();

  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    mobileLink.click(),
  ]);

  await expect(
    page.getByRole('heading', { level: 1, name: 'Мобильные телефоны' })
  ).toBeVisible();
});