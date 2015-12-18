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

    this.When(/^I press three times the "add desks" button and next two times the "remove desks" button$/, 
        function(next) {

    	this.driver
    		.click( "#layout-tools-more" )
            .click( "#layout-tools-more" )
            .click( "#layout-tools-more" )
    		.click( "#layout-tools-less" )
            .click( "#layout-tools-less" )
    		.call( next );
    });

    this.Then(/^I should see two desks into the layout$/, function(next) {

    	this.driver
    		.execute(() => {
    			return document.getElementById( "panel-layout" ).children[0].children.length;
    		})
    		.then((result) => {
    			expect( result.value ).to.above(1);
    		})
    		.call( next );
    });

    this.When(/^I press the "selectable" button$/, function(next) {

        this.driver
            .click( "#layout-tools-selectable" )
            .call( next );
    });

    this.Then(/^I see the "merge" button is enabled$/, function(next) {

        this.driver
            .execute(() => {
                return document.getElementById( "layout-tools-merge" ).hasAttribute( "disabled" );
            })
            .then((result) => {
                expect( result.value ).to.be.false;
            })
            .call( next );
    });
}