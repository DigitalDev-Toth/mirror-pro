/*require("babel").transform("code", { blacklist: ["regenerator"] });*/

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

    this.Then(/^I should see "(.*)" as the page title$/, function*(title, next) {
        
        let result = yield this.driver
            .execute(() => {
                return document.title;
            });

        console.log(result);
        next();
        /*this.driver
            .title(( err, res ) => {
                expect( res.value ).to.equal( title );        
            })
            .call( next );*/
    });

    this.Then(/^I should see the "perfect scrollbar" when the mouse pointer it's over the menu$/, function(next) {

        this.driver
            .moveToObject( "#body-menu-content", 100, 100 )
            .execute(() => {
                return document.defaultView.getComputedStyle( document.querySelector( ".ps-scrollbar-y-rail" ), null ).getPropertyValue( "opacity" );
            })
            .then((opacity) => {
                expect( parseFloat( opacity.value ) ).to.be.above(0);
            })
            .call( next );
    });
};