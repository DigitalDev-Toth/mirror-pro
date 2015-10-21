"use strict"

const steps     = require('artstep')
const expect    = require('chai').expect
/*const webdriver = require('selenium-webdriver')
const By        = webdriver.By

let driver = new webdriver.Builder().forBrowser('firefox').build()*/

import Nightmare from "nightmare";

module.exports = steps()
.When('I visit my website', function*() {
  let nightmare = Nightmare();
  yield nightmare
    .goto("http://localhost:3000");
  console.log("AAAAAAAAAAAAAAAAAAAAAA");
  yield nightmare.end();
  /*yield driver.get('http://dt.in.th')*/
})
/*.Then('I see $n links below the heading', function*(n) {
  let array = yield driver.findElements(By.css('h1 + ul a'))
  expect(array).to.have.length(+n)
})*/
.Then('I see a title like "$text"', function*(text) {
  let nightmare = Nightmare();
  let result = yield nightmare
    .goto("http://localhost:3000")
    .title();
  console.log(result);
  expect(result).to.equal("Mirror Pro");
  yield nightmare.end();
  /*yield driver.findElement(By.css('a[href="' + href + '"]'))*/
})
.afterAll(function*() {
  /*yield driver.quit()*/
})