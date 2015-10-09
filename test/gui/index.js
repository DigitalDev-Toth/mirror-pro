import chai from "chai";
import Browser from "zombie";

const expect = chai.expect;
const browser = new Browser();

describe("GUI test", function() {

	this.timeout(5000);

	before((done) => {
		return browser.visit("http://localhost:3000", done);
	});

	describe("WorkSpace", () => {

		it("should have a 'workspace' container", (done) => {
			let workspaceDOM = browser.document.getElementById("workspace");

			expect( workspaceDOM ).to.be.an( "object" );
			done();
		});

		it("should have a 'LookAndFeel' sizes greater than zero", (done) => {
			let panelBodyMainContextsDOM = browser.document.getElementById( "panel-body-main-contexts" ),
				panelBodyMainMenuDOM = browser.document.getElementById( "panel-body-main-menu" );

			expect( parseInt( panelBodyMainContextsDOM.style.height ) ).to.be.above(0);
			expect( parseInt( panelBodyMainMenuDOM.style.height ) ).to.be.above(0);
			done();
		});
	});

	describe("Menu", () => {

		it("should have a 'LookAndFeel' sizes greater than zero", (done) => {
			let menuContainerBodyDOM = browser.document.getElementById( "body-menu-container" ),
				menuContainerMainDOM = browser.document.getElementById( "main-menu-container" );

			expect( parseInt( menuContainerBodyDOM.style.height ) ).to.be.above(0);
			expect( parseInt( menuContainerMainDOM.style.height ) ).to.be.above(0);
			done();
		});

		it("should have a 'body' menu with sizes greater than zero", (done) => {
			let menuContainerBodyTopDOM = browser.document.getElementById( "body-menu-top" ),
				menuContainerBodyContentDOM = browser.document.getElementById( "body-menu-content" );

			expect( parseInt( menuContainerBodyTopDOM.style.height ) ).to.be.above(0);
			expect( parseInt( menuContainerBodyContentDOM.style.height ) ).to.be.above(0);
			done();
		});

		it("should have a 'main' menu with sizes greater than zero", (done) => {
			let menuContainerMainLeftDOM = browser.document.getElementById( "main-menu-left" ),
				menuContainerMainContentDOM = browser.document.getElementById( "main-menu-content" );

			expect( parseInt( menuContainerMainLeftDOM.style.width ) ).to.be.above(0);
			expect( parseInt( menuContainerMainContentDOM.style.height ) ).to.be.above(0);
			done();
		});
	});
});