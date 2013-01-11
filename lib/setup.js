/*jshint node:true */
/*global phantom, casper, mocha, beforeEach, afterEach */

"use strict";

module.exports.setup = function(cli, files) {
    
    // load chai
    var chai = require("./contrib/chai.js");
    
    // load mocha (adds `mocha` to global scope, don't need to get the result)
    require("./contrib/mocha.js");
    
    // set up casper
    GLOBAL.casper = require("./lib/casper.js").setup({
        verbose : false
    });

    // basic mocha setup
    mocha.setup({
        ui       : "bdd",
        reporter : require("./lib/reporter.js"),
        timeout  : 10000
    });
    
    // push the 3 chai testing styles into the global scope
    [ "assert", "should", "expect" ].forEach(function(format) {
        GLOBAL[format] = chai[format];
    });
    
    // global beforeEach to reset casper steps each time
    /*beforeEach(function() {
        casper.start();
    });

    // global afterEach to start executing all the queued up steps
    afterEach(function(done) {
        console.log(casper.steps); //TODO: REMOVE DEBUGGING
        
        if(!casper.steps.length) {
            return done();
        }
        
        casper.run(function() {
            // can't pass done fn straight to casper because mocha will kvetch
            done();
        });
    });*/
    
    // load the test files
    files.forEach(function(file) {
        phantom.injectJs(file);
    });
    
    // start running tests (reporter takes care of exiting when done)
    mocha.run();
};
