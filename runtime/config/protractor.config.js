const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

var ProtractorMatchers = require("jasmine-protractor-matchers");

var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html',
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: false,
  inlineImages: true
});

// Full protractor configuration file reference could be found here:
// https://github.com/angular/protractor/blob/master/lib/config.ts

var conf = {
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    isVerbose: true,
    defaultTimeoutInterval: 10 * 60 * 1000 // 10 mins for spec to run
  },
  directConnect: process.env.DIRECT_CONNECTION === 'true',
  restartBrowserBetweenTests: true,

  useAllAngular2AppRoots: true,
  getPageTimeout: 1 * 60 * 1000,

  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Ref: https://github.com/angular/protractor/tree/master/exampleTypescript/asyncAwait
  SELENIUM_PROMISE_MANAGER: false,

  specs: [
    '../src/spec/*.js',
    '../src/spec/**/*.js',
  ],

  suites: {
      specs: ['../src/spec/**/*.spec.js'],
  },
  // see: https://github.com/angular/protractor/blob/master/docs/timeouts.md
  capabilities: {
   browserName: 'chrome',
   chromeOptions: {
      args: [
        // '--headless', '--disable-gpu',
        '--no-sandbox', 'disable-popup-blocking=true'
      ]
   }
  },

  // Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      return reporter.beforeLaunch(resolve);
    });
  },
  // Assign the test reporter to each running instance
  onPrepare: function () {
    jasmine.getEnv().addReporter(reporter);
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true,
        displayDuration: true
      },
      summary: {
        displayDuration: true
      }
    }));

    beforeEach(function () {
        jasmine.addMatchers(ProtractorMatchers);
    });
  },

  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      return reporter.afterLaunch(resolve(exitCode));
    });
  }
};

exports.config = conf;
