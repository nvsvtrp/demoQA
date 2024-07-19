import { Page } from "@playwright/test";
import { MainPage } from "./mainPage";
import { AlertsPage } from "./alertsPage";
import { BookPage } from "./bookPage";
import { ElementsPage } from "./elementsPage";
import { FormsPage } from "./formsPage";
import { InteractionsPage } from "./interactionsPage";
import { WidgetsPage } from "./widgetsPage";


export class PageManager {
    page: Page;
    main;
    alerts;
    book;
    elements;
    forms;
    interactions;
    widgets;


    constructor(page) {
        this.page = page;
        this.main = new MainPage(page);
        this.alerts = new AlertsPage(page);
        this.book = new BookPage(page);
        this.elements = new ElementsPage(page);
        this.forms = new FormsPage(page);
        this.interactions = new InteractionsPage(page);
        this.widgets = new WidgetsPage(page);
    }
}