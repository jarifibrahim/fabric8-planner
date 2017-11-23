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
const ui = require("../../ui");
const support = require("../../support");
class Wizard extends ui.BaseElement {
    constructor(element, name = '') {
        super(element, name);
        this.footer = new ui.BaseElement(this.$('div.modal-footer'));
        this.primaryButton = new ui.Button(this.footer.$('button.btn.btn-primary.wizard-pf-next'), 'Next');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.footer.ready();
            yield this.primaryButton.ready();
        });
    }
}
exports.Wizard = Wizard;
;
const PROJECT_CARD = 'div.card-pf';
class QuickStartWizard extends Wizard {
    constructor() {
        super(...arguments);
        this.filterTextInput = new ui.TextInput(this.$('input[type="text"]'), 'filter');
        // TODO: may be turn this into a widget
        this.projectSelector = new ui.BaseElement(this.$('ob-project-select'));
        this.projectCards = new ui.BaseElementArray(this.projectSelector.$$(PROJECT_CARD));
        this.projectInfoStep = new ui.BaseElement(this.$('project-info-step'));
        // we worry about proj
        this.projectNameInput = new ui.TextInput(this.projectInfoStep.$('#named'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            this.debug(' .... wizard ', 'ok');
            yield this.footer.ready();
            this.debug(' .... footer ', 'ok');
            yield this.filterTextInput.ready();
            yield this.projectSelector.ready();
            this.debug(' .... selection ', 'ok');
            yield this.projectCards.ready();
            this.debug(' .... cards ', 'ok');
        });
    }
    findCard(name) {
        return __awaiter(this, void 0, void 0, function* () {
            support.debug(' .... finding card', name);
            let cardFinder = protractor_1.by.cssContainingText(PROJECT_CARD, name);
            let element = this.projectSelector.element(cardFinder);
            let card = new ui.Clickable(element, name);
            yield card.ready();
            support.debug(' .... found card', name);
            return card;
        });
    }
    waitForProjectInfoStep() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.projectInfoStep.ready();
            yield this.projectNameInput.ready();
            yield this.primaryButton.ready();
        });
    }
    newProject({ project, name = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            let card = yield this.findCard(project);
            yield card.clickWhenReady();
            yield this.primaryButton.clickWhenReady();
            yield this.waitForProjectInfoStep();
            yield this.projectNameInput.enterText(name);
            yield this.primaryButton.clickWhenReady();
            yield this.primaryButton.clickWhenReady();
            yield this.primaryButton.untilTextIsPresent('Finish');
            // call it 'Finish' to match what is seen on UI
            this.primaryButton.name = 'Finish';
            yield this.primaryButton.clickWhenReady();
            yield this.primaryButton.untilTextIsPresent('Ok');
            // call it 'Ok' to match what is seen on UI
            this.primaryButton.name = 'Ok';
            yield this.primaryButton.clickWhenReady();
        });
    }
}
exports.QuickStartWizard = QuickStartWizard;
;
class ImportCodeWizard extends Wizard {
    constructor() {
        super(...arguments);
        this.githubOrg = new ui.SingleSelectionDropdown(this.$('organisation-step single-selection-dropdown'), 'Github Org');
        this.repoList = new ui.MultipleSelectionList(this.$('multiple-selection-list'), 'Repository List');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
        });
    }
    waitForGithubOrg() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.githubOrg.ready();
        });
    }
    importCode({ org, repositories }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.primaryButton.ready();
            yield this.waitForGithubOrg();
            yield this.githubOrg.select(org);
            yield this.primaryButton.clickWhenReady();
            yield this.repoList.ready();
            repositories.forEach((r) => __awaiter(this, void 0, void 0, function* () { return yield this.repoList.select(r); }));
            yield this.primaryButton.clickWhenReady();
            // deployment choose default
            yield this.primaryButton.clickWhenReady();
            yield this.primaryButton.untilTextIsPresent('Finish');
            this.primaryButton.name = 'Finish';
            yield this.primaryButton.clickWhenReady();
            yield this.primaryButton.untilTextIsPresent('Ok');
            this.primaryButton.name = 'Ok';
            yield this.primaryButton.clickWhenReady();
        });
    }
}
exports.ImportCodeWizard = ImportCodeWizard;
class AddToSpaceDialog extends ui.ModalDialog {
    constructor(element) {
        super(element, 'Add to Space Wizard');
        this.noThanksButton = new ui.Button(protractor_1.$('#noThanksButton'), 'No Thanks ...');
        this.importExistingCodeButton = new ui.Button(protractor_1.$('#importCodeButton'), 'Import Existing Code');
        this.newQuickstartButton = new ui.Button(protractor_1.$('#forgeQuickStartButton'), 'New Quickstart Project');
        // NOTE: not visible initially
        this.quickStartWizard = new QuickStartWizard(this.$('quickstart-wizard'));
        this.importCodeWizard = new ImportCodeWizard(this.$('import-wizard'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.noThanksButton.untilClickable();
            yield this.importExistingCodeButton.untilClickable();
            yield this.newQuickstartButton.untilClickable();
        });
    }
    newQuickstartProject(details) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.newQuickstartButton.clickWhenReady();
            yield this.quickStartWizard.ready();
            yield this.quickStartWizard.newProject(details);
        });
    }
    importExistingCode(details) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.importExistingCodeButton.clickWhenReady();
            yield this.importCodeWizard.ready();
            support.debug("... going to import repo", details.repositories);
            yield this.importCodeWizard.importCode(details);
        });
    }
}
exports.AddToSpaceDialog = AddToSpaceDialog;
//# sourceMappingURL=add_to_space_dialog.js.map