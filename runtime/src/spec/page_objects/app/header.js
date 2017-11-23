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
const support = require("../../support");
const ui = require("../../ui");
class ProfileDropdown extends ui.Dropdown {
    constructor(element) {
        super(element);
        this.profileItem = this.item('Profile');
        this.aboutItem = this.item('About');
        this.logoutItem = this.item('Log Out');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            support.debug(' ... check if ProfileDropdown is Ready');
            yield _super("ready").call(this);
            yield this.profileItem.ready();
            yield this.aboutItem.ready();
            yield this.logoutItem.ready();
            support.debug(' ... check if ProfileDropdown is Ready - OK');
        });
    }
}
exports.ProfileDropdown = ProfileDropdown;
class RecentItemsDropdown extends ui.Dropdown {
    constructor(element) {
        super(element);
        this.accountHomeItem = this.item('Account home');
        this.createSpaceItem = this.item('Create space');
        this.viewAllSpaces = this.item('View all spaces');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            support.debug(' ... check if RecentItems is ready');
            yield _super("ready").call(this);
            yield this.accountHomeItem.ready();
            yield this.createSpaceItem.ready();
            yield this.viewAllSpaces.ready();
            support.debug(' ... check if RecentItems is ready');
        });
    }
}
exports.RecentItemsDropdown = RecentItemsDropdown;
// export class StatusDropdown extends ui.Dropdown {
// }
class Header extends ui.BaseElement {
    // statusDropdown = new Dropdown(this.$$('.dropdown').get(0));
    constructor(el) {
        super(el);
        this.profileDropdown = new ProfileDropdown(this.$('.pull-right.dropdown'));
        this.recentItemsDropdown = new RecentItemsDropdown(this.$$('.dropdown').get(0));
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            support.debug(' ... check if Header is ready');
            yield this.profileDropdown.ready();
            yield this.recentItemsDropdown.ready();
            support.debug(' ... check if Header is ready - OK');
        });
    }
}
exports.Header = Header;
//# sourceMappingURL=header.js.map