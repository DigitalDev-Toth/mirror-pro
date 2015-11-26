import chai from "chai";

import { Utils } from "../../src/core/utils";

const expect = chai.expect;

describe("Utils functionalities", function() {

	it("should know if a number is prime or not", (done) => {
		let prime = Utils.isPrimeNumber( 7 ),
			notPrime = Utils.isPrimeNumber( 6 );

		expect( prime ).to.be.true;
		expect( notPrime ).to.be.false;

		done();
	});

	it("should get the couple of factors of a number with the lower difference between them", (done) => {
		let factors = Utils.getTheCoupleOfFactorsWidthLowerDiff( 12 );

		expect( factors.length ).to.equal( 2 );

		done();
	});

	it("should get a number with two decimals", (done) => {
		let number = Utils.getNumberWithTwoDecimalsTruncated( 8.8889 ),
			decimals = number.toString().split( "." )[1].length;

		expect( decimals ).to.equal( 2 );

		done();
	});

	it("should know if a number have decimals", (done) => {
		let float = Utils.isFloat( 8.88 ),
			notFloat = Utils.isFloat( 8 );

		expect( float ).to.be.true;
		expect( notFloat ).to.be.false;

		done();
	});
});