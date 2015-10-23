import webdriverio from "webdriverio";

function World(next) {

  	this.driver = webdriverio.remote({
    	desiredCapabilities: {
        	browserName: 'chrome'
    	}
	});

  	next();
}

export default function() {
	
  	this.World = World;
};