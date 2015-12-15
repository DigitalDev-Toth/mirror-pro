const expect = require( "chai" ).expect;

module.exports = function () {

    this.Given(/^I'm using the "Layout Tools"$/, function(next) {
        
       this.driver
            .url( "http://localhost:3000" )
            .call( next );
    });

    this.Then(/^I see some buttons disabled$/, function(next) {
        
        this.driver
            .execute(() => {
            	var block = document.getElementById( "layout-tools" ),
            		buttonsDisabled = block.querySelectorAll( "[disabled]" );

                return buttonsDisabled.length;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);
            })
            .call( next );
    });
}