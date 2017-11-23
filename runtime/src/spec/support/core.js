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
const fs = require("fs");
var BrowserMode;
(function (BrowserMode) {
    BrowserMode[BrowserMode["Phone"] = 0] = "Phone";
    BrowserMode[BrowserMode["Tablet"] = 1] = "Tablet";
    BrowserMode[BrowserMode["Desktop"] = 2] = "Desktop";
})(BrowserMode = exports.BrowserMode || (exports.BrowserMode = {}));
exports.seconds = (n) => n * 1000;
exports.minutes = (n) => n * exports.seconds(60);
exports.DEFAULT_WAIT = exports.seconds(30);
exports.LONG_WAIT = exports.minutes(1);
exports.LONGEST_WAIT = exports.minutes(15);
function setBrowserMode(mode) {
    return __awaiter(this, void 0, void 0, function* () {
        let window = protractor_1.browser.driver.manage().window();
        switch (mode) {
            case BrowserMode.Phone:
                yield window.setSize(430, 667);
                break;
            case BrowserMode.Tablet:
                yield window.setSize(768, 1024);
                break;
            case BrowserMode.Desktop:
                yield window.setSize(1920, 900);
                break;
            default:
                throw Error('Unknown mode');
        }
    });
}
exports.setBrowserMode = setBrowserMode;
function desktopTestSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        protractor_1.browser.ignoreSynchronization = true;
        yield setBrowserMode(BrowserMode.Desktop);
    });
}
exports.desktopTestSetup = desktopTestSetup;
/*
 * Joins the arguments as URI paths ensuring there's exactly one '/' between each path entry
 */
function joinURIPath(...args) {
    // TODO: improve this method using available modules for uri operations
    let answer = null;
    for (let i = 0, j = arguments.length; i < j; i++) {
        let arg = arguments[i];
        if (i === 0 || !answer) {
            answer = arg;
        }
        else {
            if (!answer.endsWith('/')) {
                answer += '/';
            }
            if (arg.startsWith('/')) {
                arg = arg.substring(1);
            }
            answer += arg;
        }
    }
    return answer;
}
exports.joinURIPath = joinURIPath;
/**
 * Get system time in seconds since 1970 - to generate unique space names.
 */
function newSpaceName() {
    let d = new Date();
    let month = d.toLocaleString('en-US', { month: 'short' }).toLowerCase();
    let day = d.getDate();
    let time = d.getTime();
    let spaceName = `test${month}${day}${time}`;
    info('New space name: ', spaceName);
    return spaceName;
}
exports.newSpaceName = newSpaceName;
/**
 * Write screenshot to file
 * Example usage:
 *   support.writeScreenshot('exception1.png');
 *
 * Ref: http://blog.ng-book.com/taking-screenshots-with-protractor/
 */
function writeScreenshot(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        let png = yield protractor_1.browser.takeScreenshot();
        let stream = fs.createWriteStream(filename);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
        info(`Saved screenshot to: ${filename}`);
    });
}
exports.writeScreenshot = writeScreenshot;
function timestamp() {
    let date = new Date();
    let time = date.toLocaleTimeString('en-US', { hour12: false });
    let ms = (date.getMilliseconds() + 1000).toString().substr(1);
    return `${time}.${ms}`;
}
function debugEnabled(...msg) {
    console.log(`[${timestamp()}]:`, ...msg);
}
function debugNoop(...msg) { }
function info(...msg) {
    console.info(`[${timestamp()}]:`, ...msg);
}
exports.info = info;
exports.debug = process.env.DEBUG ? debugEnabled : debugNoop;
/**
 * Returns the entity name of the current user which is used in the URL after, say,
 * https:///openshift.io/{userEntityName}/{spaceName}
 *
 * This name may not be the same as the user name due to special characters (e.g. email addresses or underscores).
 *
 * When using fabric8 on MiniShift then this is typically 'developer' for the `oc whoami` rather than
 * the user name used to login into GitHub
 */
function userEntityName(username) {
    // lets try use the $OSO_USERNAME for the openshift `whoami` name first
    let osoUsername = protractor_1.browser.params.oso.username;
    if (osoUsername) {
        return osoUsername;
    }
    let platform = targetPlatform();
    if (platform === 'fabric8-openshift') {
        return protractor_1.browser.params.login.openshiftUser || 'developer';
    }
    return username ? username : protractor_1.browser.params.login.user;
}
exports.userEntityName = userEntityName;
/**
 * Returns the platform name which is either
 * * "osio" for testing on https://openshift.io/
 * * "fabric8-openshift" for testing
 * * "fabric8-kubernetes" for testing fabric8 on a kubernetes cluster
 */
// TODO: convert this to return a TargetClass that encapsulates data
// about the target platform
function targetPlatform() {
    const target = protractor_1.browser.params.target;
    // in the absense of a target, the testTarget is osio
    if (!target) {
        return 'osio';
    }
    // if platform is set explicitly then it takes precedence
    const platform = target.platform;
    if (platform) {
        return platform;
    }
    // try to guess from the url
    const url = target.url;
    if (url === 'https://openshift.io' ||
        url === 'https://openshift.io/' ||
        url === 'https://prod-preview.openshift.io' ||
        url === 'https://prod-preview.openshift.io/') {
        return 'osio';
    }
    // lets assume fabric8 on openshift as its better
    // than assuming OSIO when not using OSIO :)
    return 'fabric8-openshift';
}
exports.targetPlatform = targetPlatform;
//# sourceMappingURL=core.js.map