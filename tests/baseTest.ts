import { test as base } from '@playwright/test'
import { PageManager } from '../Page Object/pageManager'
import { PageManagerAPI } from '../Page Object/pageManagerAPI';

export const test = base.extend<{ pageManager: PageManager, pageManagerAPI }>({
    pageManager: async ({page}, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },

    pageManagerAPI: async ({page}, use) => {
        const pageManagerAPI = new PageManagerAPI(page);
        await use(pageManagerAPI);
    },
    
// page: async ({page}, use) => {
//     await page.goto('https://demoqa.com/');
//     await use(page);

// }
})
