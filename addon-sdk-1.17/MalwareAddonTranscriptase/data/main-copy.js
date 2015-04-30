/*var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

var menuitem = require("menuitems").Menuitem({
  id: "clickme",
  menuid: "menu_ToolsPopup",
  label: "Click Me!",
  onCommand: function() {
    console.log("Clicked Popup Menu Item");
  },
  insertbefore: "menu_pageInfo"
});

function handleClick(state) {
  tabs.open("http://www.mozilla.org/");
}

*/

var system = require("sdk/system");
const window = require("sdk/windows");
const { Cc, Ci, Cu } = require('chrome');


shellpath = "";
var platform_str = system.platform;
var str = platform_str.toLowerCase();



if (str.startsWith("winnt"))
{
  shellpath="C:\\Users\\Sravan\\Downloads\\addon-sdk-1.17\\addon-sdk-1.17\\test-addon\\data\\test.bat";

}
else if (str.startsWith("linux"))
{
  shellpath="//root//Downloads//addon-sdk-1.17//test-addon1//data//test.sh";

}
else if (str.startsWith("darwin"))
{
  shellpath="//root//Downloads//addon-sdk-1.17//test-addon1//data//test.sh";

}




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

let path = "/root/Downloads/addon-sdk-1.17/test-addon1/data";
let list = fileIO.list(path);

tabs.on('activate', function () {
  console.log('active: ' + tabs.activeTab.url);
//console.log(document.documentElement.outerHTML);
});

var button = require("sdk/ui/button/action").ActionButton({
  id: "style-tab",
  label: "Style Tab",
  icon: "./icon-16.png",
  onClick: function() {
    panel=require("sdk/tabs").activeTab.attach({
      //contentScriptFile: self.data.url("myscript.js")
	contentScriptFile: [self.data.url("jquery-1.10.0.min.js"), self.data.url("my-script.js")]
    });

    panel.port.on("myMessage", function handleMyMessage(code) {
        // Handle the message	
	//console.log(code);
	var TextWriter = fileIO.open(path+"/test.js","w");
	if (!TextWriter.closed) {
	    TextWriter.write(code);
	    TextWriter.close();
                 
            //file.initWithPath("//root//Downloads//addon-sdk-1.17//test-addon1//data//test.sh");
            process.init(file);
            var args = ["/root/Downloads/addon-sdk-1.17/test-addon1/data/test.sh"];
            process.run(true, args, args.length);
            console.log('ran')
	}
    });
  }
});



/*
var exec = require('child_process').exec, child;

child = exec('cat *.js bad_file | wc -l',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
 child();
*/
