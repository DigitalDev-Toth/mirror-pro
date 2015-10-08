import chai from "chai";
import Browser from "zombie";

const expect = chai.expect;
const browser = new Browser();

describe("Functional test", function() {

	this.timeout(5000);

	before((done) => {
		return browser.visit("http://localhost:3000", done);
	});

	describe("UI", () => {

		it("should have a title equal to 'Mirror Pro'", (done) => {
			let title = browser.text("title");

			expect( title ).to.be.equal("Mirror Pro");
			done();
		});
	});
});