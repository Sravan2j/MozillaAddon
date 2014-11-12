const { Cc, Ci, Cu, components } = require('chrome');
//components.utils.import("resource://gre/modules/Services.jsm");
components.utils.import("resource://gre/modules/FileUtils.jsm");


var system = require("sdk/system");
// PATH environment variable
console.log(system.env.PATH);
// operating system
console.log("platform = " + system.platform);
// processor architecture
console.log("architecture = " + system.architecture);
// compiler used to build host application
console.log("compiler = " + system.compiler);
// host application build identifier
console.log("build = " + system.build);
// host application UUID
console.log("id = " + system.id);
// host application name
console.log("name = " + system.name);
// host application version
console.log("version = " + system.version);
// host application vendor
console.log("vendor = " + system.vendor);
// host application profile directory
console.log("profile directory = " + system.pathFor("ProfD"));
//document.write('Your OS: '+OSName);

// get the "data.txt" file in the profile directory
var file2 = FileUtils.getFile("AChrom", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("APlugns", ["data.txt"]);
console.log("file2 = " + file2.path);
//var file2 = FileUtils.getFile("ComsD", ["data.txt"]);
//console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("CurProcD", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("DefProfRt", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("DefRt", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("Desk", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("DfltDwnld", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("Home", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("PrfDef", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("ProfD", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("ProfDefNoLoc", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("ProfLD", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("Progs", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("TmpD", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("UChrm", ["data.txt"]);
console.log("file2 = " + file2.path);
var file2 = FileUtils.getFile("resource:app", ["data.txt"]);
console.log("file2 = " + file2.path);

//var file1 = Services.dirsvc.get("ProfD", Ci.nsIFile);
//console.log("file1 = " + file1.path);

const window = require("sdk/windows");

// create an nsIFile for the executable
var file = Cc["@mozilla.org/file/local;1"]
                     .createInstance(Ci.nsIFile);





//file.initWithPath("C:\\Users\\Sravan\\Downloads\\addon-sdk-1.17\\addon-sdk-1.17\\test-addon\\data\\test.bat");
file.initWithPath("//root//Downloads//addon-sdk-1.17//test-addon1//data//test.sh");

// create an nsIProcess
var process = Cc["@mozilla.org/process/util;1"]
                        .createInstance(Ci.nsIProcess);
process.init(file);

// Run the process.
// If first param is true, calling thread will be blocked until
// called process terminates.
// Second and third params are used to pass command-line arguments
// to the process.
//var args = ["argument1", "argument2"];
var args = [];
process.run(false, args, args.length);

