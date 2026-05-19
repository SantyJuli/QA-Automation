import { test, expect } from "@playwright/test";
import { login } from "../helpers/login";
import { standardUser } from "../test-data/users";

test("login should redirect to inventory", async ({ page }) => {
  await login(page, standardUser);

  await expect(page).toHaveURL(/inventory/);
});

// Root cause:   [placeholder text was "User Name" but the actual placeholder is "Username"]
// Fix:          [changed to getByPlaceholder("Username")]
// How I verified: [ran npx playwright test --headed and confirmed the test passes.]

test("error message on wrong password", async ({ page }) => {
  await login(page, { username: "standard_user", password: "wrong_password" });

  await expect(page.getByTestId("error")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"   // ← is this the exact text?
  );
});

// Root cause:   [incorrect error text, but the actual error text is "Epic sadface: Username and password do not match any user in this service"]
// Fix:          [changed to getByPlaceholder("Username")]
// How I verified: [ran npx playwright test --headed and confirmed the test passes.]

test("cart badge appears after adding product", async ({ page }) => {
  await login(page, standardUser);

  await page.getByTestId("add-to-cart-sauce-labs-backpack").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

// Root cause:   [missed await before click]
// Fix:          [deleted locator and addedr await]
// How I verified: [ran npx playwright test --headed and confirmed the test passes.