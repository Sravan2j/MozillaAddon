/*
var {
    viewFor
} = require("sdk/view/core");
var window = viewFor(require("sdk/windows").browserWindows[0]);
*/

/*--- for unit testing ---*/
var {
    viewFor
} = require("sdk/view/core");

var window = viewFor(require("sdk/windows").browserWindows[0]);
/*--- for unit testing ---*/


const windowUtils = require("sdk/window/utils");
addonReloadRequest = false;
start = 0;
end = 0;
const {
    Cc, Ci, Cu
} = require("chrome");
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);

var myExtension = {
    init: function() {
        addonReloadRequest = false;
        
        //console.log(addonReloadRequest);

        if (addonReloadRequest == false) {

            //console.log(addonReloadRequest+"entereddddd");
            var prefSrv = this.prefService = Cc["@mozilla.org/preferences-service;1"]
                .getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch);
            var PBI = Ci.nsIPrefBranch2;
            this.mozJSPref = prefSrv.getBranch("javascript.").QueryInterface(PBI);

            this.mozJSPref.setBoolPref("enabled", false);
        }
        /*
        if (verbose) {
          alert("Narcissus has been set as your JavaScript engine.  "
          + "Reload to rerun the JavaScript on the current page.");
        */

        if (gBrowser) gBrowser.addEventListener("DOMContentLoaded", this.onPageLoad, false);
        if (gBrowser) gBrowser.addEventListener("unload", this.onPageUnload, true);

    },
    onPageLoad: function(aEvent) {
        start = new Date();
        //console.log(addonReloadRequest+"onload");

        if (addonReloadRequest == false) {

            //console.log(addonReloadRequest+"onload entered");
            var system = require("sdk/system");

            var platform_str = system.platform;
            var str = platform_str.toLowerCase();

            // create an nsIFile for the executable
            var file = Cc["@mozilla.org/file/local;1"]
                .createInstance(Ci.nsIFile);
            //file.initWithPath("C:\\Users\\Sravan\\Downloads\\addon-sdk-1.17\\addon-sdk-1.17\\test-addon\\data\\test.bat");

            file.initWithPath("/bin/sh");

            // create an nsIProcess
            var process = Cc["@mozilla.org/process/util;1"]
                .createInstance(Ci.nsIProcess);

            var tabs = require('sdk/tabs');
            var self = require("sdk/self");
            //var panel = require("sdk/panel");
            const fileIO = require("sdk/io/file");
            const temp_file = require("sdk/io/file");

            var path1 = "/Users/sravan2j/Downloads/addon-sdk-1.17/test-addon1/data";

            panel = require("sdk/tabs").activeTab.attach({
                contentScriptFile: [self.data.url("jquery-1.10.0.min.js"), self.data.url("my-script.js")]
            });

            panel.port.on("myMessage", function handleMyMessage(code) {

                    var TextWriter = fileIO.open(path1 + "/test.js", "w");
                    if (!TextWriter.closed) {
                        TextWriter.write(code);
                        TextWriter.close();
                        // create a new tmp file
                        var ds = Cc["@mozilla.org/file/directory_service;1"].getService();
                        var dsprops = ds.QueryInterface(Ci.nsIProperties);
                        var tmpFile = dsprops.get("TmpD", Ci.nsIFile);
                        tmpFile.append("Query.tmp");
                        tmpFile.createUnique(tmpFile.NORMAL_FILE_TYPE, 0600);
                        //file.initWithPath("//root//Downloads//addon-sdk-1.17//test-addon1//data//test.sh");
                        process.init(file);
                        //var args = ["/root/Downloads/addon-sdk-1.17/test-addon1/data/test.sh"];
                        var args = ["/Users/sravan2j/Downloads/addon-sdk-1.17/test-addon1/data/test.sh"];

                        // append the tmp file to the parameters
                        args.push(tmpFile.path);
                        //console.log("tmpFile.path:" + tmpFile.path);
                        //console.log("tmpFile args:" + args);
                        process.run(true, args, args.length);
                        //console.log('ran' + process.exitValue);
                        var outStr = "";
                        if (temp_file.exists(tmpFile.path)) {
                            var TextReader = temp_file.open(tmpFile.path, "r");
                            if (!TextReader.closed) {
                                outStr = TextReader.read();
                                TextReader.close();
                            }
                            tmpFile.remove(false);
                            //console.log("output" + outStr);
                        }
                        var value = parseFloat(outStr, 10);
                        console.log("value" + value);
                        
                        if (value < 0.01) {
                            console.log("malicious page");
                            gBrowser.contentDocument.body.innerHTML = "<div>Malicious Page</div>";
                        } else {
                            console.log("not a malicious page");
                            var prefSrv = this.prefService = Cc["@mozilla.org/preferences-service;1"]
                                .getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch);
                            var PBI = Ci.nsIPrefBranch2;
                            this.mozJSPref = prefSrv.getBranch("javascript.").QueryInterface(PBI);
                            this.mozJSPref.setBoolPref("enabled", true);
                            addonReloadRequest = true;
                            tabs.activeTab.reload(1);
                            //console.log("addonReloadRequest"+tabs.activeTab.url);
                            //windowUtils.location.reload(1);
                        }
                        end = new Date();
                        console.log("Elapsed time: "+(end.getTime() - start.getTime()));

                        /*--- for unit testing ---*/
                        //window.close()

                    }
                }

            );



        }

        addonReloadRequest = false;
    },
    onPageUnload: function(aEvent) {
        var prefSrv = this.prefService = Cc["@mozilla.org/preferences-service;1"]
            .getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch);
        var PBI = Ci.nsIPrefBranch2;
        this.mozJSPref = prefSrv.getBranch("javascript.").QueryInterface(PBI);
        //console.log("unloaded successfully");
        this.mozJSPref.setBoolPref("enabled", true);
    }
}


var gBrowser = windowUtils.getMostRecentBrowserWindow().getBrowser();

myExtension.init();