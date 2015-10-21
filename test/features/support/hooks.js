export default function () {
    
    this.Before(function(scenario, next) {

        this.driver
            .init()
            .call( next );
    });

    this.After(function(scenario, next) {          

        this.driver
            .end()
            .call( next );
    });
};