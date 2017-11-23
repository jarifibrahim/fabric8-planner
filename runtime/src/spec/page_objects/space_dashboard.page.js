"use strict";
/*
  OSIO EE test - Page object model - The page hierarchy is:
  * landing.page.ts - User starts here - User selects "Log In" and is moved to the login page
  * login.page.ts - At this page the user selects the log in path, enters name/password
  * main_dashboard.page.ts - Account dashboard page - This is the user's top level page insisde of OSIO
  * space_dashboard.page.ts - Space dashboard page - From here the user is able to perform tasks inside the space
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const app_page_1 = require("./app.page");
const ui = require("../ui");
const add_to_space_dialog_1 = require("./space_dashboard/add_to_space_dialog");
/*
Page layout
|--------------------------------------------------------------------------------------------------------------------|
|                                          Top Navigation Bar                                                        |
| Left Navigation Bar            |                                                  | Right Navigation Bar           |
|                                |                                                  |                                |
|                                                                                                                    |
| Persistent navigation bar                                                                                          |
|--------------------------------------------------------------------------------------------------------------------|
|                                       |                                                                            |
|                                       |                                                                            |
|          Codebases                    |                       Stack Reporrs                                        |
|                                       |                                                                            |
|                                       |                                                                            |
|--------------------------------------------------------------------------------------------------------------------|
|                                       |                                    |                                       |
|                                       |                                    |                                       |
|          My Work Items                |             Pipelines              |        Environments                   |
|                                       |                                    |                                       |
|                                       |                                    |                                       |
|--------------------------------------------------------------------------------------------------------------------|
*/
class SpaceTabPage extends app_page_1.AppPage {
    constructor(spaceName) {
        super();
        this.spaceName = spaceName;
        this.mainNavBar = new ui.BaseElement(this.header.$('ul.nav.navbar-nav.navbar-primary.persistent-secondary'), 'Main Navigation Bar');
        this.planTab = new ui.Clickable(this.mainNavBar.element(protractor_1.by.cssContainingText('li', 'Plan')), 'Plan');
    }
    // todo: add ready when we can consider the headers ready
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.mainNavBar.ready();
            yield this.planTab.ready();
        });
    }
    gotoPlanTab() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.planTab.clickWhenReady();
            // NOTE: outside the dialog is outside of $(this)
            let planner = new PlannerTab(this.spaceName);
            yield planner.open();
            return planner;
        });
    }
}
class WorkItemQuickAdd extends ui.Clickable {
    constructor(el, name = 'Work Item Quick Add') {
        super(el, name);
        this.titleTextInput = new ui.TextInput(this.$('input.f8-quickadd-input'), 'Work item Title');
        this.buttonsDiv = this.$('div.f8-quickadd__wiblk-btn.pull-right');
        this.acceptButton = new ui.Button(this.buttonsDiv.$('button.btn.btn-primary'), '✓');
        this.cancelButton = new ui.Button(this.buttonsDiv.$('button.btn.btn-default'), 'x');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.untilClickable();
        });
    }
    createWorkItem({ title, description = '', type = 'feature' }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clickWhenReady();
            yield this.titleTextInput.ready();
            yield this.titleTextInput.enterText(title);
            yield this.cancelButton.untilClickable();
            yield this.acceptButton.clickWhenReady();
            // TODO add more confirmation that the item has been added
            yield this.cancelButton.clickWhenReady();
            // TODO choose the type of item
            this.log('New WorkItem', `${title} added`);
        });
    }
}
class WorkItemList extends ui.BaseElement {
    constructor(el, name = 'Work Item List') {
        super(el, name);
        this.overlay = new ui.BaseElement(this.$('div.lock-overlay-list'));
        this.quickAdd = new WorkItemQuickAdd(this.$('#workItemList_quickAdd > alm-work-item-quick-add > div'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.overlay.untilAbsent();
            yield this.quickAdd.ready();
        });
    }
}
// this is what you see when you click on the Plan Tab button
class PlannerTab extends SpaceTabPage {
    constructor(spaceName) {
        super(spaceName);
        this.spaceName = spaceName;
        this.workItemList = new WorkItemList(this.appTag.$('alm-work-item-list'));
        this.url = `${protractor_1.browser.params.login.user}/${spaceName}/plan`;
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.workItemList.ready();
        });
    }
    createWorkItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug('create item', JSON.stringify(item));
            yield this.workItemList.quickAdd.createWorkItem(item);
        });
    }
}
// The main page that represents a Space
class SpaceDashboardPage extends SpaceTabPage {
    constructor(spaceName) {
        super(spaceName);
        /* Dialog to create new space and project */
        this.newSpaceName = protractor_1.$('#name');
        this.createSpaceButton = protractor_1.$('#createSpaceButton');
        this.devProcessPulldown = protractor_1.$('#developmentProcess');
        /* Analyze/Plan/Create - Navigation bar elements unique to space home display */
        this.headerAnalyze = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Analyze\')]'));
        this.headerPlan = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Plan\')]'));
        /* Dialog to create new project/add to space */
        // tslint:disable:max-line-length
        this.wizardStepTitle = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'wizard-step-title\') and contains(text(),\'Quickstart\')]'));
        // tslint:enable:max-line-length
        this.closeButton = protractor_1.$('#pficon.pficon-close');
        this.cancelButton = this.wizardStepTitle.element(protractor_1.by.buttonText('Cancel'));
        /* Associate github repo in code base */
        this.gitHubRepo = protractor_1.$('#gitHubRepo');
        /* UI Page Section: Analyze Overview (main body of page Bar */
        /* UI Page Section: Codebases */
        this.codebases = protractor_1.$('#spacehome-codebases-card');
        /* Codebases section title/link */
        this.codebasesSectionTitle = protractor_1.$('#spacehome-codebases-title');
        /* Codebases create code base link */
        // tslint:disable:max-line-length
        this.codebasesCreateLink = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'card-pf-title\')]/..//*[contains(text(), \'Create Codebase\')]'));
        this.addCodebaseButton = this.codebases.element(protractor_1.by.buttonText('Add Codebase'));
        /* UI Page Section: Analytics/Stack Reports */
        this.stackReports = protractor_1.$('#spacehome-analytical-report-card');
        /* Stack/Analytical Reports */
        this.stackReportsSectionTitle = protractor_1.$('#spacehome-analytical-report-title');
        this.stackReportsButton = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'stack-reports-btn\')]'));
        this.stackReportSection = protractor_1.$('#fabric8-stack-analysis');
        this.stackReportSummaries = protractor_1.$('#stack-report-inshort');
        this.stackReportFindingsInShort = protractor_1.$('#findings-inshort');
        this.stackReportSummaryInShort = protractor_1.$('#summary-inshort');
        this.stackReportRecommendationsInShort = protractor_1.$('#recommendations-inshort');
        this.stackReportDetailedReport = protractor_1.$('#modal.in.fade');
        this.detailedReportHeading = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Stack report\')]/..'));
        this.detailedAnalysisHeading = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Detail analysis of your stack components\')]'));
        this.additionalComponentsHeading = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Additional components recommended by Openshift IO\')]'));
        this.dependenciesTable = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Detail analysis of your stack components\')]/../../../../../div[2]/div/component-level-information/div/div/table'));
        this.dependenciesTableViewToggle = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Detail analysis of your stack components\')]/../i'));
        this.additionalComponentsTable = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Additional components recommended by Openshift IO\')]/../../../../../div[2]/div/component-level-information/div/div/table'));
        this.additionalComponentsTableViewToggle = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Additional components recommended by Openshift IO\')]/../i'));
        this.analyticsCloseButton = protractor_1.element(protractor_1.by.xpath('.//h4[contains(text(),\'Report title on Application\')]/../button'));
        // tslint:enable:max-line-length
        /* UI Page Section: My Workitems */
        this.workitems = protractor_1.$('#spacehome-my-workitems-card');
        /* My Workitems section title/link */
        this.workitemsSectionTitle = protractor_1.$('#spacehome-my-workitems-title');
        this.createWorkitemButton = protractor_1.$('#spacehome-my-workitems-create-button');
        /* UI Page Section: Pipelines */
        this.pipelines = protractor_1.$('#spacehome-pipelines-card');
        /* Pipelines section title/link */
        this.pipelinesSectionTitle = protractor_1.$('#spacehome-pipelines-title');
        this.addToSpaceButton = this.innerElement(ui.Button, '#analyze-overview-add-to-space-button', 'Add to space');
        /* UI Page Section: Environments */
        this.environments = protractor_1.$('spacehome-environments-card');
        /* Environments section title/link */
        this.environmentsSectionTitle = protractor_1.$('#spacehome-environments-title');
        /* The "Create" subpage of the space home page */
        this.headerCreate = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Create\')]'));
        this.headerCodebases = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(),\'Codebases\')]'));
        /* Pipelines tab under Create */
        this.headerPipelines = protractor_1.element(protractor_1.by.xpath('.//span[contains(text(),\'Pipelines\')]'));
        /* Workspaces tab under Create */
        this.createWorkspace = protractor_1.element(protractor_1.by.xpath('.//codebases-item-workspaces[1]'));
        /* Fade-in background for when the add to space dialog is present */
        this.fadeIn = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'modal-backdrop fade in\')]'));
        this.modalFade = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'modal fade\')]'));
        this.wizardSidebar = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'wizard-pf-sidebar\')]'));
        // TODO: create a better way to access globals like username
        this.url = `${protractor_1.browser.params.login.user}/${spaceName}`;
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.addToSpaceButton.ready();
        });
    }
    addToSpace() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addToSpaceButton.clickWhenReady();
            // NOTE: outside the dialog is outside of $(this)
            let wizard = new add_to_space_dialog_1.AddToSpaceDialog(protractor_1.$('body > modal-container > div.modal-dialog'));
            yield wizard.open();
            return wizard;
        });
    }
}
exports.SpaceDashboardPage = SpaceDashboardPage;
//# sourceMappingURL=space_dashboard.page.js.map