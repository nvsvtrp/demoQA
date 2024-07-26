import { basePage } from "../basePage";
export class UploadPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        uploadAndDownloadPageButton: this.page.getByText("Upload and Download"),
        downloadButton: this.page.locator('#downloadButton'),
        selectFileButton: this.page.locator('#uploadFile'),
    }

    Labels = {
        fileNameLabel: this.page.locator('#uploadFile'),
        pathFileLabel: this.page.locator('#uploadedFilePath'),
    }
}