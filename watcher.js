var watchman = require("fb-watchman");
var spawn = require("child_process").spawn;

var client = new watchman.Client();

var test_dir = __dirname +"/test/";

client.capabilityCheck({optional:[], required:["relative_root"]},
  	function (error, resp) {
    	if (error) {
      		console.log(error);
      		client.end();
      		return;
		  }

    	client.command(["watch-project", test_dir],
      		function (error, resp) {
        		if (error) {
          			console.error("Error initiating watch:", error);
          			return;
        		}

        		if ("warning" in resp) {
          			console.log("warning: ", resp.warning);
        		}

        		console.log("watch established on ", resp.watch,
                    " relative_path", resp.relative_path);
        		make_subscription( client, resp.watch, resp.relative_path );
      	});
});

function make_subscription(client, watch, relative_path) {
  	var sub = {
    	expression: ["allof", ["match", "*.js"]],
    	fields: ["name", "size", "exists", "type"]
  	};
  	if (relative_path) {
    	sub.relative_root = relative_path;
  	}

  	client.command(["subscribe", watch, "test-subscription", sub],
    	function (error, resp) {
      		if (error) {
        		console.error("failed to subscribe: ", error);
        		return;
      		}
      		console.log("subscription " + resp.subscribe + " established");
	});

  	client.on("subscription", function (resp) {
    	for (var i in resp.files) {
      		var f = resp.files[i];
      		if (resp.subscription == "test-subscription") {
        		console.log("file changed: " + f.name);
      		}
    	}
    	if (resp.subscription == "test-subscription") {
            spawn("./node_modules/.bin/mocha", ["--compilers",  "js:mocha-babel", "test/*.js"], {stdio: "inherit"});
  		}
  	});
}