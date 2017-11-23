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
const base_element_1 = require("./base.element");
class ModalDialog extends base_element_1.BaseElement {
    constructor(element, name) {
        super(element, name);
        this.content = new base_element_1.BaseElement(this.$('.modal-content'));
        // optional
        this.footer = new base_element_1.BaseElement(this.content.$('.modal-footer'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.content.ready();
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            this.log('Opened');
            return this;
        });
    }
}
exports.ModalDialog = ModalDialog;
//# sourceMappingURL=modal_dialog.js.map