import { basePage } from "../basePage";
export class DynamicPage extends basePage {
  constructor(page) {
    super(page);
  }

  Buttons = {
    dynamicPropertiesButton: this.page.getByText("Dynamic Properties"),
    willEnableButton: this.page.locator("#enableAfter"),
    colorChangeButton: this.page.locator("#colorChange"),
    visibleAfterButton: this.page.locator("#visibleAfter"),
  };
}
