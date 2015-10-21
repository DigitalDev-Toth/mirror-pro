import webdriverio from "webdriverio";

function World(callback) {

  	this.driver = webdriverio.remote({
    	desiredCapabilities: {
        	browserName: 'chrome'
    	}
	});

  	callback();
}

export default function() {
	
  	this.World = World;
};