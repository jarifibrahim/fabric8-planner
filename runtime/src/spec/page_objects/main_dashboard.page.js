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
const support = require("../support");
const ui_1 = require("../ui");
const app_page_1 = require("./app.page");
const space_dashboard_page_1 = require("./space_dashboard.page");
class MainDashboardPage extends app_page_1.AppPage {
    constructor() {
        /*
        Page layout
        |--------------------------------------------------------------------------------------------------------------------|
        |                                          Top Navigation Bar                                                        |
        | Left Navigation Bar            |                                                  | Right Navigation Bar           |
        |                                |                                                  |                                |
        |                                                                                                                    |
        | Persistent navigation bar                                                                                          |
        |--------------------------------------------------------------------------------------------------------------------|
        |                                   |                                        |                                       |
        |                                   |                                        |                                       |
        |        Page-specific content      |      Page-specific content             |        Page-specific content          |
        |                                   |                                        |                                       |
        |                                   |                                        |                                       |
        |--------------------------------------------------------------------------------------------------------------------|
        |                                   |                                        |                                       |
        |                                   |                                        |                                       |
        |        Page-specific content      |      Page-specific content             |        Page-specific content          |
        |                                   |                                        |                                       |
        |                                   |                                        |                                       |
        |--------------------------------------------------------------------------------------------------------------------|
        */
        super(...arguments);
        this.url = '_home';
        /* Dialog to create new space and project */
        this.newSpaceName = new ui_1.TextInput(protractor_1.$('#name'), 'Name of Space');
        this.createSpaceButton = new ui_1.Button(protractor_1.$('#createSpaceButton'), 'Create Space');
        // TODO: create a UI component that abstracts this element
        this.devProcessPulldown = new ui_1.TextInput(protractor_1.$('#developmentProcess'));
        this.noThanksButton = new ui_1.Button(protractor_1.$('#noThanksButton'), 'No Thanks ...');
        /* Are any warning displayed? */
        this.alertToastElements = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class, \'toast-pf\')]'));
        /* Did the App/Project Creation Fail? */
        this.appGenerationSuccess = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(), \'A starter application was created.\')]'));
        this.appGenerationError = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(), \'Application Generator Error\')]'));
        this.executeForgeCommandError = protractor_1.element(protractor_1.by.xpath('.//*[contains(text(), \'Execute Forge Command Error\')]'));
        /* UI Page Section: Navigation Bar */
        this.topNavigationBar = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class, \'navbar-collapse\')]'));
        /* UI Page Section: Left Navigation Bar */
        this.leftNavigationBar = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class, \'navbar-left\')]'));
        // tslint:disable:max-line-length
        /* Recent items under Left Navigation Bar */
        this.recentItemsUnderLeftNavigationBar = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class, \'navbar-left\')]//*[contains(@class,\'recent-items\')]//*[contains(@class,\'nav-item-icon\')]'));
        // tslint:enable:max-line-length
        /* View all spaces in Left Navigation Bar */
        this.viewAllSpacesUnderLeftNavigationBar = protractor_1.$('#header_viewAllSpaces');
        /* Account home in Left Navigation Bar */
        this.accountHomeUnderLeftNavigationBar = protractor_1.$('#header_accountHome');
        /* -----------------------------------------------------------------*/
        /* UI Page Section: Right Navigation Bar */
        this.rightNavigationBar = protractor_1.$('#header_dropdownToggle2');
        this.help = protractor_1.$('#header_loggedinHelp');
        this.about = protractor_1.$('#header_loggedinAbout');
        this.logOut = protractor_1.$('#header_logout');
        /* Status icon */
        this.statusIcon = protractor_1.$('#header_status');
        this.statusIconPlatform = protractor_1.$('#header_platformStatus');
        this.statusIconPlanner = protractor_1.$('#header_plannerStatus');
        this.statusIconChe = protractor_1.$('#header_cheStatus');
        this.statusIconPipeline = protractor_1.$('#header_pipelineStatus');
        this.statusPoweredOff = protractor_1.element(protractor_1.by.xpath('.//*[contains(@class,\'fa.fa-power-off\')]'));
        // tslint:disable:max-line-length
        this.cheStatusPoweredOn = protractor_1.element(protractor_1.by.xpath('.//*[@id=\'header_status\']/div/ul/fabric8-status-list/li[1]/status-info/span/span[contains(@class,\'pficon-ok\')]'));
        this.cheStatusPending = protractor_1.element(protractor_1.by.xpath('.//*[@id=\'header_status\']/div/ul/fabric8-status-list/li[1]/status-info/span/span[contains(@class,\'status-icon-pending fa fa-clock-o\')]'));
        this.jenkinsStatusPoweredOn = protractor_1.element(protractor_1.by.xpath('.//*[@id=\'header_status\']/div/ul/fabric8-status-list/li[2]/status-info/span/span[contains(@class,\'pficon-ok\')]'));
        // tslint:enable:max-line-length
        /* Profile page */
        this.updateProfileButton = protractor_1.element(protractor_1.by.xpath('.//button[contains (text(), \'Update Profile\')]'));
        this.updateTenantButton = protractor_1.element(protractor_1.by.xpath('.//button[contains (text(), \'Update Tenant\')]'));
        /* Profile drop down selection */
        this.profile = protractor_1.$('#header_loggedinProfile');
    }
    /* User name or space name in Left Navigation Bar */
    nameUnderLeftNavigationBar(nameString) {
        let xpath = `.//*[contains(@class, 'navbar-left')]//*[contains(text(), '${nameString}')]`;
        return protractor_1.element(protractor_1.by.xpath(xpath));
    }
    // tslint:disable:max-line-length
    /* Recent space by name */
    // Example:  .//*[contains (@class, ('recent-items-text-dropdown'))]/span[contains (text(),'testspace')]
    recentSpaceByName(spaceName) {
        let xpathString = './/*[contains (@class, (\'recent-items-text-dropdown\'))]/span[contains (text(),\'' + spaceName + '\')]';
        return protractor_1.element(protractor_1.by.xpath(xpathString));
    }
    // tslint:enable:max-line-length
    /* Helper function to create a new OSIO space */
    createNewSpace(spaceName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.header.recentItemsDropdown.createSpaceItem.select();
            // TODO: create a new BaseFragment for the model Dialog
            yield this.newSpaceName.enterText(spaceName);
            yield this.devProcessPulldown.enterText('Scenario Driven Planning');
            yield this.createSpaceButton.clickWhenReady();
            yield this.noThanksButton.clickWhenReady();
            let url = yield protractor_1.browser.getCurrentUrl();
            support.debug('... current url:', url);
            support.debug('... waiting for the url to contain spacename: ', spaceName);
            // TODO: make the timeout a config
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains(spaceName), 10000);
            let spaceDashboard = new space_dashboard_page_1.SpaceDashboardPage(spaceName);
            yield spaceDashboard.open();
            return spaceDashboard;
        });
    }
}
exports.MainDashboardPage = MainDashboardPage;
//# sourceMappingURL=main_dashboard.page.js.map