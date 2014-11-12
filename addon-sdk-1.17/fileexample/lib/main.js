/*const fileIO = require("sdk/io/file");

let path = "/root/Downloads/addon-sdk-1.17/fileexample/data";
let list = fileIO.list(path);

for (i = 0; i < list.length; i++) {
  let item = fileIO.join(path, list[i]);
  if (fileIO.isFile(item)) {
    console.log(item + " is a file");
  }
  else {
    console.log(item + " is a directory");
  }
}

var TextWriter = fileIO.open(path+"/test.txt","w");
if (!TextWriter.closed) {
    TextWriter.write("HelloWorld");
    TextWriter.close();
  }

*/

// This function will be called to give the necessary privileges to your JAR files
// However, the policy never comes into play, because 
//    (1) adding permissions doesn't add to the policy itself, and 
//    (2) addURL alone does not set the grant codeBase
var { Cc, Ci } = require('chrome');
function policyAdd (loader, urls) {
    try {
        //If have trouble with the policy try changing it to 
        //edu.mit.simile.javaFirefoxExtensionUtils.URLSetPolicy        
        var str = 'edu.mit.simile.javaFirefoxExtensionUtils.URLSetPolicy';
        var policyClass = Packages.java.lang.Class.forName(
               str,
               true,
               loader
        );
        var policy = policyClass.newInstance();
        policy.setOuterPolicy(Packages.java.security.Policy.getPolicy());
        java.security.Policy.setPolicy(policy);
        policy.addPermission(new Packages.java.security.AllPermission());
        for (var j=0; j < urls.length; j++) {
            policy.addURL(urls[j]);
        }
    }catch(e) {
       alert(e+'::'+e.lineNumber);
    }
}
       
//Get extension folder installation path... (this works in firefox 3.x, for firefox 4.x use  AddonManager.getAddonByID)
//var extensionPath = Cc["@mozilla.org/extensions/manager;1"].
//            getService(Ci.nsIExtensionManager).
//            getInstallLocation("test@yoursite"). // guid of extension
//            getItemLocation("test@yoursite");


//The path logic would work if we include em:unpack for ff 4.x, for ff 3.x since things are unpacked by default things work

// Get path to the JAR files (the following assumes your JARs are within a
// directory called "java" at the root of your extension's folder hierarchy)
// You must add this utilities (classloader) JAR to give your extension full privileges

//var extensionUrl = "file:///" + extensionPath.path.replace(/\\/g,"/");
//var classLoaderJarpath = extensionUrl + "/java/javaFirefoxExtensionUtils.jar";
var classLoaderJarpath = "/media/root/SOFTWARES/javaFirefoxExtensionUtils.jar";
// Add the paths for all the other JAR files that you will be using
//var myJarpath = extensionUrl + "/java/TestJava.jar"; 

var myJarpath = "/root/Downloads/rhino1_7R4/js.jar"; 
// seems you don't actually have to replace the backslashes as they work as well

var urlArray = []; // Build a regular JavaScript array (LiveConnect will auto-convert to a Java array)
urlArray[0] = new Packages.java.net.URL(myJarpath);
urlArray[1] = new Packages.java.net.URL(classLoaderJarpath);
var cl = Packages.java.net.URLClassLoader.newInstance(urlArray);
     
//Set security policies using the above policyAdd() function
policyAdd(cl, urlArray);

var aClass = Packages.java.lang.Class.forName("org.mozilla.javascript.tools.shell.Main", true, cl);
var aStaticMethod = aClass.getMethod("getGreeting", []);
var greeting = aStaticMethod.invoke(null, []);
alert(greeting);
