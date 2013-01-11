/*jshint node:true */
/*global phantom */

"use strict";

var fs = require("fs"),
    _dotsRegex = /^\.|\.\.$/,
    _files;

_files = function(path) {
    if(fs.exists(path) && fs.isFile(path)) {
        return path;
    }
    
    if(!fs.isDirectory(path)) {
        return false;
    }
    
    fs.list(path).forEach(function (e) {
        if(!_dotsRegex.test(e)) {
            _files(path + "/" + e);
        }
    });
};

module.exports.scan = function(dir) {
    var paths = [];
    
    if(!fs.isDirectory(dir)) {
        return [];
    }
    
    //TODO: make this recurse directories (see _files impl above)
    paths = paths.concat(
        fs.list(dir).filter(function(path) {
            return !_dotsRegex.test(path);
        }).map(function(path) {
            return [ fs.workingDirectory, dir, path ].join(fs.separator);
        })
    );
    
    return paths;
};
