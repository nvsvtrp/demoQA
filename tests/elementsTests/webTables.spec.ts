import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe('Open the main page of the site. Click to the Elements button. The elements page has opened.', () => {
    test.beforeEach (async ({pageManager})=> {
    await pageManager.main.Buttons.elementsButton.click();
    }) 


    test ('Click to Web Tables button. Click to the add button. Fill correct values. New member has been added', async ({pageManager,page}) => {
        const randomFirstName = pageManager.randomValues.getRandomFirstname();
        const randomLastName = pageManager.randomValues.getRandomLastName();
        const randomAge = pageManager.randomValues.getRandomAge();
        const randomEmail = pageManager.randomValues.getRandomEmail();
        const randomSalary = pageManager.randomValues.getRandomSalary();
        const randomDepartment = pageManager.randomValues.getRandomDepartment();
        await addRandomUserToWebTable(pageManager, randomFirstName, randomLastName, randomAge, randomEmail, randomSalary, randomDepartment);
        await expect (page.locator('div:nth-child(4) > .rt-tr > div').first()).toContainText(randomFirstName);
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(2)')).toContainText(randomLastName);
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(3)')).toContainText(randomAge);
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(4)')).toContainText(randomEmail);
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(5)')).toContainText(randomSalary);
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(6)')).toContainText(randomDepartment);
})

    test ('Click to Web Tables button. Add new member. Delete new member. Member has been deleted.', async ({pageManager,page}) => {
        const randomFirstName = pageManager.randomValues.getRandomFirstname();
        const randomLastName = pageManager.randomValues.getRandomLastName();
        const randomAge = pageManager.randomValues.getRandomAge();
        const randomEmail = pageManager.randomValues.getRandomEmail();
        const randomSalary = pageManager.randomValues.getRandomSalary();
        const randomDepartment = pageManager.randomValues.getRandomDepartment();
        await addRandomUserToWebTable(pageManager, randomFirstName, randomLastName, randomAge, randomEmail, randomSalary, randomDepartment);
        await pageManager.webTables.Buttons.deleteButton.click();
        await expect (page.locator('div:nth-child(4) > .rt-tr > div').first()).toContainText('');
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(2)')).toContainText('');
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(3)')).toContainText('');
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(4)')).toContainText('');
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(5)')).toContainText('');
        await expect (page.locator('div:nth-child(4) > .rt-tr > div:nth-child(6)')).toContainText('');
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





})