"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  OSIO EE test - Page object model - The page hierarchy is:
  * landing.page.ts - User starts here - User selects "Log In" and is moved to the login page
  * login.page.ts - At this page the user selects the log in path, enters name/password
  * main_dashboard.page.ts - Account dashboard page - This is the user's top level page insisde of OSIO
  * space_dashboard.page.ts - Space dashboard page - From here the user is able to perform tasks inside the space
*/
// tslint:disable:max-line-length
const protractor_1 = require("protractor");
// tslint:ensable:max-line-length
const app_page_1 = require("./app.page");
const ui_1 = require("../ui");
class SpacePipelinePage extends app_page_1.AppPage {
    constructor() {
        super(...arguments);
        /* Page UI element - contains all pipelines */
        this.pipelinesPage = protractor_1.element(protractor_1.by.xpath('.//*[contains (@class,\'pipelines-page\')]'));
        /* List of all pipelines */
        this.pipelinesList = protractor_1.$('#pipeline-list');
        /* Kebab displayed after build pipeline performs stage and test */
        this.pipelineKebab = new ui_1.Button(protractor_1.$('#dropdownKebabRight9'), 'Pipeline kebab');
        /* Kebab displayed after build pipeline performs stage and test */
        this.pipelineKebabStartPipeline = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(), \'Start Pipeline\')]'));
        /* Stage icon */
        // tslint:disable:max-line-length
        this.stageIcon = protractor_1.element(protractor_1.by.xpath('.//div[contains(text(),\'Rollout to Stage\')]/*[contains(@class,\'open-service-icon\')]/a'));
        /* Run icon */
        this.runIcon = protractor_1.element(protractor_1.by.xpath('.//div[contains(text(),\'Rollout to Run\')]/*[contains(@class,\'open-service-icon\')]/a'));
        /* Button displayed after build pipeline performs stage and test */
        this.inputRequiredButton = protractor_1.element(protractor_1.by.xpath('.//a[contains(text(),\'Input Required\')][1]'));
        /* Buttons displayed in the promote dialog */
        this.closeButton = protractor_1.element(protractor_1.by.xpath('.//button[contains(text(),\'Close\')]'));
        this.abortButton = protractor_1.element(protractor_1.by.xpath('.//button[contains(text(),\'Abort\')]'));
        this.promoteButton = protractor_1.element(protractor_1.by.xpath('.//button[contains(text(),\'Promote\')]'));
        /* Link to analytics report */
        this.stackReportsButton = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'stack-reports-btn\')]'));
        /* Links displayed in the promote dialog */
        this.viewApplicationOnStage = protractor_1.element(protractor_1.by.xpath('.//a[contains(text(),\'View application on stage\')]'));
        this.seeAdditionalDetailsInJenkins = protractor_1.element(protractor_1.by.xpath('.//a[contains(text(),\'See additional details in jenkins\')]'));
    }
    /* Locate a codebase by name */
    importCodebaseByName(nameString) {
        let xpathString = './/multiple-selection-list/div/ul/li/label/span[contains(text(),\'' + nameString + '\')]';
        return protractor_1.element(protractor_1.by.xpath(xpathString));
    }
    /* Locate a pipeline by name */
    allPipelineByName(nameString) {
        let xpathString = './/a[contains(@class,\'card-title\') and contains(text(),\'' + nameString + '\')]/../../..';
        return protractor_1.element.all(protractor_1.by.xpath(xpathString));
    }
    /* Locate a pipeline by name */
    pipelineByName(nameString) {
        let xpathString = './/a[contains(@class,\'card-title\') and contains(text(),\'' + nameString + '\')]/../../..';
        return protractor_1.element(protractor_1.by.xpath(xpathString));
    }
    /* Element - input required button - by pipeline name - in pipeline list */
    inputRequiredByPipelineByName(nameString) {
        let xpathString = './/a[contains(@class,\'card-title\') and contains(text(),\'' + nameString + '\')]/../../..//a[contains(text(),\'Input Required\')]';
        return protractor_1.element(protractor_1.by.xpath(xpathString));
    }
}
exports.SpacePipelinePage = SpacePipelinePage;
//# sourceMappingURL=space_pipeline.page.js.map