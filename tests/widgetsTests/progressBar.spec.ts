import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Go to the progress-bar page by url. The progress-bar page has opened.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/progress-bar");
  });

  test("Click button start. Wait 1 sec and press stop button. The result window should be filled with turquoise color.", async ({ page, pageManager }) => {
    await pageManager.progressBar.Buttons.startButton.click();
    await page.waitForTimeout(1000);
    await pageManager.progressBar.Buttons.stopButton.click();
    await expect(pageManager.progressBar.Labels.progressFilledBarLabel).toHaveCSS('background-color','rgb(23, 162, 184)',);
  });

  test("Click button start. Wait 4 sec and press stop button. The result window should be filled with 40% of the result  ", async ({ page, pageManager }) => {
    await pageManager.progressBar.Buttons.startButton.click();
    await page.waitForTimeout(4000);
    await pageManager.progressBar.Buttons.stopButton.click();
    await expect(pageManager.progressBar.Labels.progressFilledBarLabel).toHaveText('40%');
  });

  test("Technical compliance test ", async ({ page, pageManager }) => {
    await pageManager.progressBar.Buttons.startButton.click();
    await page.waitForTimeout(3500);
    await pageManager.progressBar.Buttons.stopButton.click();
    await expect(pageManager.progressBar.Labels.progressFilledBarLabel).toHaveCSS('width','206.125px',);
  });

});
