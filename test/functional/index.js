"use strict";

require("mocha-generators").install();

const Nightmare = require("nightmare");
const expect = require("chai").expect;

let nightmare;

describe("Functional test", () => {

	beforeEach(function *() {
      	nightmare = Nightmare();

      	yield nightmare.goto( "http://localhost:3000" );
    });

	describe("UI", () => {

		it("should have a title equal to 'Mirror Pro'", function *() {
			let title = yield nightmare
				.title();

			expect( title ).to.be.equal( "Mirror Pro" );
		});

		it("should show the 'perfect scrollbar' when the mouse pointer it's not over the menu", function *() {
			let perfectScrollbarColor = false; 

			let result = yield nightmare
				.evaluate((perfectScrollbarColor) => {
					document.getElementById( "panel-body-main-contexts" ).addEventListener( "mouseover", () => {
						perfectScrollbarColor = document.defaultView.getComputedStyle( document.querySelector( ".ps-scrollbar-y" ), null ).getPropertyValue( "background-color" );
					});

					document.getElementById( "panel-body-main-contexts" ).dispatchEvent( new MouseEvent( "mouseover" ) );

					return perfectScrollbarColor;
			}, perfectScrollbarColor);

			expect( result ).to.equal( "rgba(0, 0, 0, 0)" );
		});
	});

	afterEach(function *() {
    	yield nightmare.end();
    	
    	process.removeAllListeners();
  	});
});