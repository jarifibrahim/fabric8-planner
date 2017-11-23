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
const page_objects_1 = require("../page_objects");
class Interaction {
    validate() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ;
    cleanup() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ;
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validate();
            try {
                return this.perform();
            }
            finally {
                yield this.cleanup();
            }
        });
    }
}
class LoginInteraction extends Interaction {
    constructor(page, username, password) {
        super();
        this.username = username || protractor_1.browser.params.login.user;
        this.password = password || protractor_1.browser.params.login.password;
        // HACK: https://github.com/openshiftio/openshift.io/issues/1402
        // TODO: remove the hack and use LandingPage instead of OsioLandingPage
        // when the bug that deletes the tokens is fixed
        this.page = page || new page_objects_1.LandingPage();
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            expect(this.username === "").toBe(false, 'must provide username');
            expect(this.password === "").toBe(false, 'must provide password');
            expect(this.page).toBeDefined('page must be intialised');
        });
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.open();
            let loginPage = yield this.page.gotoLoginPage();
            let dashboard = yield loginPage.login(this.username, this.password);
            yield dashboard.open();
            return dashboard;
        });
    }
}
exports.LoginInteraction = LoginInteraction;
//# sourceMappingURL=interactions.js.map