const expect = require( "chai" ).expect;

module.exports = function () {

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

    this.Then(/^I should see the "perfect scrollbar" when the mouse pointer it's over the menu$/, function(next) {

        this.driver
            .moveToObject( "#primary-menu-content", 100, 100 )
            .execute(() => {
                return document.defaultView.getComputedStyle( document.querySelector( ".ps-scrollbar-x-rail" ), null ).getPropertyValue( "opacity" );
            })
            .then((opacity) => {
                expect( parseFloat( opacity.value ) ).to.be.above(0);
            })
            .call( next );
    });
}