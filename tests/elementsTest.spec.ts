import { PageManager } from "../Page Object/pageManager";
import { test } from './baseTest';
import { expect } from "@playwright/test";

test.describe('New Todo', () => {
    test.beforeEach (async ({page, pageManager})=> {
    await pageManager.main.Buttons.elementsButton.click();
    })

test.afterEach (async ({page, pageManager})=> {
        
})

test ('Click to TextBox button. Enter correct data in the fields. The entered data appears in the botton field.', async ({page, pageManager}) => {
await pageManager.elements.TextBoxButtons.textBoxButton.click();
await pageManager.elements.TextBoxFields.fullNameField.fill('Kirill Kushnerau');
await pageManager.elements.TextBoxFields.emailField.fill('nasvaytrip@gmail.com');
await pageManager.elements.TextBoxFields.currentAdressField.fill('Pervomaiskaya st. 8');
await pageManager.elements.TextBoxFields.permanentAdressField.fill('Leninskaya st. 86');
await pageManager.elements.TextBoxButtons.submitButton.click();
await expect (pageManager.elements.TextBoxLabels.nameLabel).toContainText('Kirill Kushnerau');
await expect (pageManager.elements.TextBoxLabels.emailLabel).toContainText('nasvaytrip@gmail.com');
await expect (pageManager.elements.TextBoxLabels.currentAdressLabel).toContainText('Pervomaiskaya st. 8');
await expect (pageManager.elements.TextBoxLabels.permanentAdressLabel).toContainText('Leninskaya st. 86');
})

test ('Click to TextBox button. Enter incorrect data in email field. The entered data didnt appears in the botton field. The email field is highlighted in red.', async ({page, pageManager}) => {
    await pageManager.elements.TextBoxButtons.textBoxButton.click();
    await pageManager.elements.TextBoxFields.fullNameField.fill('Kirill Kushnerau');
    await pageManager.elements.TextBoxFields.emailField.fill('+37643');
    await pageManager.elements.TextBoxFields.currentAdressField.fill('Pervomaiskaya st. 8');
    await pageManager.elements.TextBoxFields.permanentAdressField.fill('Leninskaya st. 86');
    await pageManager.elements.TextBoxButtons.submitButton.click();
    await expect (pageManager.elements.TextBoxFields.fieldError).toBeVisible();
    await expect (pageManager.elements.TextBoxLabels.nameLabel).toBeHidden();
    await expect (pageManager.elements.TextBoxLabels.emailLabel).toBeHidden();
    await expect (pageManager.elements.TextBoxLabels.currentAdressLabel).toBeHidden();
    await expect (pageManager.elements.TextBoxLabels.permanentAdressLabel).toBeHidden();

})

test ('Click to CheckBox button. Click to the plus button. List is opened. Click to the minus button. List is closed.', async ({page, pageManager}) => {
    await pageManager.elements.CheckBoxButtons.checkBoxButton.click();
    await pageManager.elements.CheckBoxButtons.expandButton.click();
    await expect (page.getByText('Angular')).toBeVisible();
    await pageManager.elements.CheckBoxButtons.checkBoxButton.click();
    await pageManager.elements.CheckBoxButtons.collapseButton.click();
    await expect (page.getByText('Angular')).toBeHidden();
})

test ('Click to CheckBox button. Click to the Home checkbox. Result label show all branch.', async ({page, pageManager}) => {
    await pageManager.elements.CheckBoxButtons.checkBoxButton.click();
    await pageManager.elements.CheckBoxButtons.homeCheckbox.click();
    await expect (pageManager.elements.CheckBoxButtons.homeCheckbox).toBeChecked();
    await expect (pageManager.elements.CheckBoxLabels.resultLabel).toContainText('excelFile ');
})



})
