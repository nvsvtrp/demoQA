import { PageManager } from "../../Page Object/pageManager";
import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe('Open the main page of the site. Click to the Buttons button. The buttons page has opened.', () => {
    test.beforeEach (async ({page, pageManager})=> {
    await pageManager.main.Buttons.elementsButton.click();  
    }) 


    test ('Click to Buttons button. Click to the Click Me Button. The result showed "You have done a dynamic click".', async ({pageManager}) => {
        await pageManager.buttons.Buttons.buttonsButton.click();
        await pageManager.buttons.Buttons.clickButton.click();
        await expect(pageManager.buttons.Labels.cllickResult).toContainText('You have done a dynamic click');
    })

    test ('Click to Buttons button. Click to the Double Click Button. The result showed "You have done a double click".', async ({pageManager}) => {
        await pageManager.buttons.Buttons.buttonsButton.click();
        await pageManager.buttons.Buttons.doubleClickButton.dblclick();
        await expect(pageManager.buttons.Labels.doubleClickResult).toContainText('You have done a double click');
    })

    test ('Click to Buttons button. Click to the Right Click Button. The result showed "You have done a right click".', async ({pageManager}) => {
        await pageManager.buttons.Buttons.buttonsButton.click();
        await pageManager.buttons.Buttons.rightClickButton.click({ button: 'right' });
        await expect(pageManager.buttons.Labels.rightClickResult).toContainText('You have done a right click');
    })

})