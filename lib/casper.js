/*jshint node:true */
/*global phantom */

"use strict";

var _ = require("./contrib/lodash.js")._,
    defaults = {
        // config
        exitOnError  : false,
        verbose      : true,
        logLevel     : "debug",
        pageSettings : {
            loadImages : false,
            loadPlugins : false
        },
        
        // callbacks
        onLoadError : function (_casper, url) {
            console.log("[onLoadError]: " + url);
        },
        
        onTimeout : function (err) {
            console.log("[Timeout]: " + err);
        }
    },
    
    casper;

module.exports.setup = function(args) {
    return require("casper").create(_.merge({}, defaults, args));
};
