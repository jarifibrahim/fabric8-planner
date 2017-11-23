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
const base_element_1 = require("./base.element");
const checkbox_1 = require("./checkbox");
class MultipleSelectionList extends base_element_1.BaseElement {
    constructor(element, name = '') {
        super(element, name);
        this.list = new base_element_1.BaseElement(this.$('div > ul'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.list.ready();
        });
    }
    item(text) {
        let el = this.list.element(protractor_1.by.cssContainingText('li.checkbox label', text));
        return new checkbox_1.Checkbox(el);
    }
    select(text) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkbox = this.item(text);
            yield checkbox.clickWhenReady();
        });
    }
}
exports.MultipleSelectionList = MultipleSelectionList;
//# sourceMappingURL=multi_select_list.js.map