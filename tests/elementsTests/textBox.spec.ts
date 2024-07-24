import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe('Open the main page of the site. Click to the Elements button. The elements page has opened.', () => {
    test.beforeEach (async ({pageManager})=> {
    await pageManager.main.Buttons.elementsButton.click();
    }) 


    test ('Click to TextBox button. Enter correct data in the fields. The entered data appears in the botton field.', async ({pageManager}) => {
        const randomName = pageManager.randomValues.getRandomName();
        const randomEmail = pageManager.randomValues.getRandomEmail();
        const randomCurrentStreet = pageManager.randomValues.getRandomStreet();
        const randomPermanentStreet = pageManager.randomValues.getRandomStreet();
        await pageManager.textBox.Buttons.textBoxButton.click();
        await pageManager.textBox.Fields.fullNameField.fill(randomName);
        await pageManager.textBox.Fields.emailField.fill(randomEmail);
        await pageManager.textBox.Fields.currentAdressField.fill(randomCurrentStreet);
        await pageManager.textBox.Fields.permanentAdressField.fill(randomPermanentStreet);
        await pageManager.textBox.Buttons.submitButton.click();
        await expect (pageManager.textBox.Labels.nameLabel).toContainText(randomName);
        await expect (pageManager.textBox.Labels.emailLabel).toContainText(randomEmail);
        await expect (pageManager.textBox.Labels.currentAdressLabel).toContainText(randomCurrentStreet);
        await expect (pageManager.textBox.Labels.permanentAdressLabel).toContainText(randomPermanentStreet);
})
    test ('Click to TextBox button. Enter incorrect data in email field. The entered data didnt appears in the botton field. The email field is highlighted in red.', async ({page, pageManager}) => {
        const randomName = pageManager.randomValues.getRandomName();
        const randomCurrentStreet = pageManager.randomValues.getRandomStreet();
        const randomPermanentStreet = pageManager.randomValues.getRandomStreet();
        await pageManager.textBox.Buttons.textBoxButton.click();
        await pageManager.textBox.Fields.fullNameField.fill(randomName);
        await pageManager.textBox.Fields.emailField.fill('+37643');
        await pageManager.textBox.Fields.currentAdressField.fill(randomCurrentStreet);
        await pageManager.textBox.Fields.permanentAdressField.fill(randomPermanentStreet);
        await pageManager.textBox.Buttons.submitButton.click();
        await expect (pageManager.textBox.Fields.fieldError).toBeVisible();
        await expect(page.locator('.field-error')).toHaveCSS('border-color', 'rgb(255, 0, 0)');
        await expect (pageManager.textBox.Labels.nameLabel).toBeHidden();
        await expect (pageManager.textBox.Labels.emailLabel).toBeHidden();
        await expect (pageManager.textBox.Labels.currentAdressLabel).toBeHidden();
        await expect (pageManager.textBox.Labels.permanentAdressLabel).toBeHidden();

})

})