/*import chai from "chai";
import Nightmare from "nightmare";

const expect = chai.expect;
const nightmare = Nightmare();

describe("Functional test", () => {

	before(function *() {
		return yield nightmare.goto("http://localhost:3000");
	});

	describe("UI", () => {

		it("should have a title equal to 'Mirror Pro'", function *() {
			let title = yield nightmare.title();

			expect( title ).to.be.equal("Mirror Pro");
		});
	});

	afterEach(function *() {
    	yield nightmare.end();
  	});
});*/