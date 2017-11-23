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
const base_page_1 = require("./base.page");
const login_page_1 = require("./login.page");
const ui_1 = require("../ui");
class LandingPage extends base_page_1.BasePage {
    constructor(url = '') {
        // '' is relative to base url so it means baseUrl
        super(url);
        this.loginButton = new ui_1.Button(protractor_1.$('#login'), 'Login');
        this.loggedInUserButton = new ui_1.Button(protractor_1.$('#loggedInUserName'), 'User Name');
        // NOTE: can't call async methods in construtor
        protractor_1.browser.getProcessedConfig()
            .then(config => this.name = config.baseUrl);
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.race([
                this.loginButton.untilClickable(),
                this.loggedInUserButton.untilClickable()
            ]);
        });
    }
    open() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return _super("open").call(this, base_page_1.PageOpenMode.RefreshBrowser);
        });
    }
    gotoLoginPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loginButton.clickWhenReady();
            let loginPage = new login_page_1.LoginPage();
            yield loginPage.open();
            return loginPage;
        });
    }
}
exports.LandingPage = LandingPage;
class OsioLandingPage extends LandingPage {
    constructor(url = '/openshiftio') {
        super(url);
        this.loginButton = new ui_1.Button(protractor_1.$('#header_rightDropdown > li.login-block > a'), 'Login');
    }
}
exports.OsioLandingPage = OsioLandingPage;
//# sourceMappingURL=landing.page.js.map