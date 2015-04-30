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
var path2 = "/Users/sravan2j/Downloads/addon-sdk-1.17/AddonDemo/data";
const fileIO = require("sdk/io/file");
const windowUtils = require("sdk/window/utils");
addonReloadRequest = false;
start = 0;
end = 0;
const {
    Cc, Ci, Cu, Cm, Cr, components
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
            var tabs = require("sdk/tabs");
            var TextReader1 = fileIO.open(path2 + "/whitelistURLs.txt", "r");
            var whitelistURLs = "";
            if (!TextReader1.closed) {
                whitelistURLs = TextReader1.read();
                TextReader1.close();
            }
            if (whitelistURLs.indexOf(tabs.activeTab.url + '\n') == -1) {
                //console.log(addonReloadRequest+"onload entered");
                var system = require("sdk/system");

                var platform_str = system.platform;
                var str = platform_str.toLowerCase();

                // create an nsIFile for the executable
                var file2 = Cc["@mozilla.org/file/local;1"]
                    .createInstance(Ci.nsIFile);
                //file.initWithPath("C:\\Users\\Sravan\\Downloads\\addon-sdk-1.17\\addon-sdk-1.17\\test-addon\\data\\test.bat");

                file2.initWithPath("/bin/sh");

                // create an nsIProcess
                var process = Cc["@mozilla.org/process/util;1"]
                    .createInstance(Ci.nsIProcess);

                var tabs = require('sdk/tabs');
                var self = require("sdk/self");
                //var panel = require("sdk/panel");

                const temp_file = require("sdk/io/file");

                var path1 = "/Users/sravan2j/Downloads/addon-sdk-1.17/AddonDemo/data";

                panel = require("sdk/tabs").activeTab.attach({
                    contentScriptFile: [self.data.url("jquery-1.10.0.min.js"), self.data.url("my-script.js")]
                });

                panel.port.on("myMessage", function handleMyMessage(code) {

                        //calculating hashcode for only the JavaScript content in the web page. This involves risk if the external JS file was infeted with malware.
                        var string = code.toString(),
                            hash = 0,
                            i;
                        for (i = 0; i < string.length; i++) {
                            hash = (((hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
                        }
                        console.log("hash: " + hash);

                        var TextReader2 = fileIO.open(path2 + "/hashcodes.txt", "r");
                        var hashcodes = "";
                        if (!TextReader2.closed) {
                            hashcodes = TextReader2.read();
                            TextReader2.close();
                        }
                        if (whitelistURLs.indexOf(hash + '\n') == -1) {

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
                                process.init(file2);
                                //var args = ["/root/Downloads/addon-sdk-1.17/test-addon1/data/test.sh"];
                                var args = ["/Users/sravan2j/Downloads/addon-sdk-1.17/AddonDemo/data/test.sh"];

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
                                console.log("value: " + value);

                                if (value < 0.00145) {
                                    console.log("[INFO] Malicious page");
                                    gBrowser.contentDocument.body.innerHTML = "<div>Malicious Page</div>";
                                } else {
                                    console.log("[INFO] Not a malicious page");
                                    var prefSrv = this.prefService = Cc["@mozilla.org/preferences-service;1"]
                                        .getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch);
                                    var PBI = Ci.nsIPrefBranch2;
                                    this.mozJSPref = prefSrv.getBranch("javascript.").QueryInterface(PBI);
                                    this.mozJSPref.setBoolPref("enabled", true);
                                    addonReloadRequest = true;
                                    tabs.activeTab.reload(1);
                                    Cu.import("resource://gre/modules/NetUtil.jsm");
                                    Cu.import("resource://gre/modules/FileUtils.jsm");
                                    var file3 = new FileUtils.File(path2 + "/hashcodes.txt");

                                    var outputStream = Cc["@mozilla.org/network/file-output-stream;1"].
                                    createInstance(Ci.nsIFileOutputStream);
                                    outputStream.init(file3, 0x02 | 0x08 | 0x10, 0644, 1);
                                    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
                                    createInstance(Ci.nsIScriptableUnicodeConverter);
                                    converter.charset = "UTF-8";

                                    var inputStream = converter.convertToInputStream(hash + '\n');
                                    NetUtil.asyncCopy(inputStream, outputStream, function(status) {
                                        console.log("status: " + status);
                                    });

                                    //console.log("addonReloadRequest"+tabs.activeTab.url);
                                    //windowUtils.location.reload(1);
                                }
                                end = new Date();
                                console.log("Elapsed time: " + (end.getTime() - start.getTime()));

                                /*--- for unit testing ---*/
                                //window.close()

                            }

                        }
                    }

                );

            }

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

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
    id: "malware-detector",
    label: "MalwareDetector",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});


function handleClick(state) {
    //console.log("current page url: "+tabs.activeTab.url);
    var path1 = "/Users/sravan2j/Downloads/addon-sdk-1.17/AddonDemo/data";

    var content = "";
    /*var TextReader = fileIO.open(path1 + "/whitelistURLs.txt", "r");
    if (!TextReader.closed) {
      content = TextReader.read();
      TextReader.close();
    }
    var TextWriter = fileIO.open(path1 + "/whitelistURLs.txt", "w");
    if (!TextWriter.closed) {
        TextWriter.write(content+tabs.activeTab.url+'\n');
        TextWriter.close();
    }*/

    Cu.import("resource://gre/modules/NetUtil.jsm");
    Cu.import("resource://gre/modules/FileUtils.jsm");
    var file = new FileUtils.File(path1 + "/whitelistURLs.txt");

    var outputStream = Cc["@mozilla.org/network/file-output-stream;1"].
    createInstance(Ci.nsIFileOutputStream);
    outputStream.init(file, 0x02 | 0x08 | 0x10, 0644, 1);
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
    createInstance(Ci.nsIScriptableUnicodeConverter);
    converter.charset = "UTF-8";

    var inputStream = converter.convertToInputStream(tabs.activeTab.url + '\n');
    NetUtil.asyncCopy(inputStream, outputStream, function(status) {
        console.log("status: " + status);
    });

    /*

            var ostream = FileUtils.openFileOutputStream(file,FileUtils.MODE_APPEND);

        var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
                    createInstance(Ci.nsIScriptableUnicodeConverter);
        converter.charset = "UTF-8";
        var istream = converter.convertToInputStream(tabs.activeTab.url+'\n');

                // The last argument (the callback) is optional.
                NetUtil.asyncCopy(istream, ostream, function(status) {

                    console.log("status: "+status); */
    /*if (!Components.isSuccessCode(status)) {
        // Handle error!
        return;
    }*/

    // Data has been written to the file.
    //  });


    // file is nsIFile, data is a string

    // You can also optionally pass a flags parameter here. It defaults to
    // FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE;


}

var gBrowser = windowUtils.getMostRecentBrowserWindow().getBrowser();

myExtension.init();