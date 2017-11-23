"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("./logging");
exports.Logging = logging_1.Logging;
// source: https://www.typescriptlang.org/docs/handbook/mixins.html
exports.applyMixins = (derivedCtor, baseCtors) => {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
};
//# sourceMappingURL=index.js.map