import chai from "chai";
import Browser from "zombie";

const expect = chai.expect;
const browser = new Browser();

describe("Functional test", function() {

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