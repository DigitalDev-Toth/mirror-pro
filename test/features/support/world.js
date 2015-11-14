import webdriverio from "webdriverio";

function World() {

  	this.driver = webdriverio.remote({
    	desiredCapabilities: {
        	browserName: "chrome"
    	}
	});
}

export default function() {
	
  	this.World = World;
}