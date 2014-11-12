/*
var {
    viewFor
} = require("sdk/view/core");
var window = viewFor(require("sdk/windows").browserWindows[0]);
*/
const windowUtils = require("sdk/window/utils");


const {Cc, Ci, Cu} = require("chrome");
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);

var myExtension = {
    init: function() {

        /*Zaphod.mozJSPref.setBoolPref("enabled", false);
        if (verbose) {
          alert("Narcissus has been set as your JavaScript engine.  "
          + "Reload to rerun the JavaScript on the current page.");
        */

        if(gBrowser) gBrowser.addEventListener("DOMContentLoaded", this.onPageLoad, false);
        if(gBrowser) gBrowser.addEventListener("unload", this.onPageUnload, true);
    },
    onPageLoad: function(aEvent) {
        console.log("onPageLoad entered");
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

                console.log("panel.port.on entered");
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
                    console.log("tmpFile.path:" + tmpFile.path);
                    console.log("tmpFile args:" + args);
                    process.run(true, args, args.length);
                    console.log('ran' + process.exitValue);
                    var outStr = "";
                    if (temp_file.exists(tmpFile.path)) {
                        var TextReader = temp_file.open(tmpFile.path, "r");
                        if (!TextReader.closed) {
                            outStr = TextReader.read();
                            TextReader.close();
                        }
                        //var outStr = fs.readFile(tmpFile);
                        tmpFile.remove(false);
                        console.log("output" + outStr);
                    }
                }
            }

        );

        //var doc = aEvent.originalTarget; // doc is document that triggered the event
        //var win = doc.defaultView; // win is the window for the doc
        // test desired conditions and do something
        // if (doc.nodeName != "#document") return; // only documents
        // if (win != win.top) return; //only top window.
        // if (win.frameElement) return; // skip iframes/frames
        //alert("page is loaded \n" + doc.location.href);
    },
    onPageUnload: function(aEvent) {
        console.log("Unloaded Successfully");
  }
}

/*for each (let window in windowUtils.windows()) {
    console.log("hi");

    window.addEventListener("load", function (){
        gBrowser.addEventListener("load", function(event) {

          console.log("entered gbrowser");
     if (event.originalTarget != content.document) {
       return;
     }
  }, true);
    //window.removeEventListener("load", load, false); //remove listener, no longer needed
      
},false);
}
*/

var gBrowser = windowUtils.getMostRecentBrowserWindow().getBrowser();

myExtension.init();
/*var newTabBrowser = gBrowser.getBrowserForTab(gBrowser.addTab("http://www.google.com/"));
newTabBrowser.addEventListener("load", function () {
  newTabBrowser.contentDocument.body.innerHTML = "<div>hello world</div>";
}, true);
*/

