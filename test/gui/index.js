/*import chai from "chai";
import Nightmare from "nightmare";

const expect = chai.expect;
const nightmare = Nightmare();

describe("GUI test", () => {

	before(function *() {
		return yield nightmare.goto("http://localhost:3000");
	});

	describe("WorkSpace", () => {

		it("should have a 'workspace' container", function *() {
			let workspaceDOM = yield nightmare
      			.evaluate(() => {
        			return document.getElementById("workspace");
      		});
    		
    		expect( workspaceDOM ).to.be.an( "object" );
		});

		it("should have a 'LookAndFeel' sizes greater than zero", function *() {
			let panelBodyMainContextsDOM = yield nightmare
				.evaluate(() => {
					return document.getElementById( "panel-body-main-contexts" );
			});
			
			let panelBodyMainMenuDOM = yield nightmare
				.evaluate(() => {
					return document.getElementById( "panel-body-main-menu" );
			});
			
			expect( parseInt( panelBodyMainContextsDOM.style.height ) ).to.be.above(0);
			expect( parseInt( panelBodyMainMenuDOM.style.height ) ).to.be.above(0);
		});
	});

	describe("Menu", () => {

		it("should have a 'LookAndFeel' sizes greater than zero", function *() {
			let menuContainerBodyDOM = yield nightmare
				.evaluate(() => {
					return document.getElementById( "body-menu-container" );
			});
			
			let menuContainerMainDOM = yield nightmare
				.evaluate(() => {
					return document.getElementById( "main-menu-container" );
			});
			
			expect( parseInt( menuContainerBodyDOM.style.height ) ).to.be.above(0);
			expect( parseInt( menuContainerMainDOM.style.height ) ).to.be.above(0);
		});

		it("should have a 'body' menu with sizes greater than zero", function *() {
			let menuContainerBodyContentDOM = yield nightmare
				.evaluate(() => {
					return document.getElementById( "body-menu-content" );
			});
			
			expect( parseInt( menuContainerBodyContentDOM.style.height ) ).to.be.above(0);
		});

		it("should have a 'main' menu with sizes greater than zero", function *() {
			let menuContainerMainContentDOM = yield nightmare
				.evaluate(() => {
					return document.getElementById( "main-menu-content" );
			});

			expect( parseInt( menuContainerMainContentDOM.style.height ) ).to.be.above(0);
		});
	});

	afterEach(function *() {
    	yield nightmare.end();
  	});
});*/