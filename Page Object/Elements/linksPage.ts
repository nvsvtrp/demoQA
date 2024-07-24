import { basePage } from "../basePage";
export class LinksPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        linksButton: this.page.locator("li").filter({hasText: /^Links$/ }),
        homeButton: this.page.locator ('#simpleLink'),
        homeVDBI2Button: this.page.locator ('#dynamicLink'),
        createdAPIButton: this.page.locator ('#created'),
        noContentAPIButton: this.page.locator ('#no-content'),
        movedAPIButton: this.page.locator ('#moved'),
        badRequestAPIButton: this.page.locator ('#bad-request'),
        unauthorizedAPIButton: this.page.locator ('#unauthorized'),
        forbiddenAPIButton: this.page.locator ('#forbidden'),
        notFoundAPIButton: this.page.locator ('#invalid-url'),
    }

    Labels = {
        resultLabel: this.page.locator ('#linkResponse'),
    }
}