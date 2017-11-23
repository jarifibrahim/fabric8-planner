"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const support_1 = require("../support");
class Logging {
    constructor() {
        this.name = '';
    }
    log(action, ...msg) {
        let className = this.constructor.name;
        support_1.info(`${action}: ${className}('${this.name}')`, ...msg);
    }
    debug(context, ...msg) {
        let className = this.constructor.name;
        support_1.debug(`... ${className}('${this.name}'): ${context}`, ...msg);
    }
}
exports.Logging = Logging;
//# sourceMappingURL=logging.js.map