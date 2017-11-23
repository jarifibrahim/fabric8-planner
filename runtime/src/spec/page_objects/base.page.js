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
const mixins = require("../mixins");
var PageOpenMode;
(function (PageOpenMode) {
    PageOpenMode[PageOpenMode["AlreadyOpened"] = 0] = "AlreadyOpened";
    PageOpenMode[PageOpenMode["RefreshBrowser"] = 1] = "RefreshBrowser";
})(PageOpenMode = exports.PageOpenMode || (exports.PageOpenMode = {}));
class BasePage {
    constructor(url) {
        // add logging mixin
        this.name = '...';
        this.url = url;
        this.debug(`url: '${url}'`);
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    open(mode = PageOpenMode.AlreadyOpened) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mode === PageOpenMode.RefreshBrowser) {
                yield this.openInBrowser();
            }
            yield this.ready();
            this.log('Opened');
            return this;
        });
    }
    openInBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.url === undefined) {
                throw Error('Trying to open and undefined url');
            }
            this.log('Opening', this.url);
            let currentUrl = yield protractor_1.browser.getCurrentUrl();
            this.debug('at  :', currentUrl);
            this.debug(`goto: '${this.url}'`);
            yield protractor_1.browser.get(this.url);
            let urlNow = yield protractor_1.browser.getCurrentUrl();
            this.debug('now :', urlNow);
        });
    }
}
exports.BasePage = BasePage;
mixins.applyMixins(BasePage, [mixins.Logging]);
//# sourceMappingURL=base.page.js.map