import { basePage } from "../basePage";
export class ProgressBarPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        startButton: this.page.locator('#startStopButton'),
        stopButton: this.page.locator('#startStopButton'),
        resetButton: this.page.locator('#resetButton'),
    }
    
    Labels = {
        progressBarLabel: this.page.locator('#progressBar'),
        progressFilledBarLabel: this.page.locator('.progress-bar.bg-info'),
    }
}