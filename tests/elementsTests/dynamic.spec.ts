import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe ('Open the main page of the site. Click to the Elements button. The elements page has opened.', () => {
    test.beforeEach (async ({pageManager}) => {
        await pageManager.main.Buttons.elementsButton.click();
    })

    test('Click to the Dynamic Properties Button. The "Will enable" button must be clickable after 5 sec.', async ({ pageManager, page }) => {
        await pageManager.dynamic.Buttons.dynamicPropertiesButton.click();
        const startTime = Date.now();
        await expect(async () => {
            const isEnabled = await pageManager.dynamic.Buttons.willEnableButton.isEnabled();
            if (!isEnabled) throw new Error('Button is not enabled yet');
        }).toPass({
            timeout: 5100,
            intervals: [100]
        });
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 4900) { 
            console.log(`Button became clickable too early: after ${elapsedTime} ms`);
        } else {
            console.log(`Button became clickable after ${elapsedTime} ms`);
            await expect(pageManager.dynamic.Buttons.willEnableButton).toBeEnabled();
        }
    });

    test('Click to the Dynamic Properties Button. The text color of "Color Change" button must change after 5 sec.', async ({ pageManager, page }) => {
        await pageManager.dynamic.Buttons.dynamicPropertiesButton.click();
        const startTime = Date.now();
        await expect(async () => {
            const textColor = await pageManager.dynamic.Buttons.colorChangeButton.evaluate((el) => {
                return window.getComputedStyle(el).getPropertyValue('color');
            });
            if (textColor !== 'rgb(220, 53, 69)') throw new Error('Button text color has not changed yet');
        }).toPass({
            timeout: 5500,
            intervals: [100]
        });
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 4900) { 
            console.log(`Button text color changed too early: after ${elapsedTime} ms`);
        } else {
            console.log(`Button text color changed after ${elapsedTime} ms`);
            const finalTextColor = await pageManager.dynamic.Buttons.colorChangeButton.evaluate((el) => {
                return window.getComputedStyle(el).getPropertyValue('color');
            });
            expect(finalTextColor).toBe('rgb(220, 53, 69)');
        }
    })

    test('Click to the Dynamic Properties Button. The invisible button must appear after 5 sec.', async ({ pageManager, page }) => {
        await pageManager.dynamic.Buttons.dynamicPropertiesButton.click();
        const startTime = Date.now();
        await expect(async () => {
            const isVisible = await pageManager.dynamic.Buttons.visibleAfterButton.isVisible();
            if (!isVisible) throw new Error('Button is not visible yet');
        }).toPass({
            timeout: 5500,
            intervals: [100]
        });
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 4900) {
            console.log(`Button appeared too early: after ${elapsedTime} ms`);
            throw new Error('Button appeared before 5 seconds');
        } else {
            console.log(`Button appeared after ${elapsedTime} ms`);
            await expect(pageManager.dynamic.Buttons.visibleAfterButton).toBeVisible();
        }
    });
    
})