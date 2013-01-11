/*jshint node:true */
/*global phantom, casper, mocha, beforeEach, afterEach */

var GLOBAL = this;

(function() {
    "use strict";

    var cli, files;

    if (!phantom.casperLoaded) {
        console.log('This script must be invoked using the casperjs executable');
        
        phantom.exit(1);
    }

    //check args before going any further
    cli = require("./lib/args.js");
    files = require("./lib/files.js").scan(cli.get(0) || cli.get("tests"));
    
    require("./lib/setup.js").setup(cli, files);
}());
