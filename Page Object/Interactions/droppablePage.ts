import { basePage } from "../basePage";
export class DroppablePage extends basePage {
    constructor (page) {
        super (page)
    }
    Buttons = {
        simpleDroppableButton: this.page.locator('#droppableExample-tab-simple'),
        acceptDroppableButton: this.page.locator('#droppableExample-tab-accept'),
        preventDroppableButton: this.page.locator('#droppableExample-tab-preventPropogation'),
        revertDroppableButton: this.page.locator('#droppableExample-tab-revertable'),
    }
    Labels = {
        simpleDragField: this.page.locator('#draggable'),
        simpleDropField: this.page.locator('#droppable'),
        acceptAcceptableDragField: this.page.locator('#acceptable'),
        acceptNotAcceptableDragField: this.page.locator('#notAcceptable'),
        acceptHiglightedDragField: this.page.locator('.drop-box.ui-droppable.ui-state-highlight'),
        acceptDropField: this.page.getByLabel('Accept').locator('#droppable'),
        preventDragField: this.page.locator('#dragBox'),
        preventFirstBigDropField: this.page.locator('#notGreedyDropBox'),
        preventFirstSmallDropField: this.page.locator('#notGreedyInnerDropBox'),
        preventSecondBigDropField: this.page.locator('#greedyDropBox'),
        preventSecondSmallDropField: this.page.locator('#greedyDropBoxInner'),
        willRevertDragField: this.page.locator('#revertable'),
        notRevertDragField: this.page.locator('#notRevertable'),
        revertDropField:  this.page.getByLabel("Revert Draggable").locator("#droppable"),
    }
    
}