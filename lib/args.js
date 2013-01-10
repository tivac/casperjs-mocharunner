/*jshint node:true */
/*global phantom */

// we want access to args before casper's initialized
var fs  = require("fs"),
    cli = require("cli").parse(phantom.args);
    
//clear out some stuff we don't care about
cli.drop(0);
cli.drop("cli");
cli.drop("casper-path");

//show help & bail
//TODO: Casper hijacks this! How do we work around it?
if(cli.get("help")) {
    console.log(fs.read("usage.txt"));
    
    phantom.exit(1);
}

//fallback to current dir if no test dir passed
if(!fs.isDirectory(cli.get(0)) &&
   !fs.isFile(cli.get(0)) &&
   !fs.isDirectory(cli.get("tests")) &&
   !fs.isFile(cli.get("tests"))
) {
    //cover all our bases
    cli.args.push(".");
    cli.options.tests = ".";
    cli.raw.args.push(".");
    cli.raw.options.tests = ".";
}

module.exports = cli;
