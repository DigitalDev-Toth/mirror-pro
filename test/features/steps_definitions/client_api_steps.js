import chai from "chai";

const expect = chai.expect;

export default function () {

    this.Given(/^I am on the Mirror Pro page$/, function(next) {
        
        this.driver
            .url( "http://localhost:3000" )
            .call( next );
    });

    this.When(/^I use the API$/, function(next) {
        
        next();
    });

    this.Then(/^I should see if the "workspace" container exist$/, function(next) {
    
        this.driver
            .execute(() => {
                return MIRROR.Utils.workSpaceDetection( "workspace" );
            })
            .then((result) => {
                expect( result.value ).to.be.true;
            })
            .call( next );
    });

    this.Then(/^I should see if the browser has support for WebGL context$/, function(next) {

        this.driver
            .execute(() => {
                return MIRROR.Utils.isWebGLSupported();
            })                  
            .then((result) => {
                expect( result.value ).to.be.true;                      
            })
            .call( next );
    });

    this.Then(/^I should see the browser name I'm using$/, function(next) {

        this.driver
            .execute(() => {
                return MIRROR.Utils.browserDetection();
            })                  
            .then((result) => {
                expect( result.value ).to.be.equal( "chrome" );
            })
            .call( next );
    });

    this.Then(/^I should fire the "numberofblockschange" event$/, function(next) {

        this.driver
            .execute(() => {
                let checkFireEvent = false;

                MIRROR.Instances.customEvents.onNumberOfBlocksChange( window, () => {
                    checkFireEvent = true;
                });

                MIRROR.Instances.customEvents.dispatchNumberOfBlocksChange( window );
        
                return checkFireEvent;
            })
            .then((result) => {
                expect( result.value ).to.be.true;
            })
            .call( next );
    });
};