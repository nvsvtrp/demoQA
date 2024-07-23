import { basePage } from "../basePage";
export class BrokenLinksPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        brokenLinksButton: this.page.locator("li").filter({ hasText: "Broken Links - Images" }),
        validLinkButton: this.page.getByText('Click Here for Valid Link'),
        brokenLinkButton: this.page.getByText('Click Here for Broken Link'),
    }
    Images = {
        validImage: this.page.locator('[class="row"][src="/images/Toolsqa.jpg"]')
    }
}