import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Open login page", () => {
  let interceptedToken;
  let userId;

  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test.afterEach(async ({ pageManagerAPI }) => {
    if (interceptedToken && userId) {
      const response = await pageManagerAPI.loginAPI.deleteUser(interceptedToken, userId);
      expect(response.status()).toBe(204);
    }

  });

  test('Register user via API.', async ({ pageManager, pageManagerAPI }) => {
    const userName = pageManager.randomValues.getRandomUserName();
    const password = pageManager.randomValues.getRandomPassword();
    await pageManagerAPI.loginAPI.registerUserRequest(userName, password);
    await pageManager.login.Fields.userNameField.fill(userName);
    await pageManager.login.Fields.passwordField.fill(password);
    await pageManager.login.Buttons.loginButton.click();
    await expect(pageManager.login.Labels.userNameLabel).toContainText(userName);
  });

  test('Add book via API and delete user.', async ({ pageManager, pageManagerAPI, page }) => {
    const books = await pageManagerAPI.loginAPI.getBooks();
    const { isbn, title } = books[Math.floor(Math.random() * books.length)];
    const userName = pageManager.randomValues.getRandomUserName();
    const password = pageManager.randomValues.getRandomPassword();
    await pageManagerAPI.loginAPI.registerUserRequest(userName, password);
    userId = await pageManagerAPI.loginAPI.login(userName, password);
    interceptedToken = await pageManagerAPI.loginAPI.generateToken(userName, password);
    await pageManagerAPI.loginAPI.postBookToAccount(userId, isbn, interceptedToken);
    await pageManager.login.Fields.userNameField.fill(userName);
    await pageManager.login.Fields.passwordField.fill(password);
    const [response] = await Promise.all([
      page.waitForResponse(response => response.url().includes('/GenerateToken') && response.status() === 200), 
      pageManager.login.Buttons.loginButton.click()
    ]);
    const responseBody = await response.json();
    interceptedToken = responseBody.token;
    await expect(page.locator('[class="rt-tr -odd"]')).toContainText(title);
    await pageManagerAPI.loginAPI.deleteBook(isbn, userId, interceptedToken);
    await page.reload();
    await expect(page.locator('[class="rt-tr -odd"]')).toBeHidden();
  });
});

test.describe("Open login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test('Create account via API and delete account via API.', async ({ pageManager, pageManagerAPI, page }) => {
    const userName = pageManager.randomValues.getRandomUserName();
    const password = pageManager.randomValues.getRandomPassword();
    await pageManagerAPI.loginAPI.registerUserRequest(userName, password);
    const userId = await pageManagerAPI.loginAPI.login(userName, password);
    await pageManagerAPI.loginAPI.generateToken(userName, password);
    await pageManager.login.Fields.userNameField.fill(userName);
    await pageManager.login.Fields.passwordField.fill(password);
    const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes('/GenerateToken') && response.status() === 200), pageManager.login.Buttons.loginButton.click()]);
    const responseBody = await response.json();
    const interceptedToken = responseBody.token;
    await pageManagerAPI.loginAPI.deleteUser(interceptedToken, userId);
    await page.goto("/login");
    await pageManager.login.Buttons.logOutButton.click();
    await pageManager.login.Fields.userNameField.fill(userName);
    await pageManager.login.Fields.passwordField.fill(password);
    await pageManager.login.Buttons.loginButton.click();
    await expect(page.locator('#name')).toContainText('Invalid username or password!');
  });
});
