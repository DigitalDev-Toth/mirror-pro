"use strict";

require("mocha-generators").install();

const Nightmare = require("nightmare");
const expect = require("chai").expect;

let nightmare;

describe("GUI test", () => {

	beforeEach(function *() {
      	nightmare = Nightmare();

      	yield nightmare.goto( "http://localhost:3000" );
    });

	describe("WorkSpace", () => {

		it("should have a 'workspace' container", function *() {
			let workspaceDOM = yield nightmare
      			.evaluate(() => {
        			return document.getElementById( "workspace" );
      		});
    		expect( workspaceDOM ).to.be.an( "object" );
		});

		it("should have a 'LookAndFeel' sizes greater than zero", function *() {
			let panelBodyMainContextsDOMHeight = yield nightmare
				.evaluate(() => {
					return document.getElementById( "panel-body-main-contexts" ).offsetHeight;
			});
			
			let panelBodyMainMenuDOMHeight = yield nightmare
				.evaluate(() => {
					return document.getElementById( "panel-body-main-menu" ).offsetHeight;
			});

			expect( panelBodyMainContextsDOMHeight ).to.be.above(0);
			expect( panelBodyMainMenuDOMHeight ).to.be.above(0);
		});
	});

	describe("Menu", () => {

		it("should have a 'LookAndFeel' sizes greater than zero", function *() {
			let menuContainerBodyDOMHeight = yield nightmare
				.evaluate(() => {
					return document.getElementById( "body-menu-container" ).offsetHeight;
			});
			
			let menuContainerMainDOMHeight = yield nightmare
				.evaluate(() => {
					return document.getElementById( "main-menu-container" ).offsetHeight;
			});
			
			expect( menuContainerBodyDOMHeight ).to.be.above(0);
			expect( menuContainerMainDOMHeight ).to.be.above(0);
		});

		it("should have sizes greater than zero in 'body' panel", function *() {
			let menuContainerBodyContentDOMHeight = yield nightmare
				.evaluate(() => {
					return document.getElementById( "body-menu-content" ).offsetHeight;
			});
			
			expect( menuContainerBodyContentDOMHeight ).to.be.above(0);
		});

		it("should have sizes greater than zero in 'main' panel", function *() {
			let menuContainerMainContentDOMHeight = yield nightmare
				.evaluate(() => {
					return document.getElementById( "main-menu-content" ).offsetHeight;
			});

			expect( menuContainerMainContentDOMHeight ).to.be.above(0);
		});

		it("should have mutiples blocks", function *() {
			let menuContainerBodyContentDOMChildrenLength = yield nightmare
				.evaluate(() => {
					return document.getElementById( "body-menu-content" ).children.length;
			});

			expect( menuContainerBodyContentDOMChildrenLength ).to.be.above(0);
		});
	});

	afterEach(function *() {
    	yield nightmare.end();
    	
    	process.removeAllListeners();
  	});
});