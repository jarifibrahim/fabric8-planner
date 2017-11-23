"use strict";
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
const base_page_1 = require("./base.page");
const landing_page_1 = require("./landing.page");
const header_1 = require("./app/header");
class AppPage extends base_page_1.BasePage {
    /**
     * Extend this class, to describe Application Page(after logging in)
     *
     * @param {url} elementFinder ElementFinder that you want to extend
     */
    constructor() {
        super();
        this.appTag = protractor_1.$('f8-app');
        this.header = new header_1.Header(this.appTag.$('header > alm-app-header > nav'));
    }
    /**
     * Returns an instance of the BaseElement that can be found using
     * the {css} and contains the {text}.
     *
     * @param {UI} The Base Element Class e.g. Button, TextInput
     * @param {css}  Css within the appTag that identifies the element
     * @param {text} text in the element
     *
     */
    innerElement(UI, css, text) {
        const element = this.appTag.element(protractor_1.by.cssContainingText(css, text));
        return new UI(element, text);
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(this.appTag));
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.presenceOf(this.header));
            yield this.header.ready();
        });
    }
    gotoUserProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            support.debug('... Select "Profile" menu item');
            yield this.header.profileDropdown.select('Profile');
            support.debug('... Select "Profile" menu item - OK');
            // tslint:disable-next-line:no-use-before-declare
            let page = new user_profile_page_1.UserProfilePage();
            yield page.open();
            return page;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            support.debug('... Selecting logout');
            yield this.header.profileDropdown.logoutItem.select();
            support.debug('... Selecting logout', 'OK');
            // ensure there is no f8-app tag after logout
            let untilNoAppTag = protractor_1.ExpectedConditions.not(protractor_1.ExpectedConditions.presenceOf(this.appTag));
            yield protractor_1.browser.wait(untilNoAppTag);
            // make sure we are back to the baseUrl
            let baseUrl = protractor_1.browser.baseUrl;
            support.debug('... Wait for base url:', baseUrl);
            let untilBackToBaseUrl = protractor_1.ExpectedConditions.or(protractor_1.ExpectedConditions.urlIs(baseUrl), protractor_1.ExpectedConditions.urlIs(`${baseUrl}/`));
            yield protractor_1.browser.wait(untilBackToBaseUrl, 5000, `Url is not ${baseUrl}`);
            support.debug('... Wait for base url', 'OK');
            return new landing_page_1.LandingPage().open();
        });
    }
}
exports.AppPage = AppPage;
// NOTE: imported here otherwise AppPage will not be defined when
// UserProfilePage that inherts AppPage is created
const user_profile_page_1 = require("./user_profile.page");
//# sourceMappingURL=app.page.js.map