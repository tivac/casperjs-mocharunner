/*jshint node:true */
/*global phantom, casper, mocha, beforeEach, afterEach */

"use strict";

module.exports.setup = function(cli, files) {
    
    // load mocha (adds `mocha` to global scope, don't need to get the result)
    require("./contrib/mocha.js");

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
    
    //load the test files
    files.forEach(function(file) {
        phantom.injectJs(file);
    });
    
    // start running tests (reporter takes care of exiting when done)
    mocha.run(function() {
        console.log(JSON.stringify(arguments, null, 4)); //TODO: REMOVE DEBUGGING
    });
};
