import { test } from "../baseTest";
import { expect } from "@playwright/test";


test.describe('Open the main page of the site. Click to the Elements button. The Elements page has opened.', () => {
    test.beforeEach (async ({page})=> {
        await page.goto("/elements");
    }) 

    test ('Click to BrokenLinks button. Click to the Valid Link. Link is opened.', async ({page, pageManager}) => {
       await pageManager.brokenLinks.Buttons.brokenLinksButton.click();
       await pageManager.brokenLinks.Buttons.validLinkButton.click();
       await expect(page).toHaveURL('https://demoqa.com/');
    })

    test ('Click to BrokenLinks button. Click to the Broken Link. Link is opened.', async ({page, pageManager}) => {
        await pageManager.brokenLinks.Buttons.brokenLinksButton.click();
        await pageManager.brokenLinks.Buttons.brokenLinkButton.click();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes/500');
     })


    test('Check if image is displayed', async ({ page, pageManager }) => {
        await pageManager.brokenLinks.Buttons.brokenLinksButton.click();
        const images = page.locator('img[src="/images/Toolsqa.jpg"]');
        const count = await images.count();
        expect(count).toBeGreaterThanOrEqual(2);
        const secondImage = images.nth(1);
        await expect(secondImage).toBeVisible();
        const isSecondImageLoaded = await secondImage.evaluate((img: HTMLImageElement) => {
        return img.complete && img.naturalHeight !== 0;
  })
        expect(isSecondImageLoaded).toBeTruthy();
})

    test('Check if image isgh displayed', async ({ page, pageManager }) => {
        await pageManager.brokenLinks.Buttons.brokenLinksButton.click();
        const secondImage = page.locator('img[src="//images/Toolsqa_1.jpg"]');
        await expect(secondImage).toBeHidden();
    })
    
})
