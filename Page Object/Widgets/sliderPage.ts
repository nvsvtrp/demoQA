import { basePage } from "../basePage";
export class SliderPage extends basePage {
    constructor (page) {
        super (page)
    }

    Buttons = {
        sliderButton: this.page.locator('.range-slider.range-slider--primary'),
    }

    Labels = {
        valueSliderValue: this.page.locator('#sliderValue'),
        toolTipSliderLabel: this.page.locator('.range-slider__tooltip__label'),

    }
}