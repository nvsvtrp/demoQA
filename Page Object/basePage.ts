import { Page } from "@playwright/test"

export class basePage {
page : Page

constructor(page : Page) {
    this.page = page;}
};