import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe('Open the main page of the site. Click to the Elements button. The elements page has opened.', () => {
    test.beforeEach (async ({page})=> {
        await page.goto("/elements");
    }) 


    test ('Click to CheckBox button. Click to the plus button. List is opened. Click to the minus button. List is closed.', async ({page, pageManager}) => {
        await pageManager.checkBox.Buttons.checkBoxButton.click();
        await pageManager.checkBox.Buttons.expandButton.click();
        await expect (page.getByText('Angular')).toBeVisible();
        await pageManager.checkBox.Buttons.checkBoxButton.click();
        await pageManager.checkBox.Buttons.collapseButton.click();
        await expect (page.getByText('Angular')).toHaveCount(0);
    })

    test ('Click to CheckBox button. Click to the Home checkbox. Result label show all branch.', async ({page, pageManager}) => {
        await pageManager.checkBox.Buttons.checkBoxButton.click();
        await pageManager.checkBox.Buttons.homeCheckbox.click();
        await expect (pageManager.checkBox.Buttons.homeCheckbox).toBeChecked();
        await expect (pageManager.checkBox.Labels.resultLabel).toContainText('excelFile ');
    
    })

    test ('Click to CheckBox button. Click to the Home checkBox. Click to the downloads checkbox. Resulat label show downloads, wordFile and excelFile.', async ({page, pageManager}) => {
        await pageManager.checkBox.Buttons.checkBoxButton.click();
        await pageManager.checkBox.Buttons.arrowHomeButton.click();
        await page.getByText('Downloads').click();
        await expect (pageManager.checkBox.Labels.resultLabel).toContainText('excelFile ');
    })
})

