import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe('Open the main page of the site. Click to the Elements button. The elements page has opened.', () => {
    test.beforeEach (async ({page}) => {
        await page.goto("/elements");
    })


    test ('Click to Web Tables button. Click to the add button. Fill correct values. New member has been added', async ({pageManager,page}) => {
        const randomFirstName = pageManager.randomValues.getRandomFirstname();
        const randomLastName = pageManager.randomValues.getRandomLastName();
        const randomAge = pageManager.randomValues.getRandomAge();
        const randomEmail = pageManager.randomValues.getRandomEmail();
        const randomSalary = pageManager.randomValues.getRandomSalary();
        const randomDepartment = pageManager.randomValues.getRandomDepartment();
        await addRandomUserToWebTable(pageManager, randomFirstName, randomLastName, randomAge, randomEmail, randomSalary, randomDepartment);
        const expectedValues = [
            randomFirstName,
            randomLastName,
            randomAge,
            randomEmail,
            randomSalary,
            randomDepartment
        ];
        await verifyTableRow(page, 4, expectedValues);
})

    test ('Click to Web Tables button. Add new member. Delete new member. Member has been deleted.', async ({pageManager,page}) => {
        const randomFirstName = pageManager.randomValues.getRandomFirstname();
        const randomLastName = pageManager.randomValues.getRandomLastName();
        const randomAge = pageManager.randomValues.getRandomAge();
        const randomEmail = pageManager.randomValues.getRandomEmail();
        const randomSalary = pageManager.randomValues.getRandomSalary();
        const randomDepartment = pageManager.randomValues.getRandomDepartment();
        const resultOfFirstName = '';
        const resultOfLastName = '';
        const resultOfAge = '';
        const resultOfEmail = '';
        const resultOfSalary = '';
        const resultOfDepartment = '';
        await addRandomUserToWebTable(pageManager, randomFirstName, randomLastName, randomAge, randomEmail, randomSalary, randomDepartment);
        await pageManager.webTables.Buttons.deleteButton.click();
        const expectedValues = [
            resultOfFirstName,
            resultOfLastName,
            resultOfAge,
            resultOfEmail,
            resultOfSalary,
            resultOfDepartment,
        ];
        await verifyTableRow(page, 4, expectedValues);
})
test ('Click to Web Tables button. Add new member. Type in search field email of added user. User has been showed in table ', async ({pageManager,page}) => {
    const randomFirstName = pageManager.randomValues.getRandomFirstname();
    const randomLastName = pageManager.randomValues.getRandomLastName();
    const randomAge = pageManager.randomValues.getRandomAge();
    const randomEmail = pageManager.randomValues.getRandomEmail();
    const randomSalary = pageManager.randomValues.getRandomSalary();
    const randomDepartment = pageManager.randomValues.getRandomDepartment();
    await addRandomUserToWebTable(pageManager, randomFirstName, randomLastName, randomAge, randomEmail, randomSalary, randomDepartment);
    await pageManager.webTables.Fields.searchField.fill(randomEmail);
    await expect (page.locator('.rt-td').first()).toContainText(randomFirstName);
    await expect (page.locator('.rt-tr-group > .rt-tr > div:nth-child(2)').first()).toContainText(randomLastName);
    await expect (page.locator('.rt-tr-group > .rt-tr > div:nth-child(3)').first()).toContainText(randomAge);
    await expect (page.locator('.rt-tr-group > .rt-tr > div:nth-child(4)').first()).toContainText(randomEmail);
    await expect (page.locator('.rt-tr-group > .rt-tr > div:nth-child(5)').first()).toContainText(randomSalary);
    await expect (page.locator('.rt-tr-group > .rt-tr > div:nth-child(6)').first()).toContainText(randomDepartment);
})

async function addRandomUserToWebTable(pageManager: any, firstName: string, lastName: string, age: string, email: string, salary: string, department: string) {
    await pageManager.webTables.Buttons.webTalesButton.click();
    await pageManager.webTables.Buttons.addButton.click();
    await pageManager.webTables.Fields.firstNameField.fill(firstName);
    await pageManager.webTables.Fields.lastNameField.fill(lastName);
    await pageManager.webTables.Fields.ageField.fill(age);
    await pageManager.webTables.Fields.emailField.fill(email);
    await pageManager.webTables.Fields.salaryField.fill(salary);
    await pageManager.webTables.Fields.departmentField.fill(department);
    await pageManager.webTables.Buttons.submitButton.click();
}


async function verifyTableRow(page, rowIndex, expectedValues) {
    const selectors = [
        `div:nth-child(${rowIndex}) > .rt-tr > div:nth-child(1)`,
        `div:nth-child(${rowIndex}) > .rt-tr > div:nth-child(2)`,
        `div:nth-child(${rowIndex}) > .rt-tr > div:nth-child(3)`,
        `div:nth-child(${rowIndex}) > .rt-tr > div:nth-child(4)`,
        `div:nth-child(${rowIndex}) > .rt-tr > div:nth-child(5)`,
        `div:nth-child(${rowIndex}) > .rt-tr > div:nth-child(6)`,
    ];

    for (let i = 0; i < selectors.length; i++) {
        await expect(page.locator(selectors[i])).toContainText(expectedValues[i]);
    }
}

})