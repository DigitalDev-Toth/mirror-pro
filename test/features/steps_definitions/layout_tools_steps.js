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
            .click( "#layout-tools-more" )
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

    this.Then(/^I should see the "merge" button is enabled$/, function(next) {

        this.driver
            .execute(() => {
                return document.getElementById( "layout-tools-merge" ).hasAttribute( "disabled" );
            })
            .then((result) => {
                expect( result.value ).to.be.false;
            })
            .call( next );
    });

    this.Then(/^I can select a "desk" clicking on it$/, function(next) {

    	this.driver
    		.click( "#panel-layout div div:first-child" )
    		.execute(() => {
    			if ( document.getElementById( "panel-layout" ).children[0].children[0].className === "desk-selected" ) {
    				return true;
    			} else {
    				return false;
    			} 
    		})
    		.then((result) => {
    			expect( result.value ).to.be.true;
    		})
    		.call( next );
    });

    this.Then(/^I can unselect a "desk" selected clicking on it once again$/, function(next) {

    	this.driver
    		.click( "#panel-layout div div:first-child" )
    		.execute(() => {
    			if ( document.getElementById( "panel-layout" ).children[0].children[0].className === "desk-unselected" ) {
    				return true;
    			} else {
    				return false;
    			} 
    		})
    		.then((result) => {
    			expect( result.value ).to.be.true;
    		})
    		.call( next );
    });

    this.Then(/^I can merge two selected "desks"$/, function(next) {

    	this.driver
    		.click( "#panel-layout div div:first-child" )
    		.click( "#panel-layout div div:nth-child(2)" )
    		.click( "#layout-tools-merge" )
    		.execute(() => {
    			return document.getElementById( "panel-layout" ).children[0].children.length;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal(3);
    		})
    		.call( next );
    });

    this.Then(/^I should see the "less" and "more" buttons disabled$/, function(next) {

    	this.driver
    		.execute(() => {
    			if ( document.getElementById( "layout-tools-less" ).hasAttribute( "disabled" ) &&
    				 document.getElementById( "layout-tools-more" ).hasAttribute( "disabled" ) ) {
    				return true;
    			} else {
    				return false;
    			}
    		})
    		.then((result) => {
    			expect( result.value ).to.be.true;
    		})
    		.call( next );
    });

    this.Then(/^I can undone and redone the merge$/, function(next) {

    	this.driver
    		.click( "#layout-tools-undone" )
    		.execute(() => {
    			return document.getElementById( "panel-layout" ).children[0].children.length;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal(4);
    		})
    		.click( "#layout-tools-redone" )
    		.execute(() => {
    			return document.getElementById( "panel-layout" ).children[0].children.length;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal(3);
    		})
    		.call( next );
    });

    this.Then(/^I can save the custom layout$/, function(next) {

    	this.driver
    		.click( "#layout-tools-save" )
    		.pause( 1000 )
    		.execute(() => {
    			return document.getElementById( "save-profile-layout" ).className;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal( "modal fade in" );
    		})
    		.click( "#save-profile-layout-cancel-button" )
    		.pause( 1000 )
    		.call( next );
    });

    this.When(/^I press once again the "selectable" button$/, function(next) {

    	this.driver
    		.click( "#layout-tools-selectable" )
    		.call( next );
    });

    this.Then(/^I should see the "merge" button disabled again$/, function(next) {

    	this.driver
    		.execute(() => {
    			return document.getElementById( "layout-tools-merge" ).hasAttribute( "disabled" );
    		})
    		.then((result) => {
    			expect( result.value ).to.be.true;
    		})
    		.call( next );
    });

    this.When(/^I press the "resizable" button and the "selectable" tool is on$/, function(next) {

    	this.driver
    		.click( "#layout-tools-selectable" )
    		.click( "#layout-tools-resizable" )
    		.call( next );
    });

    this.Then(/^I should see the "merge" button disabled$/, function(next) {

    	this.driver
    		.execute(() => {
    			return document.getElementById( "layout-tools-merge" ).hasAttribute( "disabled" );
    		})
    		.then((result) => {
    			expect( result.value ).to.be.true;
    		})
    		.call( next );
    });

    this.Then(/^I can resize the edges of the "desks"$/, function(next) {

    	this.driver
    		.moveToObject( "#panel-layout" )
    		.buttonDown( 0 )
    		.moveToObject( "#panel-layout", -200, -200 )
    		.buttonUp( 0 )
    		.call( next );
    });

    this.Then(/^I can cancel the custom layout$/, function(next) {

    	this.driver
    		.click( "#layout-tools-cancel" )
    		.execute(() => {
    			if ( !document.getElementById( "layout-tools-less" ).hasAttribute( "disabled" ) &&
    				 !document.getElementById( "layout-tools-more" ).hasAttribute( "disabled" ) ) {
    				return true;
    			} else {
    				return false;
    			}
    		})
    		.then((result) => {
    			expect( result.value ).to.be.true;
    		})
    		.call( next );
    });

    this.When(/^I select a predefined layout and the window size is too small$/, function(next) {

    	this.driver
    		.selectByIndex( "#layout-tools-layouts-selection", 2 )
    		.getValue( "#layout-tools-layouts-selection" )
    		.then((result) => {
    			expect( result ).to.equal( "predefined_1" );
    		})
    		.call( next );
    });

    this.Then(/^I should see the "dialog" alert telling me it's imposible to draw the layout$/, function(next) {

    	this.driver
    		.pause( 1000 )
    		.execute(() => {
    			return document.getElementById( "dialog" ).style.display;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal( "block" );
    		})
    		.click( "#dialog-ok" )
    		.selectByIndex( "#layout-tools-layouts-selection", 0 )
    		.call( next );
    });

    this.When(/^I select a predefined layout and the window size is fine$/, function(next) {

    	this.driver
    		.windowHandleSize({ width: 1600, height: 1000 })
    		.selectByIndex( "#layout-tools-layouts-selection", 2 )
    		.getValue( "#layout-tools-layouts-selection" )
    		.then((result) => {
    			expect( result ).to.equal( "predefined_1" );
    		})
    		.call( next );
    });

    this.Then(/^I should see the prefefined layout selected on the "panel-layout"$/, function(next) {

    	this.driver
    		.execute(() => {
    			return document.getElementById( "panel-layout" ).children[0].children.length;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal(7);
    		})
    		.call( next );
    });

    this.When(/^I try to merge two "desks" non-lineals$/, function(next) {

    	this.driver
    		.click( "#layout-tools-selectable" )
    		.click( "#panel-layout div div:first-child" )
    		.click( "#panel-layout div div:nth-child(5)" )
    		.click( "#layout-tools-merge" )
    		.call( next );
    });

    this.Then(/^I should see the "dialog" alert telling me it's imposible to merge those "desks"$/, function(next) {

    	this.driver
    		.pause( 1000 )
    		.execute(() => {
    			return document.getElementById( "dialog" ).style.display;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal( "block" );
    		})
    		.click( "#dialog-ok" )
    		.call( next );
    });

    this.When(/^I merge two "desks" correctly$/, function(next) {

    	this.driver
    		.click( "#panel-layout div div:first-child" )
    		.click( "#panel-layout div div:nth-child(3)" )
    		.click( "#layout-tools-merge" )
    		.call( next );
    });

    this.Then(/^I should see the "reset" button enabled$/, function(next) {

    	this.driver
    		.execute(() => {
    			return document.getElementById( "layout-tools-reset" ).hasAttribute( "disabled" );
    		})
    		.then((result) => {
    			expect( result.value ).to.be.false;
    		})
    		.call( next );
    });

    this.When(/^I press the "reset" button$/, function(next) {

    	this.driver
    		.click( "#layout-tools-reset" )
    		.call( next );
    });

    this.Then(/^I should see the predefined layout back to initial state$/, function(next) {

    	this.driver
    		.execute(() => {
    			return document.getElementById( "panel-layout" ).children[0].children.length;
    		})
    		.then((result) => {
    			expect( result.value ).to.equal(7);
    		})
    		.call( next );
    });
}