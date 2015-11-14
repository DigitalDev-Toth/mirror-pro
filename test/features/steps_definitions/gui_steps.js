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

    this.Then(/^it should have a "workspace" container$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "workspace" );
            })
            .then((workspaceDOM) => {
                expect( workspaceDOM ).to.be.an( "object" );                
            })
            .call( next );
    });

    this.Then(/^the container should have a "LookAndFeel" sizes greater than zero$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "panel-body-main-contexts" ).offsetHeight;
            })
            .then((panelBodyMainContextsDOMHeight) => {
                expect( panelBodyMainContextsDOMHeight.value ).to.be.above(0);                
            })
            .execute(() => {
                return document.getElementById( "panel-body-main-menu" ).offsetHeight;
            })
            .then((panelBodyMainMenuDOMHeight) => {
                expect( panelBodyMainMenuDOMHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have a "LookAndFeel" sizes greater than zero$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "body-menu-container" ).offsetHeight;
            })
            .then((menuContainerBodyDOMHeight) => {
                expect( menuContainerBodyDOMHeight.value ).to.be.above(0);                
            })
            .execute(() => {
                return document.getElementById( "main-menu-container" ).offsetHeight;
            })
            .then((menuContainerMainDOMHeight) => {
                expect( menuContainerMainDOMHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have sizes greater than zero in the "body" panel$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "body-menu-content" ).offsetHeight;
            })
            .then((menuContainerBodyContentDOMHeight) => {
                expect( menuContainerBodyContentDOMHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have sizes greater than zero in the "main" panel$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "main-menu-content" ).offsetHeight;
            })
            .then((menuContainerMainContentDOMHeight) => {
                expect( menuContainerMainContentDOMHeight.value ).to.be.above(0);                
            })
            .call( next ); 
    });

    this.Then(/^the menu should have mutiple blocks$/, function(next) {
        
        this.driver
            .execute(() => {
                return document.getElementById( "body-menu-content" ).children.length;
            })
            .then((menuContainerBodyContentDOMChildrenLength) => {
                expect( menuContainerBodyContentDOMChildrenLength.value ).to.be.above(0);                
            })
            .call( next ); 
    });
};