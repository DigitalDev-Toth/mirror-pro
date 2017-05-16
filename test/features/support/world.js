const webdriverio = require( "webdriverio" );

function World() {

  	this.driver = webdriverio.remote({
    	desiredCapabilities: {
        	browserName: "chrome"
    	}
	});
}

module.exports = function() {
	
  	this.World = World;
}