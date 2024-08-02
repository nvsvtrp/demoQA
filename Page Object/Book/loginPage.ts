import { basePage } from "../basePage";
export class LoginPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        loginButton: this.page.locator('#login'),
        newUserButton: this.page.locator('#newUser'),
        registerButton: this.page.locator('#register'),
        backToLoginButton: this.page.locator('#gotologin'),
        logOutButton: this.page.locator('#submit'),
        goToBookStoreButton: this.page.locator('#gotoStore'),
        deleteAccountButton: this.page.locator(''),
        deleteAllBooksButton: this.page.locator(''),
    }

    Fields = {
        firstNameField: this.page.locator('#firstname'),
        lastNameField: this.page.locator('#lastname'),
        userNameField: this.page.locator('#userName'),
        passwordField: this.page.locator('#password'),
    }

    Labels = {
        userNameLabel: this.page.locator('#userName-value'),
        bookLabel: this.page.locator('[class="rt-tr -odd"]')
    }
    
}