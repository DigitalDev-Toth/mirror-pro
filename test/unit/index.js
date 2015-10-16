var Nightmare = require('nightmare');
var expect = require('chai').expect;
require('mocha-generators').install();

describe("Unit test", () => {
	var nightmare;

	beforeEach(() => {
      	nightmare = Nightmare();
    });

	describe("Core functionalities", () => {

		describe("Utils functionalities", () => {

			it("should have a 'workspace' container", function *() {
				var result = yield nightmare
					.goto("http://localhost:3000")
					.evaluate(() => {
						return MIRROR.Utils.workSpaceDetection( "workspace" );
				});

				expect( result ).to.be.true;
			});

			it("should have support for WebGL context", function *() {
				var result = yield nightmare
					.goto("http://localhost:3000")
					.evaluate(() => {
						return MIRROR.Utils.isWebGLSupported();
				});

				expect( result ).to.be.true;
			});

			it("should be 'chrome' when the name of the browser is it", function *() {
				var result = yield nightmare
					.goto("http://localhost:3000")
					.evaluate(() => {
						return MIRROR.Utils.browserDetection();
				});

				expect( result ).to.be.equal( "chrome" );
			});
		});

		describe("Instances functionalities", () => {

			/*it("should fire the 'numberofblockschange' event", function *() {
				var result = yield nightmare
					.goto("http://localhost:3000")
					.title();

				expect( result ).to.equal( "asdasdas" );
			});*/
		});
	});

	afterEach(function *() {
    	yield nightmare.end();
  	});
});