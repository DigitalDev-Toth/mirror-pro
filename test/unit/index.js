import chai from "chai";
import Browser from "zombie";

const expect = chai.expect;
const browser = new Browser();

describe("Unit test", function() {

	this.timeout(5000);

	before((done) => {
		return browser.visit("http://localhost:3000", done);
	});

	describe("Core functionalities", () => {

		describe("Utils functionalities", () => {

			it("should have a 'workspace' container", (done) => {
				let result = browser.window.MIRROR.Utils.workSpaceDetection( "workspace" );

				expect( result ).to.be.true;
				done();
			});

			it("should be false when WebGL context it's not supported", (done) => {
				let result = browser.window.MIRROR.Utils.isWebGLSupported();

				expect( result ).to.be.false;
				done();
			});

			it("should be 'chrome' when the name of the browser is it", (done) => {
				let result = browser.window.MIRROR.Utils.browserDetection();

				expect( result ).to.be.equal( "chrome" );
				done();
			});
		});
	});

	describe("UI functionalities", () => {

		describe("WorkSpace", () => {

			let workspace = null;

			beforeEach(() => {
    			workspace = new browser.window.MIRROR.UI.WorkSpace();
  			});

			it("should create a 'workspace' container", (done) => {
				let workspaceDOM = workspace.createWorkSpace();

				expect( workspaceDOM ).to.be.an( "object" );
				done();
			});

			it("should get the 'workspace' container", (done) => {
				let workspaceDOM = workspace.getWorkSpace();

				expect( workspaceDOM ).to.be.an( "object" );
				done();
			});

			it("should have a 'workspace' size greater than zero", (done) => {
				let workspaceDOM = workspace.getWorkSpace();

				workspaceDOM = workspace.setWorkSpaceSize(workspaceDOM);

				expect( parseInt( workspaceDOM.style.width ) ).to.be.above(0);
				expect( parseInt( workspaceDOM.style.height ) ).to.be.above(0);
				done();
			});

			it("should have a 'LookAndFeel' structure", (done) => {
				let workspaceDOM = workspace.getWorkSpace(),
					hasChilds = workspaceDOM.hasChildNodes();

				expect( hasChilds ).to.be.true;
				done();
			});
		});

		describe("Menu", () => {

			it("should have a 'LookAndFeel' structure", (done) => {
				let menu = new browser.window.MIRROR.UI.Menu(),
					menuContainerDOM = menu.getMenuContainer( menu.getMenuContainerId() ),
					hasChilds = menuContainerDOM.hasChildNodes();

				expect( hasChilds ).to.be.true;
				done();
			});
		});
	});
});