const expect = require( "chai" ).expect;

module.exports = function () {

    this.Given(/^the Mirror Pro page is opened$/, function(next) {
        
        this.driver
            .url( "http://localhost:3000" )
            .call( next );
    });

    this.When(/^the GUI is loaded$/, function(next) {
        
        next();
    });

    this.Then(/^It should have a "mirror-pro" container$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "mirror-pro" );
            })
            .then((result) => {
                expect( result ).to.be.an( "object" );                
            })
            .call( next );
    });

    this.Then(/^the container should have a "Component" sizes greater than zero$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "panel-layout" ).offsetHeight;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                 
            })
            .execute(() => {
                return document.getElementById( "panel-secondary-menu" ).offsetHeight;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have a "Component" sizes greater than zero$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "primary-menu-container" ).offsetHeight;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .execute(() => {
                return document.getElementById( "secondary-menu-container" ).offsetHeight;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have sizes greater than zero in the "primary" panel$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "primary-menu-content" ).offsetHeight;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have sizes greater than zero in the "secondary" panel$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "secondary-menu-content" ).offsetHeight;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have unless one block$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "primary-menu-content" ).children.length;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the "layout" should have unless one desk$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "panel-layout" ).children[0].children.length;
            })
            .then((result) => {
                expect( result.value ).to.be.above(0);                
            })
            .call( next ); 
    });
};