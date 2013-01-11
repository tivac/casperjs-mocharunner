/*jshint node:true */
/*global describe, it, before, after, beforeEach, afterEach, casper, expect */

"use strict";

describe("test thing", function() {
    describe("smaller test thing", function() {
        it("does a test", function(done) {
            casper.start("https://www.google.com", function() {
                expect(this.currentHTTPStatus).to.equal(200);
            });
            
            casper.run(function() {
                done();
            });
        });
    });
    
    describe("before/afterEach example", function() {
        beforeEach(function() {
            casper.start();
        });
        
        afterEach(function(done) {
            if(!casper.steps.length) {
                return done();
            }
            
            casper.run(function() { done(); });
        });
        
        it("does a simple test", function() {
            casper.open("https://www.google.com");
             
            casper.then(function() {
                expect(this.currentHTTPStatus).to.equal(200);
            });
        });
        
        it("should fail", function() {
            casper.open("https://www.google.com");
            
            casper.then(function() {
                expect(this.currentHTTPStatus).to.equal(500);
            });
        });
    });
});
