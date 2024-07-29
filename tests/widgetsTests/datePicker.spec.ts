import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Go to the Date Picker page by url. The Date Picker page has opened.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/date-picker");
  });

  test(' "Select Date" label shows current date', async ({ pageManager }) => {
    const todayDate = getTodayDate();
    await expect(pageManager.datePicker.Buttons.selectDateButton).toHaveValue(todayDate);
  });

  test("'Select Date and Time' label shows current date and time ", async ({ pageManager }) => {
    const currentDateTime = getCurrentDateTime();
    await expect(pageManager.datePicker.Buttons.selectDateAndTimeButton).toHaveValue(currentDateTime);
  });

  test("Click to the 'Select Date'. The opend window displays current date which is highlighted in color.", async ({ pageManager }) => {
    await pageManager.datePicker.Buttons.selectDateButton.click();
    await expect(pageManager.datePicker.Labels.selectedDayLabel).toContainText(getTodayDayNumber());
    await expect(pageManager.datePicker.Labels.selectedDayLabel).toHaveCSS(
      "background-color",
      "rgb(33, 107, 165)",
    )
  })

  test("Click to the 'Select Date'. Select a specific month and day. Selected values shows in Select Date Label.", async ({ page, pageManager }) => {
    await pageManager.datePicker.Buttons.selectDateButton.click();
    await pageManager.datePicker.Buttons.monthSelectButton.selectOption('2');
    await pageManager.datePicker.Buttons.yearSelectButton.selectOption('1998');
    await page.getByLabel('Choose Sunday, March 29th,').click();
    await expect(pageManager.datePicker.Buttons.selectDateButton).toHaveValue('03/29/1998');
  })

  test("Click to the 'Select Date and Time'. Select a specific month,day. Selected values shows in Select Date Label.", async ({ page, pageManager }) => {
    await pageManager.datePicker.Buttons.selectDateAndTimeButton.click();
    await page.locator('.react-datepicker__month-read-view--down-arrow').click();
    await page.getByText('March').click();
    await page.getByText('2024', { exact: true }).click();
    await page.locator('a').nth(3).click({clickCount: 25});
    await page.getByText('1998').click();
    await page.getByText('15:15').click();
    await expect(pageManager.datePicker.Buttons.selectDateAndTimeButton).toHaveValue('July 26, 2024 3:15 PM');

  })

  function getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  }

  function getCurrentDateTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return now.toLocaleString("en-US", options).replace(" at ", " ");
  }

  function getTodayDayNumber(): string {
    const today = new Date();
    return today.getDate().toString();
  }
});
