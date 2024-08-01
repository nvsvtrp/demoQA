import { Page } from "@playwright/test"


export class baseAPI {
page : Page

constructor(page : Page) {
    this.page = page;}

    async GetResponceBody(response) {
        const body = await JSON.parse((await response.body()).toString());
        return body;
    }

};
