import { Page } from "@playwright/test";
import { LoginApi } from "./Book/loginAPI";

export class PageManagerAPI {
    page: Page;
    loginAPI;
    
    constructor(page) {
        this.page = page;
        this.loginAPI = new LoginApi(page);
    }
    }