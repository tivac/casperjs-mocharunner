/*jshint node:true */
/*global describe, it, before, after, beforeEach, afterEach, casper, expect */

"use strict";

describe("test thing", function() {
    describe("smaller test thing", function() {
        it("does a test", function(done) {
            casper.start("http://google.com", function() {
                expect(this.currentHTTPStatus).to.equal(301);
            });
            
            casper.run(function() {
                done();
            });
        });
    });
});
