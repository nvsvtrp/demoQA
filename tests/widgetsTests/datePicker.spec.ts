import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Go to the Date Picker page by url. The Date Picker page has opened.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demoqa.com/date-picker");
  });

  test(' "Select Date" label shows todays date', async ({ pageManager }) => {
    const todayDate = getTodayDate();
    await expect(pageManager.datePicker.Buttons.selectDateButton).toHaveValue(todayDate);
  });

  test("Click to the Dynamic Properties Buter.", async ({ pageManager }) => {
    const currentDateTime = getCurrentDateTime();
    await expect(pageManager.datePicker.Buttons.selectDateAndTimeButton).toHaveValue(currentDateTime);
  });

  test("Click to the.", async ({ pageManager }) => {
    await pageManager.datePicker.Buttons.selectDateButton.click();
    await expect(pageManager.datePicker.Labels.selectedDayLabel).toContainText(getTodayDayNumber());
    await expect(pageManager.datePicker.Labels.selectedDayLabel).toHaveCSS(
      "background-color",
      "rgb(33, 107, 165)",
    )
  })

  test("Click to thed.", async ({ pageManager }) => {
    await pageManager.datePicker.Buttons.selectDateButton.click();
    await expect(pageManager.datePicker.Labels.selectedDayLabel).toContainText(getTodayDayNumber());
    await expect(pageManager.datePicker.Labels.selectedDayLabel).toHaveCSS(
      "background-color",
      "rgb(33, 107, 165)",
    )
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
