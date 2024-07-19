import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe('Open the main page of the site. Click to the Elements button. The elements page has opened.', () => {
    test.beforeEach (async ({pageManager})=> {
    await pageManager.main.Buttons.elementsButton.click();
    }) 


    test ('Click to TextBox button. Enter correct data in the fields. The entered data appears in the botton field.', async ({pageManager}) => {
        await pageManager.textBox.Buttons.textBoxButton.click();
        await pageManager.textBox.Fields.fullNameField.fill('Kirill Kushnerau');
        await pageManager.textBox.Fields.emailField.fill('nasvaytrip@gmail.com');
        await pageManager.textBox.Fields.currentAdressField.fill('Pervomaiskaya st. 8');
        await pageManager.textBox.Fields.permanentAdressField.fill('Leninskaya st. 86');
        await pageManager.textBox.Buttons.submitButton.click();
        await expect (pageManager.textBox.Labels.nameLabel).toContainText('Kirill Kushnerau');
        await expect (pageManager.textBox.Labels.emailLabel).toContainText('nasvaytrip@gmail.com');
        await expect (pageManager.textBox.Labels.currentAdressLabel).toContainText('Pervomaiskaya st. 8');
        await expect (pageManager.textBox.Labels.permanentAdressLabel).toContainText('Leninskaya st. 86');
})
    test ('Click to TextBox button. Enter incorrect data in email field. The entered data didnt appears in the botton field. The email field is highlighted in red.', async ({pageManager}) => {
        await pageManager.textBox.Buttons.textBoxButton.click();
        await pageManager.textBox.Fields.fullNameField.fill('Kirill Kushnerau');
        await pageManager.textBox.Fields.emailField.fill('+37643');
        await pageManager.textBox.Fields.currentAdressField.fill('Pervomaiskaya st. 8');
        await pageManager.textBox.Fields.permanentAdressField.fill('Leninskaya st. 86');
        await pageManager.textBox.Buttons.submitButton.click();
        await expect (pageManager.textBox.Fields.fieldError).toBeVisible();
        await expect (pageManager.textBox.Labels.nameLabel).toBeHidden();
        await expect (pageManager.textBox.Labels.emailLabel).toBeHidden();
        await expect (pageManager.textBox.Labels.currentAdressLabel).toBeHidden();
        await expect (pageManager.textBox.Labels.permanentAdressLabel).toBeHidden();

})
})