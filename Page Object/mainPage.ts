import { basePage } from "./basePage";
export class MainPage extends basePage {
    constructor (page) {
        super (page)
    }


Buttons = {
    elementsButton: this.page.locator('div').filter({ hasText: /^Elements$/ }).nth(2),
    formsButton: this.page.locator('div').filter({ hasText: /^Forms$/ }).nth(2),
    alertsButton: this.page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).nth(2),
    wigetsButton: this.page.locator('div').filter({ hasText: /^Widgets$/ }).nth(2),
    interactionsButton: this.page.locator('div').filter({ hasText: /^Interactions$/ }).nth(2),
    bookButton: this.page.locator('div').filter({ hasText: /^Book Store Application$/ }).nth(2),

}
}