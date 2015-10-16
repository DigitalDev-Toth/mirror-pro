"use strict";

require("mocha-generators").install();

const Nightmare = require("nightmare");
const expect = require("chai").expect;

let nightmare;

describe("Unit test", () => {

	beforeEach(function *() {
      	nightmare = Nightmare();

      	yield nightmare.goto( "http://localhost:3000" );
    });

	describe("Core functionalities", () => {

		describe("Utils functionalities", () => {

			it("should have a 'workspace' container", function *() {
				let result = yield nightmare					
					.evaluate(() => {
						return MIRROR.Utils.workSpaceDetection( "workspace" );
				});

				expect( result ).to.be.true;
			});

			it("should have support for WebGL context", function *() {
				let result = yield nightmare					
					.evaluate(() => {
						return MIRROR.Utils.isWebGLSupported();
				});

				expect( result ).to.be.true;
			});

			it("should be 'chrome' when the name of the browser is it", function *() {
				let result = yield nightmare					
					.evaluate(() => {
						return MIRROR.Utils.browserDetection();
				});

				expect( result ).to.be.equal( "chrome" );
			});
		});

		describe("Instances functionalities", () => {

			it("should fire the 'numberofblockschange' event", function *() {
				let checkFireEvent = false;

				let result = yield nightmare					
					.evaluate((checkFireEvent) => {
						MIRROR.Instances.customEvents.onNumberOfBlocksChange( window, () => {
							checkFireEvent = true;
						});

						MIRROR.Instances.customEvents.dispatchNumberOfBlocksChange( window );
				
						return checkFireEvent;
				}, checkFireEvent);

				expect( result ).to.be.true;
			});
		});
	});

	afterEach(function *() {
    	yield nightmare.end();

    	process.removeAllListeners();
  	});
});