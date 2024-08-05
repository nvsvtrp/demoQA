import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Open the main page of the site. Click to the Elements button. The Elements page has opened.", () => {
  test.beforeEach (async ({page}) => {
    await page.goto("/elements");
})

  test('Click to Upload and Download button. Click to Upload button. Choose file "sampleFile.jpeg". File path shold be displayed', async ({
    page,
    pageManager,
  }) => {
    await pageManager.upload.Buttons.uploadAndDownloadPageButton.click();
    const filePath = "C:\\Users\\LOCKED CLUB\\Downloads\\sampleFile.jpeg";
    await Promise.all([
      page.waitForEvent("filechooser"),
      pageManager.upload.Buttons.selectFileButton.click(),
    ]).then(async ([fileChooser]) => {
      await fileChooser.setFiles(filePath);
    });
    await expect(page.locator("#uploadedFilePath")).toContainText(
      "sampleFile.jpeg"
    );
  });

  test("Download file", async ({ page, pageManager }) => {
    const reliablePath = "sampleFile.jpeg";
    await pageManager.upload.Buttons.uploadAndDownloadPageButton.click();
    const [download] = await Promise.all([
      page.waitForEvent("download"), // wait for download to start
      page.locator("#downloadButton").click(),
    ]);
    await download.saveAs(reliablePath);
    // await download.delete();
    await page.waitForTimeout(4000);
  });
});