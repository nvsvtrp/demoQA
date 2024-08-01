import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Open login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test('Register user via API.', async ({ pageManager, pageManagerAPI, page }) => {
    const userName = pageManager.randomValues.getRandomUserName();
    const password = pageManager.randomValues.getRandomPassword();
    await registerUser(userName, password, pageManager, pageManagerAPI, page);
    await pageManager.login.Fields.userNameField.fill(userName);
    await pageManager.login.Fields.passwordField.fill(password);
    await pageManager.login.Buttons.loginButton.click();
    await expect(pageManager.login.Labels.userNameLabel).toContainText(userName);
  });

  test('Add book via API.', async ({ pageManager, pageManagerAPI, page }) => {
    const userName = pageManager.randomValues.getRandomUserName();
    const password = pageManager.randomValues.getRandomPassword();
    await registerUser(userName, password, pageManager, pageManagerAPI, page);
    const isbn = await pageManagerAPI.loginAPI.getRandomBooksId();
    const token = await pageManagerAPI.loginAPI.generateToken(userName, password);
    const userId = await pageManagerAPI.loginAPI.login(userName, password);
    await pageManagerAPI.loginAPI.postBookToAccount(userId, isbn, token);
    await pageManager.login.Fields.userNameField.fill(userName);
    await pageManager.login.Fields.passwordField.fill(password);
    await pageManager.login.Buttons.loginButton.click();
    const bookInBagId = await pageManagerAPI.loginAPI.getUserBooks(userId, token)
    await expect(isbn).toContain(bookInBagId);
  });

  async function registerUser(userName: string, password: string, pageManager, pageManagerAPI, page) {
    await pageManager.login.Buttons.newUserButton.click();
    await pageManagerAPI.loginAPI.registerUserRequest(userName, password);
    await pageManager.login.Buttons.backToLoginButton.click();
  }

});
