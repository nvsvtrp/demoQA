import { test } from "../baseTest";
import { expect } from "@playwright/test";



test.describe('Open the main page of the site. Click to the Elements button. The Elements page has opened.', () => {
    test.beforeEach (async ({pageManager})=> {
    await pageManager.main.Buttons.elementsButton.click();
    }) 

    const path = require('path');

    test('Click to Upload and Download button. Click to Upload button. Choose file "sampleFile.jpeg". File path shold be displayed', async ({ page, pageManager }) => {
        await pageManager.upload.Buttons.uploadAndDownloadPageButton.click();
        const filePath = 'C:\\Users\\LOCKED CLUB\\Downloads\\sampleFile.jpeg';
        await Promise.all([page.waitForEvent('filechooser'), pageManager.upload.Buttons.selectFileButton.click()]).then(async ([fileChooser]) => {
        await fileChooser.setFiles(filePath);
        });
        await expect(page.locator('#uploadedFilePath')).toContainText('sampleFile.jpeg');
    });

    test('Check if file downloads successfully', async ({ page, pageManager }) => {
        const downloadPromise = page.waitForEvent('download');
        await pageManager.upload.Buttons.uploadAndDownloadPageButton.click();
        await pageManager.upload.Buttons.downloadButton.click();
        const download = await downloadPromise;
        await download.saveAs('C:/Users/LOCKED CLUB/Downloads/' + download.suggestedFilename());

    });

})