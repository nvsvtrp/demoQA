import {test as base} from '@playwright/test'
import { PageManager } from '../Page Object/pageManager'

export const test = base.extend<{ pageManager: PageManager }>({
    pageManager: async ({page}, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
    
page: async ({page}, use) => {
    await page.goto('https://demoqa.com/');
    await use(page);

}
})
