/*jshint node:true */
/*global describe, it, before, after, beforeEach, afterEach */

"use strict";

describe("test thing", function() {
    describe("smaller test thing", function() {
        it("does a test", function(done) {
            casper.start("http://google.com", function() {
                assert(false, "false shouldn't pass assertion");
            });
            
            casper.run(function() {
                done();
            });
        });
    });
});
