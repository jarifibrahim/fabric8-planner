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
const app_page_1 = require("./app.page");
const ui = require("../ui");
class CleanupConfirmationModal extends ui.ModalDialog {
    constructor(element) {
        super(element, 'Cleanup confirmation Dialog');
        // NOTE: bodyContent is a tag
        this.body = this.content.$('.modal-body');
        this.bodyContent = this.body.$('modal-content');
        this.confirmationInput = new ui.TextInput(this.bodyContent.$('form input'), 'username confirmation');
        this.confirmEraseButton = new ui.Button(this.bodyContent.$('form button'), 'I understand my actions ...');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.body.isPresent();
            yield this.body.isDisplayed();
            yield this.bodyContent.isPresent();
            yield this.bodyContent.isDisplayed();
            yield this.confirmationInput.untilPresent();
            yield this.confirmEraseButton.untilPresent();
        });
    }
}
class CleanupUserEnvPage extends app_page_1.AppPage {
    constructor() {
        super();
        this.eraseEnvButton = this.innerElement(ui.Button, '#overview button', 'Erase My OpenShift.io Environment');
        this.alertBox = new ui.BaseElement(protractor_1.$('#overview div.alert'), 'Alert Box');
        this.url = `${protractor_1.browser.params.login.user}/_cleanup`;
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            support.debug('... checking if erase button is there');
            yield this.eraseEnvButton.untilClickable();
            support.debug('... checking if erase button is there - OK');
        });
    }
    cleanup(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.eraseEnvButton.clickWhenReady();
            let confirmationElement = this.innerElement(ui.BaseElement, 'modal', '');
            let confirmationBox = new CleanupConfirmationModal(confirmationElement);
            yield confirmationBox.ready();
            yield confirmationBox.confirmationInput.enterText(username);
            yield confirmationBox.confirmEraseButton.clickWhenReady();
            support.debug('... waiting for alert box');
            yield this.alertBox.untilPresent(15 * 1000);
            support.debug('... waiting for alert box - OK');
            yield this.alertBox.untilTextIsPresent('Your OpenShift.io environment has been erased!');
        });
    }
}
exports.CleanupUserEnvPage = CleanupUserEnvPage;
class EditUserProfilePage extends app_page_1.AppPage {
    constructor() {
        super(...arguments);
        this.resetEnvButton = this.innerElement(ui.Button, '#overview button', 'Reset Environment');
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resetEnvButton.untilClickable();
        });
    }
    gotoResetEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            support.debug('... going to click', 'Reset Environment');
            yield this.resetEnvButton.clickWhenReady();
            support.debug('... going to click', 'Reset Environment', 'OK');
            let page = new CleanupUserEnvPage();
            support.debug('... going to open: CleanupUserEnvPage');
            yield page.open();
            support.debug('... going to open: CleanupUserEnvPage - OK');
            return page;
        });
    }
}
exports.EditUserProfilePage = EditUserProfilePage;
class UserProfilePage extends app_page_1.AppPage {
    constructor() {
        super(...arguments);
        // TODO is there a better way to find the button? can we get devs to add an id?
        this.updateProfileButton = this.innerElement(ui.Button, 'alm-overview button.profile-update-button', 'Update Profile');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.updateProfileButton.untilClickable();
        });
    }
    gotoEditProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateProfileButton.clickWhenReady();
            support.debug('... showing up Edit User Profile');
            let page = new EditUserProfilePage();
            yield page.open();
            return page;
        });
    }
}
exports.UserProfilePage = UserProfilePage;
//# sourceMappingURL=user_profile.page.js.map