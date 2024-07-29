import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Go to the Slider page by url. The Slider page has opened.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/slider");
  });

  test(' "Reduse slider to 0. The result displayed in the result window', async ({page,pageManager,}) => {
    await setSliderToZero(pageManager, page);
    await expect(pageManager.slider.Labels.valueSliderValue).toHaveValue("0");
  });

  test(' "Reduse slider to 0 and then we raise to 85. The result displayed in window under the slider', async ({page,pageManager,}) => {
    await setSliderToZero(pageManager, page);
    const slider = pageManager.slider.Buttons.sliderButton;
    let srcBound = await slider.boundingBox();
    await page.mouse.move(srcBound.x + 364, srcBound.y + srcBound.height / 2);
    await page.mouse.down();
    await expect(pageManager.slider.Labels.toolTipSliderLabel).toContainText("85");
  });

  async function setSliderToZero(pageManager, page) {
    const slider = pageManager.slider.Buttons.sliderButton;
    let srcBound = await slider.boundingBox();
    await page.mouse.move(srcBound.x, srcBound.y + srcBound.height / 2);
    await page.mouse.down();
  }
});
