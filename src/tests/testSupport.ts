/**
 * Support module for automated UI tests for Planner
 * 
 * Ref: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
 * 
 * @author ldimaggi
 */

import { browser, element, by, ExpectedConditions, ElementFinder, protractor } from 'protractor';

export class TestSupport {

  /**
   * Set the browser window size
   * 
   * Note on screen resolutions - See: http://www.itunesextractor.com/iphone-ipad-resolution.html
   * Tests will be run on these resolutions:
   * - iPhone6s - 375x667 (note: tests on chrome+firefox fail unless width >= 400)
   * - iPad air - 768x1024
   * - Desktop -  1920x1080 (old), 1440x900 (new)
   * 
   */
  public setBrowserMode(browserModeStr) {
    switch (browserModeStr) {
      case 'phone':
        browser.driver.manage().window().setSize(430, 667);
        break;
      case 'tablet':
        browser.driver.manage().window().setSize(768, 1024);
        break;
      case 'desktop':
        browser.driver.manage().window().setSize(1440, 900);
    }
  };

  /**
  * Set the windows in which the tests will run 
  */
  public setTestSpace(page) {
    page.clickOnSpaceDropdown();
    page.selectSpaceDropDownValue("1");
  };

  /** 
  * Write screenshot to file 
  * Example usage:
  *    browser.takeScreenshot().then(function (png) {
  *      testSupport.writeScreenShot(png, 'exception.png');
  *  });
  * 
  * Ref: http://blog.ng-book.com/taking-screenshots-with-protractor/
  */
  public writeScreenShot(data, filename) {
    var fs = require('fs');
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  };

  /*
  * Custom wait function - determine if ANY text appears in a field's value
  */
  public waitForText(elementFinder) {
    return elementFinder.getAttribute("value").then(function (text) {
      //      console.log("text = " + text);
      return text !== "";  // could also be replaced with "return !!text;"
    });
  };

  /*
  * Create fixed length string - used to generate large strings
  */
  public generateString(size, newlines) {
    var sourceString128 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()\|;:',./<>?`~Ω≈ç√∫˜µ≤≥÷åß∂ƒ©˙∆˚¬…æœ∑´®†¥¨ˆøπ¡™£¢∞§¶•ªº–≠";
    var retString = "";
    var counter = size / 128;
    if (counter < 1) {
      counter = 1;
    }
    for (var i = 0; i < counter; i++) {
      retString += sourceString128;
      if (newlines) {
        retString += "\n";
      }
    }
    // console.log ("return string ="  + retString);
    return retString;
  };

  /* 
  * Click UI element
  */
  public clickElement(theElement, theElementName, thePageName) {

    var constants = require("./constants");
    var until = protractor.ExpectedConditions;

    browser.wait(until.elementToBeClickable(theElement), constants.WAIT, 'Failed to find element ' + theElementName);
    theElement.click().then(function () {
      console.log(thePageName + " - clicked element: " + theElementName);
    });
    return;
  };

}
