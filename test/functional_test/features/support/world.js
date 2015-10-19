// features/support/world.js
/*import zombie from "zombie";*/
/*var zombie = require('zombie');*/
/*import Nightmare from "nightmare";*/
var Nightmare = require("nightmare");
var vo = require('vo');

function World(callback) {
  /*this.browser = new zombie();*/ // this.browser will be available in step definitions

  this.browser = Nightmare();

  /*this.visit = function (url, callback) {
    this.browser.visit(url, callback);
  };*/

  this.visit = function (url) {
  	vo(function *(url) {
  		var nightmare = Nightmare();
		var title = yield nightmare
			.goto(url)
			.evaluate(function() {
		  		return document.title;
		});
		console.log(title);
		yield nightmare.end();
  	})(url, function(err, res) {

  	});
  };

  this.getFromDOM = function (url, callback) {
  	var data = null;

  	vo(function *(url) {
  		var nightmare = Nightmare();
		var title = yield nightmare
			.goto(url)
			.evaluate(function() {
		  		return document.title;
		});
		console.log(title);
		yield nightmare.end();
		return title;
  	})(url, (function(callback) {
  		return function(err, res) {
  			return res;
  			callback();
  		};
  	})(callback));


  };

  callback(); // tell Cucumber we're finished and to use 'this' as the world instance
}

module.exports = function() {
  this.World = World;
};