/*jshint node:true */
/*global casper */
"use strict";

function CasperReporter(runner) {
    var self = this,
        stats = this.stats = {
            suites: 0,
            tests: 0,
            passes: 0,
            pending: 0,
            failures: 0
        },
        failures = [],
        indents = 0,
        symbols = {
            ok: "✓",
            err: "✖",
            middot: "•",
            dot: "․"
        };
    
    if(require("system").os.name === "windows") {
        symbols.ok = "\u221A";
        symbols.err = "\u00D7";
        symbols.dot = ".";
    }
    
    function indent(str) {
        return _.str.pad("", 2 * indents) + str;
    }

    if(!runner) {
        return;
    }

    this.runner = runner;
    runner.stats = stats;

    runner.on("start", function() {});

    runner.on("suite", function(suite) {
        console.log("\n" + indent(suite.title.cyan.underline));
        ++indents;
    });

    runner.on("suite end", function(suite) {
        --indents;
        if(1 === indents) {
            console.log();
        }
    });

    runner.on("test", function(test) {
        console.log("\n" + indent(symbols.middot + " " + test.title));
    });

    runner.on("pending", function(test) {
        console.log(indent("pending ".magenta + test.title));
    });

    runner.on("pass", function(test) {
        console.log(indent(symbols.ok + " (" + test.title + ")").green);
        stats.passes++;
    });

    runner.on("fail", function(test, err) {
        stats.failures++;
        test.err = err;
        failures.push(test);
        console.log(indent(symbols.err + " (" + test.title + ")").red + ": " + err);
    });

    runner.on("test end", function(test) {
        stats.tests = stats.tests || 0;
        stats.tests++;
    });

    runner.on("end", function() {
        var msg, failures;
        
        if(stats.failures) {
            msg = (stats.failures + " tests failed").red;
            failures = true;
        } else {
            msg = "All tests passed".green;
        }
        
        msg = "\n" + msg + " (" + stats.tests + " tests run).";
        
        console.log(msg);
        
        casper.exit(failures);
    });
}

module.exports = CasperReporter;
