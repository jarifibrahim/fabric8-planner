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
const support_1 = require("../support");
function makeNumberComparer(compare) {
    if (typeof (compare) == "number") {
        return (n) => n >= compare;
    }
    return compare;
}
/**
 * to use with browser.wait to wait for multiple elements to present
 * e.g.
 *  browser.wait(untilCount($('foobar'), n => n >= 5 ))
 *  browser.wait(untilCount($('foobar'), 5)) // same as above
 */
function untilCount(elements, expectation) {
    let compare = makeNumberComparer(expectation);
    return () => elements.count().then(compare);
}
class BaseElement extends protractor_1.ElementFinder {
    /**
     * Extend this class, to describe single custom fragment on your page
     *
     * @param {ElementFinder} elementFinder ElementFinder that you want to extend
     * @param {string} name to indentify the element in the logs
     */
    constructor(wrapped, name = 'unnamed') {
        // Basically we are recreating ElementFinder again with same parameters
        super(wrapped.browser_, wrapped.elementArrayFinder_);
        // add logging mixin
        this.name = '';
        this.name = name;
    }
    untilClickable(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor('clickable', protractor_1.ExpectedConditions.elementToBeClickable(this), timeout);
        });
    }
    untilPresent(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor('present', protractor_1.ExpectedConditions.presenceOf(this), timeout);
        });
    }
    untilDisplayed(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor('visible', protractor_1.ExpectedConditions.visibilityOf(this), timeout);
        });
    }
    untilTextIsPresent(text, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let condition = protractor_1.ExpectedConditions.textToBePresentInElement(this, text);
            yield this.waitFor(`text ${text}`, condition, timeout);
        });
    }
    untilHidden(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor('hidden', protractor_1.ExpectedConditions.invisibilityOf(this), timeout);
        });
    }
    untilAbsent(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor('absence', protractor_1.ExpectedConditions.stalenessOf(this), timeout);
        });
    }
    clickWhenReady(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('click', () => __awaiter(this, void 0, void 0, function* () {
                yield this.untilClickable(timeout);
                yield this.click();
            }));
            this.log('Clicked');
        });
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: may have to revert back to just until present
            // await this.untilPresent();
            yield this.untilDisplayed();
        });
    }
    waitFor(msg, condition, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let wait = timeout || support_1.DEFAULT_WAIT;
            this.debug(`waiting for "${msg}"`, `  | timeout: '${wait}'`);
            yield protractor_1.browser.wait(condition, wait);
            this.debug(`waiting for "${msg}"`, '  - OK');
        });
    }
    run(msg, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug(msg);
            yield fn();
            this.debug(msg, '- DONE');
        });
    }
}
exports.BaseElement = BaseElement;
class BaseElementArray extends protractor_1.ElementArrayFinder {
    constructor(wrapped) {
        // see: clone https://github.com/angular/protractor/blob/5.2.0/lib/element.ts#L106
        super(wrapped.browser_, wrapped.getWebElements, wrapped.locator_, wrapped.actionResults_);
    }
    untilCount(compare, wait, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(untilCount(this, compare), wait, msg);
        });
    }
    ready(count = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.untilCount(count);
        });
    }
}
exports.BaseElementArray = BaseElementArray;
class Clickable extends BaseElement {
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('ready', () => __awaiter(this, void 0, void 0, function* () {
                yield _super("ready").call(this);
                yield this.untilClickable();
            }));
        });
    }
}
exports.Clickable = Clickable;
mixins.applyMixins(BaseElement, [mixins.Logging]);
mixins.applyMixins(BaseElementArray, [mixins.Logging]);
//# sourceMappingURL=base.element.js.map