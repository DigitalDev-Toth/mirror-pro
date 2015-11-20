import chai from "chai";

const expect = chai.expect;

export default function () {

    this.Given(/^the Mirror Pro page is opened$/, function(next) {
        
        this.driver
            .url( "http://localhost:3000" )
            .call( next );
    });

    this.When(/^the GUI is loaded$/, function(next) {
        
        next();
    });

    this.Then(/^it should have a "mirror-pro" container$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "mirror-pro" );
            })
            .then((mirrorProContainer) => {
                expect( mirrorProContainer ).to.be.an( "object" );                
            })
            .call( next );
    });

    this.Then(/^the container should have a "Component" sizes greater than zero$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "panel-contexts" ).offsetHeight;
            })
            .then((panelContextsHeight) => {
                expect( panelContextsHeight.value ).to.be.above(0);                 
            })
            .execute(() => {
                return document.getElementById( "panel-secondary-menu" ).offsetHeight;
            })
            .then((panelSecondaryMenuHeight) => {
                expect( panelSecondaryMenuHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have a "Component" sizes greater than zero$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "primary-menu-container" ).offsetHeight;
            })
            .then((menuContainerBodyDOMHeight) => {
                expect( menuContainerBodyDOMHeight.value ).to.be.above(0);                
            })
            .execute(() => {
                return document.getElementById( "secondary-menu-container" ).offsetHeight;
            })
            .then((menuContainerMainDOMHeight) => {
                expect( menuContainerMainDOMHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have sizes greater than zero in the "primary" panel$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "primary-menu-content" ).offsetHeight;
            })
            .then((menuContainerBodyContentDOMHeight) => {
                expect( menuContainerBodyContentDOMHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have sizes greater than zero in the "secondary" panel$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "secondary-menu-content" ).offsetHeight;
            })
            .then((menuContainerMainContentDOMHeight) => {
                expect( menuContainerMainContentDOMHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have mutiple blocks$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "primary-menu-content" ).children.length;
            })
            .then((menuContainerBodyContentDOMChildrenLength) => {
                expect( menuContainerBodyContentDOMChildrenLength.value ).to.be.above(0);                
            })
            .call( next ); 
    });
};