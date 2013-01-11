/*jshint node:true */
/*global phantom, casper, mocha, beforeEach, afterEach */

var GLOBAL = this;

(function() {
    "use strict";

    if (!phantom.casperLoaded) {
        console.log('This script must be invoked using the casperjs executable');
        phantom.exit(1);
    }

    var fs     = require("fs"),
        utils  = require("utils"),
        
        _files = require("./lib/files.js"),
        _cli;
    
    //check args before going any further
    _cli = require("./lib/args.js");
    
    require("./lib/setup.js").setup(_cli, _files.scan(_cli.get(0) || _cli.get("tests")));
    
    // load mocha (adds `mocha` to global scope, don't need to get the result)
    /*require("./contrib/mocha.js");

    //set up casper
    GLOBAL.casper = require("./lib/casper.js").setup({});

    // basic mocha setup
    mocha.setup({
        ui       : "bdd",
        reporter : require("./lib/reporter.js")
    });

    // add global beforeEach/afterEach to handle some casper plumbing
    beforeEach(function() {
        casper.start();
    });

    afterEach(function(done) {
        if(!casper.steps.length) {
            return done();
        }
        
        casper.run(done);
    });
    
    console.log(_files()); //TODO: REMOVE DEBUGGING*/
    
    // start running tests (reporter takes care of exiting when done)
    //mocha.run();

    phantom.exit();

}());
