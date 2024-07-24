import { test } from "../baseTest";
import { expect } from "@playwright/test";
import { Page } from "@playwright/test";

test.describe('Open the main page of the site. Click to the Elements button. The Elements page has opened.', () => {
    test.beforeEach (async ({pageManager})=> {
    await pageManager.main.Buttons.elementsButton.click();
    }) 


    test ('Click to the Links Button. Click to Home button. Main page is opened in new tab.', async ({page, pageManager}) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.homeButton.click();
        const newTabPromise = page.waitForEvent('popup');
        const newTab = await newTabPromise;
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL("https://demoqa.com/");
        await newTab.close();
})

    test('Click to Links Button. Click to the Created button. API status code should be 201', async ({ page, pageManager }) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.createdAPIButton.click();
        await checkApiRequest(page, 'GET', 201, 'https://demoqa.com/created');
});

    test('Click to Links Button. Click to the No content button. API status code should be 204', async ({ page, pageManager }) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.noContentAPIButton.click();
        await checkApiRequest(page, 'GET', 204, 'https://demoqa.com/no-content');
});

    test('Click to Links Button. Click to the Moved button. API status code should be 301', async ({ page, pageManager }) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.movedAPIButton.click();
        await checkApiRequest(page, 'GET', 301, 'https://demoqa.com/moved');
});

    test('Click to Links Button. Click to the Bad Request button. API status code should be 400', async ({ page, pageManager }) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.badRequestAPIButton.click();
        await checkApiRequest(page, 'GET', 400, 'https://demoqa.com/bad-request');
});

    test('Click to Links Button. Click to the Unauthorized button. API status code should be 401', async ({ page, pageManager }) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.unauthorizedAPIButton.click();
        await checkApiRequest(page, 'GET', 401, 'https://demoqa.com/unauthorized');
});

    test('Click to Links Button. Click to the Forbidden button. API status code should be 403', async ({ page, pageManager }) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.forbiddenAPIButton.click();
        await checkApiRequest(page, 'GET', 403, 'https://demoqa.com/forbidden');
});

    test('Click to Links Button. Click to the Not Found button. API status code should be 404', async ({ page, pageManager }) => {
        await pageManager.links.Buttons.linksButton.click();
        await pageManager.links.Buttons.notFoundAPIButton.click();
        await checkApiRequest(page, 'GET', 404, 'https://demoqa.com/invalid-url');
});

async function checkApiRequest(page: Page, method: string, expectedStatus: number, expectedUrl: string) {
    const responsePromise = page.waitForResponse(response =>
    response.url() === expectedUrl && response.request().method() === method);
    const response = await responsePromise;
    expect(response.status()).toBe(expectedStatus);
    expect(response.url()).toBe(expectedUrl);
    expect(response.request().method()).toBe(method);
}
})
