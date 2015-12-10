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

    this.Given(/^I'm using the "Layout Tools"$/, function(next) {
        
        next();
    });

/*    this.Then(/^I see some buttons disabled$/, function(next) {
        
        this.driver
            .execute(() => {
            	let buttons = document.getElementById( "btn-primary-block" ),
            		buttonsDisabledCount = 4;

            	for ( let i = 0; i < buttons.length; i++ ) {
            		if ( buttons[i].getAttribute( "disabled" ) !== null ) {
            			buttonsDisabledCount++;
            		}
            	}

                return document.getElementsByClassName( "btn-primary-block" ).length;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .call( next );
    });*/
}