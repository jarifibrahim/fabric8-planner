import { browser } from 'protractor';
import { PlannerPage } from '../page_objects/planner';
import { SidePanel } from './../ui/planner/sidepanel';
import * as support from '../support';


describe('Work Item datatable list', () => {
  let planner: PlannerPage;
  let c = new support.Constants();

  beforeEach( async () => {
    await support.desktopTestSetup();
    planner = new PlannerPage(browser.baseUrl);
    await planner.openInBrowser();
    // This is necessary since the planner takes time to load on prod/prod-preview
    await browser.sleep(12000);
    await planner.ready();
  });

  it('should open settings button and hide columns', async () => {
    expect(await planner.workItemList.getDataTableHeaderCellCount()).toBe(10);
    await planner.settings.clickSettings();
    await planner.settings.selectAttribute(c.attribute1);
    await planner.settings.moveToAvailableAttribute();
    expect(await planner.workItemList.getDataTableHeaderCellCount()).toBe(9);
  });

  it('quick add should be disable for flat view', async() => {
    await planner.header.clickShowTree();
    await browser.sleep(2000);
    await planner.workItemList.overlay.untilHidden();
    expect(await planner.workItemList.getInlineQuickAddClass(c.workItemTitle1)).toContain('disable');
  });

  it('hideTree and create a work item then work item should be displayed when show tree is selected', async () => {
    await planner.header.clickShowTree();
    await planner.createWorkItem(c.newWorkItem1);
    expect(await planner.workItemList.hasWorkItem(c.newWorkItem1.title)).toBeTruthy();
    await planner.quickPreview.notificationToast.untilHidden();
    await planner.header.clickShowTree();
    expect(await planner.workItemList.hasWorkItem(c.newWorkItem1.title)).toBeTruthy();
  });

  it('check show completed and create a work item then update status to closed and uncheck show completed then work item should not visible in list', async() => {
    await planner.header.clickShowCompleted();
    await planner.workItemList.overlay.untilPresent();
    await planner.workItemList.overlay.untilAbsent();
    let newWorkItem = {
      title: 'Check for show complete work item'
    };
    await planner.createWorkItem(newWorkItem);
    expect(await planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
    await planner.workItemList.clickWorkItem(newWorkItem.title);
    await planner.quickPreview.changeStateToClose();
    await planner.quickPreview.close();
    await planner.header.clickShowCompleted();
    await planner.workItemList.overlay.untilPresent();
    await planner.workItemList.overlay.untilAbsent();
    expect(await planner.workItemList.hasWorkItem(newWorkItem.title)).toBeFalsy();
  });

  it('work item should show updated title when switching from flat to tree view', async() => {
    await planner.header.clickShowTree();
    await planner.workItemList.clickWorkItem(c.workItemTitle2);
    await planner.quickPreview.updateTitle(c.updatedWorkItem.title);
    await planner.quickPreview.close();
    expect(await planner.workItemList.hasWorkItem(c.updatedWorkItem.title)).toBeTruthy();
    await planner.header.clickShowTree();
    expect(await planner.workItemList.hasWorkItem(c.updatedWorkItem.title)).toBeTruthy();
  });

  it('list should not update when new label is added', async() => {
    await planner.workItemList.workItem(c.workItemTitle7).clickExpandWorkItem();
    await browser.sleep(3000);
    expect(await planner.workItemList.hasWorkItem(c.workItemTitle13)).toBeTruthy();
    await planner.workItemList.clickWorkItem(c.workItemTitle7);
    await planner.quickPreview.createNewLabel(c.newLabel1);
    await browser.sleep(3000);
    expect(await planner.workItemList.hasWorkItem(c.workItemTitle13)).toBeTruthy();
  });

  it('list should not update when new iteration is added', async() => {
    await planner.workItemList.workItem(c.workItemTitle7).clickExpandWorkItem();
    await browser.sleep(3000);
    expect(await planner.workItemList.hasWorkItem(c.workItemTitle13)).toBeTruthy();
    await planner.sidePanel.createNewIteration();
    await planner.iteration.addNewIteration(c.newIteration1, c.iteration3);
    await browser.sleep(3000);
    expect(await planner.workItemList.hasWorkItem(c.workItemTitle13)).toBeTruthy();
  });

  it ('matching child should be expanded initially', async() => {
    await planner.sidePanel.clickRequirement();
    await planner.workItemList.workItem(c.workItemTitle17).clickInlineQuickAdd();
    await planner.createInlineWorkItem(c.newWorkItem1);
    await browser.sleep(3000);
    await planner.sidePanel.clickScenarios();
    await browser.sleep(3000);
    await planner.sidePanel.clickRequirement();
    await browser.sleep(3000);
    expect(await planner.workItemList.hasWorkItem(c.newWorkItem1.title)).toBeTruthy();
  })
});
