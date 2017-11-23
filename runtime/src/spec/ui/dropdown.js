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
class DropdownItem extends base_element_1.BaseElement {
    constructor(element, parent, name = '') {
        super(element, name);
        this.parent = parent;
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('ready', () => __awaiter(this, void 0, void 0, function* () {
                yield _super("ready").call(this);
                yield this.untilClickable();
            }));
        });
    }
    select() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run(`select item: '${this.name}'`, () => __awaiter(this, void 0, void 0, function* () {
                yield this.parent.ready();
                yield this.parent.click();
                yield this.ready();
                yield this.click();
            }));
        });
    }
}
exports.DropdownItem = DropdownItem;
class DropdownMenu extends base_element_1.BaseElement {
    constructor(element, parent, name = '') {
        super(element, name);
        this.parent = parent;
    }
    item(text) {
        let item = this.element(protractor_1.by.cssContainingText('li', text));
        return new DropdownItem(item, this.parent, text);
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            // NOTE: not calling super as the menu is usually hidden and
            // supper.ready waits for item to be displayed
            yield this.untilPresent();
        });
    }
}
exports.DropdownMenu = DropdownMenu;
class Dropdown extends base_element_1.BaseElement {
    constructor(element, name = '') {
        super(element, name);
        this.menu = new DropdownMenu(this.$('ul.dropdown-menu'), this);
    }
    item(text) {
        return this.menu.item(text);
    }
    select(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.item(text).select();
        });
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('ready', () => __awaiter(this, void 0, void 0, function* () {
                yield _super("ready").call(this);
                yield this.untilClickable();
                yield this.menu.ready();
            }));
        });
    }
}
exports.Dropdown = Dropdown;
class SingleSelectionDropdown extends Dropdown {
    constructor(element, name = '') {
        super(element, name);
        this.input = new base_element_1.Clickable(this.$('input.combobox[type="text"]'), '');
        this.input.name = name;
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.input.ready();
        });
    }
}
exports.SingleSelectionDropdown = SingleSelectionDropdown;
//# sourceMappingURL=dropdown.js.map