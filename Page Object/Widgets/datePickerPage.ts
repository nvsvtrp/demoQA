import { basePage } from "../basePage";
export class DatePickerPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        datePickerButton: this.page.locator("li").filter({ hasText: "Date Picker" }),
        selectDateButton: this.page.locator('#datePickerMonthYearInput'),
        selectDateAndTimeButton: this.page.locator('#dateAndTimePickerInput'),
        monthSelectButton: this.page.locator('.react-datepicker__month-select'),
        yearSelectButton: this.page.locator('.react-datepicker__year-select'),
    }

    Labels = {
        selectedDayLabel: this.page.locator('.react-datepicker__day--selected')
    }
}