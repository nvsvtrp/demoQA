import { test } from "../baseTest";
import { expect } from "@playwright/test";

test.describe("Go to the Slider page by url. The Slider page has opened.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/droppable");
    await page.waitForLoadState("load");
  });

  test("Open Simple Tab. Drag element to dropped field. Field 'Drop here' renamed to 'Dropped'and changed color ", async ({page}) => {
    await page.locator("#draggable").dragTo(page.locator("#droppable").first());
    await expect(page.locator("#droppable").first()).toHaveCSS("background-color", "rgb(70, 130, 180)");
    await expect(page.locator("#droppable").first()).toHaveText("Dropped!");
  });

  test("Open Accept Tab. Drag acceptable element to dropped field. Field 'Drop here' renamed to 'Dropped'and changed color", async ({pageManager,}) => {
    await pageManager.droppable.Buttons.acceptDroppableButton.click();
    await pageManager.droppable.Labels.acceptAcceptableDragField.dragTo(pageManager.droppable.Labels.acceptDropField);
    await expect(pageManager.droppable.Labels.acceptDropField).toHaveCSS("background-color", "rgb(70, 130, 180)");
    await expect(pageManager.droppable.Labels.acceptDropField).toHaveText("Dropped!");
  });

  test("Open Accept Tab. Drag not acceptable element to dropped field. Field 'Drop here' hasn't changed ", async ({pageManager,}) => {
    await pageManager.droppable.Buttons.acceptDroppableButton.click();
    await pageManager.droppable.Labels.acceptNotAcceptableDragField.dragTo(pageManager.droppable.Labels.acceptDropField);
    await expect(pageManager.droppable.Labels.acceptHiglightedDragField).toBeHidden();
    await expect(pageManager.droppable.Labels.acceptDropField).toHaveText("Drop here");
  });

  test("Open Prevent Propogation Tab. Drag element to 'Outer droppable' field. Field 'Outer droppable' and  renamed to 'Dropped'and changed color. Field 'Inner droppable (not greedy)' just changed color ", async ({page,pageManager}) => {
    await pageManager.droppable.Buttons.preventDroppableButton.click();
    await page.mouse.move(411, 588);
    await page.mouse.down();
    await page.mouse.move(601, 588);
    await page.mouse.up();
    await expect(pageManager.droppable.Labels.preventFirstBigDropField).toHaveCSS("background-color", "rgb(70, 130, 180)");
    await expect(pageManager.droppable.Labels.preventFirstBigDropField).toContainText("Dropped");
    await expect(pageManager.droppable.Labels.preventFirstSmallDropField).toContainText("Inner droppable (not greedy)");
  });

  test("Open Prevent Propogation Tab. Drag element to 'Inner droppable' field. Field 'Outer droppable' and 'Inner droppable (not greedy)' renamed to 'Dropped'and changed color. ", async ({page,pageManager}) => {
    await pageManager.droppable.Buttons.preventDroppableButton.click();
    await page.mouse.wheel(0, 500);
    await page.mouse.move(411, 88);
    await page.mouse.down();
    await page.mouse.move(611, 200);
    await page.mouse.up();
    await expect(pageManager.droppable.Labels.preventFirstBigDropField).toHaveCSS("background-color", "rgb(70, 130, 180)");
    await expect(pageManager.droppable.Labels.preventFirstBigDropField).toContainText("Dropped");
    await expect(pageManager.droppable.Labels.preventFirstSmallDropField).toContainText("Dropped");
  });

  test("Open Prevent Propogation Tab. Drag element to second 'Outer droppable' field.", async ({page,pageManager}) => {
    await pageManager.droppable.Buttons.preventDroppableButton.click();
    await page.mouse.wheel(0, 500);
    await page.mouse.move(411, 88);
    await page.mouse.down();
    await page.mouse.move(655, 362);
    await page.mouse.up();
    await expect(pageManager.droppable.Labels.preventSecondBigDropField).toHaveCSS("background-color", "rgb(70, 130, 180)");
    await expect(pageManager.droppable.Labels.preventSecondBigDropField).toContainText("Dropped");
    await expect(pageManager.droppable.Labels.preventSecondSmallDropField).toContainText("Inner droppable (greedy)");
  });

  test("Open Prevent Propogation Tab.", async ({ page, pageManager }) => {
    await pageManager.droppable.Buttons.preventDroppableButton.click();
    await page.mouse.wheel(0, 500);
    await page.mouse.move(411, 88);
    await page.mouse.down();
    await page.mouse.move(655, 462);
    await page.mouse.up();
    await expect(pageManager.droppable.Labels.preventSecondSmallDropField).toHaveCSS("background-color", "rgb(70, 130, 180)");
    await expect(pageManager.droppable.Labels.preventSecondSmallDropField).toContainText("Dropped");
    await expect(pageManager.droppable.Labels.preventSecondBigDropField).toContainText("Outer droppable");
  });

  test("Open Prevent Revert Tab.", async ({ page, pageManager }) => {
    await pageManager.droppable.Buttons.revertDroppableButton.click();
    await page.mouse.wheel(0, 300);
    const draggable = await pageManager.droppable.Labels.willRevertDragField;
    const initialPosition = await draggable.boundingBox();
    if (initialPosition === null) {
      throw new Error("Draggable element not found or not visible");
    }
    await draggable.dragTo(pageManager.droppable.Labels.revertDropField);
    await page.mouse.move(initialPosition.x, initialPosition.y);
    await page.mouse.down();
    await page.mouse.move(initialPosition.x + 50, initialPosition.y + 50);
    await page.mouse.up();
    await page.waitForTimeout(500);
    const finalPosition = await draggable.boundingBox();
    expect(finalPosition).not.toBeNull();
    expect(finalPosition?.x).toBeCloseTo(initialPosition.x, 1);
    expect(finalPosition?.y).toBeCloseTo(initialPosition.y, 1);
  });

  test("Open Prevent .", async ({ page, pageManager }) => {
    await pageManager.droppable.Buttons.revertDroppableButton.click();
    await page.mouse.wheel(0, 300);
    await pageManager.droppable.Labels.willRevertDragField.dragTo(pageManager.droppable.Labels.revertDropField);
    await expect(pageManager.droppable.Labels.revertDropField).toContainText("Dropped!");
    await expect(pageManager.droppable.Labels.revertDropField).toHaveCSS("background-color", "rgb(70, 130, 180)");
  });

  test("Open .", async ({ page, pageManager }) => {
    await pageManager.droppable.Buttons.revertDroppableButton.click();
    await page.mouse.wheel(0, 300);
    await pageManager.droppable.Labels.notRevertDragField.dragTo(pageManager.droppable.Labels.revertDropField);
    await expect(pageManager.droppable.Labels.revertDropField).toContainText("Dropped!");
    await expect(pageManager.droppable.Labels.revertDropField).toHaveCSS("background-color", "rgb(70, 130, 180)");
  });

  test("Open showpenb .", async ({ page, pageManager }) => {
    await pageManager.droppable.Buttons.revertDroppableButton.click();
    const draggable = pageManager.droppable.Labels.notRevertDragField;
    const dropzone = pageManager.droppable.Labels.revertDropField;
    const initialPosition = await draggable.boundingBox();
    if (initialPosition === null) {
      throw new Error("Draggable element not found or not visible");
    }
    await draggable.dragTo(dropzone);
    const droppedPosition = await draggable.boundingBox();
    expect(droppedPosition).not.toBeNull();
    expect(droppedPosition?.x).not.toBeCloseTo(initialPosition.x, 1);
    expect(droppedPosition?.y).not.toBeCloseTo(initialPosition.y, 1);
    await draggable.dragTo(pageManager.droppable.Labels.willRevertDragField);
    await page.waitForTimeout(1000)
    const finalPosition = await draggable.boundingBox();
    expect(finalPosition).toEqual(droppedPosition);
  });
});
