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
const ui = require("../ui");
const base_page_1 = require("./base.page");
const main_dashboard_page_1 = require("./main_dashboard.page");
class LoginPage extends base_page_1.BasePage {
    constructor() {
        super(...arguments);
        /* RHD login page UI elements */
        this.usernameInput = new ui.TextInput(protractor_1.$('#username'), 'username');
        this.passwordInput = new ui.TextInput(protractor_1.$('#password'), 'password');
        this.loginButton = new ui.Button(protractor_1.$('#kc-login'), 'Login');
        this.everythingOnPage = protractor_1.element(protractor_1.by.xpath('.//*'));
        /* Social media login options */
        this.githubLoginButton = protractor_1.$('#social-github');
        this.stackoverflowLoginButton = protractor_1.$('#social-stackoverflow');
        this.linkedinLoginButton = protractor_1.$('.fa.fa-linkedin-square');
        this.twitterLoginButton = protractor_1.$('#social-twitter');
        this.facebookLoginButton = protractor_1.$('#social-facebook');
        this.microsoftLoginButton = protractor_1.$('#social-microsoft');
        this.jbossdeveloperLoginButton = protractor_1.$('#social-jbossdeveloper');
    }
    // checks if the PageObject is valid
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(this.usernameInput)),
                protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(this.passwordInput)),
                protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(this.loginButton)),
            ]);
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug('... Login: input details and click Login');
            yield this.usernameInput.enterText(username);
            yield this.passwordInput.enterText(password);
            yield this.loginButton.clickWhenReady();
            this.debug('... Login: input details and click Login - OK');
            let mainDashboard = new main_dashboard_page_1.MainDashboardPage();
            yield mainDashboard.open();
            return mainDashboard;
        });
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.page.js.map