import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe ('Open the main page of the site. Click to the Elements button. The elements page has opened.', () => {
    test.beforeEach (async ({pageManager}) => {
        await pageManager.main.Buttons.elementsButton.click();
    })


    test('Click to the Dynamic Properties Button. The "Will enable" button must be clickable after 5 sec.', async ({pageManager, page}) => {
        await pageManager.dynamic.Buttons.dynamicPropertiesButton.click();
        await page.waitForTimeout(5000);
        await expect(pageManager.dynamic.Buttons.willEnableButton).toBeEnabled();
    })

    test('Click to the Dynamic Properties Button. Try to click to "Will enable" button lesss than 5 seconds. The "Will enable" button must be disabled', async ({pageManager, page}) => {
        await pageManager.dynamic.Buttons.dynamicPropertiesButton.click();
        await page.waitForTimeout(4900);
        await expect(pageManager.dynamic.Buttons.willEnableButton).toBeDisabled();
    })

    test('Click to the Dynamic Properties Button. The "Color Change" button change text color to red after 5 sec.', async ({pageManager, page}) => {
        await pageManager.dynamic.Buttons.dynamicPropertiesButton.click();
        await expect(pageManager.dynamic.Buttons.colorChangeButton).not.toHaveCSS('color', 'rgb(220, 53, 69)');
        await page.waitForTimeout(5000);
        await expect(pageManager.dynamic.Buttons.colorChangeButton).toHaveCSS('color', 'rgb(220, 53, 69)');
    })

    test('Click to the Dynamic Properties Button. Wait 5 seconds. Button "Visible After 5 Seconds" shold be visible', async ({pageManager, page}) => {
        await pageManager.dynamic.Buttons.dynamicPropertiesButton.click();
        await expect(pageManager.dynamic.Buttons.visibleAfterButton).not.toBeVisible();
        await page.waitForTimeout(5000);
        await expect(pageManager.dynamic.Buttons.visibleAfterButton).toBeVisible();
    })
    
})