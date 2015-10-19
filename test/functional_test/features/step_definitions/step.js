// features/step_definitions/myStepDefinitions.js
var Nightmare = require("nightmare");
var vo = require('vo');
var steps = require('artstep')
module.exports = function () {
  this.Given(/^I am on the Mirror Pro page$/, function *(callback) {
    // Express the regexp above with the code you wish you had.
    // `this` is set to a World instance.
    // i.e. you may use this.browser to execute the step:

    /*this.visit('http://localhost:3000', callback);*/

    this.visit("http://localhost:3000");

    var nightmare = Nightmare();

    var title = yield nightmare.goto("localhost:3000").title();

    yield nightmare.end();

    callback();

    /*vo(run)((function(callback) {
      return function (err, result) {
        callback();
      };
      if (err) throw err;
    })(callback));

    function *run() {
      var nightmare = Nightmare();
      var title = yield nightmare
        .goto('http://localhost:3000')
        .evaluate(function() {
          return document.title;
        });
      console.log(title);
      yield nightmare.end();
    }   */

    /*callback();*/

    // The callback is passed to visit() so that when the job's finished, the next step can
    // be executed by Cucumber.
  });

  this.When(/^I view the page$/, function (callback) {
    // Express the regexp above with the code you wish you had. Call callback() at the end
    // of the step, or callback.pending() if the step is not yet implemented:

    callback();
  });

  this.Then(/^I should see "(.*)" as the page title$/, function (title, callback) {
    // matching groups are passed as parameters to the step definition

    /*var pageTitle = this.browser.goto( "http://localhost:3000" ).title();*/
    
    var pageTitle = this.getFromDOM("http://localhost:3000");

    console.log(pageTitle);

    if (title === pageTitle) {
      callback();
    } else {
      callback(new Error("Expected to be on page with title " + title));
    }
  });
};