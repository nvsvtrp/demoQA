import { basePage } from "../basePage";
export class CheckBoxPage extends basePage {
  constructor(page) {
    super(page);
  }

  Buttons = {
    checkBoxButton: this.page.locator("li").filter({ hasText: "Check Box" }),
    expandButton: this.page.locator(".rct-option.rct-option-expand-all"),
    collapseButton: this.page.locator(".rct-option.rct-option-collapse-all"),
    homeCheckbox: this.page.locator('"Home"'),
    downloadsCheckbox: this.page.locator("#tree-node-downloads"),
    arrowHomeButton: this.page.locator(".rct-collapse.rct-collapse-btn"),
  };

  Labels = {
    resultLabel: this.page.locator("#result"),
  };
}
