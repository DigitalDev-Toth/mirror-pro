const expect = require( "chai" ).expect;

module.exports = function () {

    this.Given(/^I am developing for Mirror Pro$/, function(next) {
        
        this.driver
            .url( "http://localhost:3000" )
            .call( next );
    });

    this.When(/^I use the API$/, function(next) {
        
        next();
    });

    this.Then(/^I should know if the browser has support for WebGL context or just for Canvas2D$/, function(next) {

        this.driver
            .execute(() => {
                if ( MIRROR.Utils.isWebGLSupported() ) {
                    return true;
                } else if ( MIRROR.Utils.isCanvas2DSupported() ) {
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

    this.Then(/^I should know the browser name I'm using$/, function(next) {

        this.driver
            .execute(() => {
                return MIRROR.Utils.browserDetection();
            })                  
            .then((result) => {
                expect( result.value ).to.not.be.false;
            })
            .call( next );
    });
};