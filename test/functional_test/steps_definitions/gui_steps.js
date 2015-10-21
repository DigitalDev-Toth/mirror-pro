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

    this.Then(/^It should have "workspace" container$/, function(next) {
        
        this.driver
            .execute(function() {
                return document.getElementById( "workspace" );
            }).then(function(workspaceDOM) {
                expect( workspaceDOM ).to.be.an( "object" );                
            })
            .call(next);
    });

    this.Then(/^It should have "workspace" container$/, function(next) {
        
        this.driver
            .execute(function() {
                return document.getElementById( "workspace" );
            }).then(function(workspaceDOM) {
                expect( workspaceDOM ).to.be.an( "object" );                
            })
            .call(next);
    });
};