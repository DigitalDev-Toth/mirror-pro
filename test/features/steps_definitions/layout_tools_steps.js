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

    this.When(/^I press the "add desks" button and next the "remove desks" button$/, function(next) {

    	this.driver
    		.click( "#layout-tools-more" )
    		.click( "#layout-tools-less" )
    		.call( next );
    });

    this.Then(/^I should see the same layout of the beginning$/, function(next) {

    	this.driver
    		.execute(() => {
    			return document.getElementById( "panel-layout" ).children[0].children.length;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal(1);
    		})
    		.call( next );
    })
}