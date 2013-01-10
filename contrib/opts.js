/*jshint node:true */
module.exports = function(a) {
    "use strict";
    
    return a.map(function(c, d) {
        return {
            n: c.match(/^--?(.+)/),
            v: a[d + 1] || !0
        };
    }).reduce(function(a, b) {
        b.n && (a[b.n[1]] = b.v);
        return a;
    }, {});
};
