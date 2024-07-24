import { basePage } from "../basePage";
export class ButtonsPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        buttonsButton: this.page.getByText("Buttons"),
        doubleClickButton: this.page.locator('#doubleClickBtn'),
        rightClickButton: this.page.locator('#rightClickBtn'),
        clickButton: this.page.getByRole('button', { name: 'Click Me', exact: true }),
    }

    Labels = {
        doubleClickResult: this.page.locator('#doubleClickMessage'),
        rightClickResult: this.page.locator('#rightClickMessage'),
        cllickResult: this.page.locator('#dynamicClickMessage'),
    }
}