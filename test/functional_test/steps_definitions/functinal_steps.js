import chai from "chai";

const expect = chai.expect;

export default function () {

    this.Given(/^I am on the Mirror Pro page$/, function(next) {
        
        this.driver
            .url( "http://localhost:3000" )
            .call( next );
    });

    this.When(/^I see the page$/, function(next) {
        
        next();
    });

    this.Then(/^I should see "(.*)" as the page title$/, function(title, next) {
    
        this.driver
            .title(( err, res ) => {
                expect( res.value ).to.equal( title );        
            })
            .call( next );
    });
};