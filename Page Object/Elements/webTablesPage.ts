import { basePage } from "../basePage";
export class WebTablesPage extends basePage {
  constructor(page) {
    super(page);
  }
  Buttons = {
    webTalesButton: this.page.getByText("Web Tables"),
    addButton: this.page.locator("#addNewRecordButton"),
    submitButton: this.page.locator("#submit"),
    deleteButton: this.page.locator('#delete-record-4 path'),
  };
  Fields = {
    firstNameField: this.page.locator("#firstName"),
    lastNameField: this.page.locator("#lastName"),
    emailField: this.page.locator("#userEmail"),
    ageField: this.page.locator("#age"),
    salaryField: this.page.locator("#salary"),
    departmentField: this.page.locator("#department"),
    searchField: this.page.locator("#searchBox"),
  };


}
