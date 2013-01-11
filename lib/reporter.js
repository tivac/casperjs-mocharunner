/*jshint node:true */
/*global casper */
"use strict";

function CasperReporter(runner) {
    var self = this,
        stats = this.stats = {
            suites   : 0,
            tests    : 0,
            passes   : 0,
            pending  : 0,
            failures : 0
        },
        failures = [],
        indents  = 0,
        symbols  = {
            ok     : "✓",
            err    : "✖",
            middot : "•",
            dot    : "․"
        };
    
    if(require("system").os.name === "windows") {
        symbols.ok     = "OK";
        symbols.err    = "X";
        symbols.dot    = ".";
        symbols.middot = "-";
    }
    
    function indent() {
        return new Array(2 * indents).join(" ");
    }

    if(!runner) {
        return;
    }

    this.runner = runner;
    runner.stats = stats;

    runner.on("suite", function(suite) {
        console.log(indent() + suite.title);
        
        ++indents;
    });

    runner.on("suite end", function(suite) {
        --indents;
        
        if(1 === indents) {
            console.log();
        }
    });

    runner.on("test", function(test) {
        console.log(indent() + symbols.middot + " " + test.title);
    });

    runner.on("pending", function(test) {
        console.log(indent() + "pending " + test.title);
    });

    runner.on("pass", function(test) {
        console.log(indent() + symbols.ok + " " + test.title);
        
        stats.passes++;
    });

    runner.on("fail", function(test, err) {
        stats.failures++;
        test.err = err;
        failures.push(test);
        
        console.log(indent() + symbols.err + " " + test.title + ": " + err);
    });

    runner.on("test end", function(test) {
        stats.tests = stats.tests || 0;
        stats.tests++;
    });

    runner.on("end", function() {
        var msg, failures;
        
        if(stats.failures) {
            msg = (stats.failures + " tests failed");
            
            failures = true;
        } else {
            msg = "All tests passed";
        }
        
        console.log("\n" + msg + " (" + stats.tests + " tests run).");
        
        casper.exit(failures);
    });
}

module.exports = CasperReporter;
