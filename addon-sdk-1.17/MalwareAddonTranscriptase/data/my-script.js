//var str=$( 'body' ).html().toString();
//alert($( 'p:first' ).text() +" = "+ eval($( 'p:first' ).text()));
//console.log($( 'p:first' ).text());
//console.log($( 'body' ).html().toString());
/*
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        anHttpRequest = new XMLHttpRequest();
        alert(aUrl);
        //anHttpRequest.open("GET", "this_page.php?NOW", true);
        anHttpRequest.onreadystatechange = function() {
         alert(anHttpRequest.readyState+":"+anHttpRequest.status);
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
*/
var baseUrl=window.location.protocol + "//" + window.location.host + "/";
var count=0;
//var url = window.location.href;
var code="";
var Urls="";
$('script[src]').each(function(){
	count=count+1;
	var srcurl = $( this ).attr( "src" );
	if(/^\/[\da-z]+/i.test(srcurl))
	{
		Urls=Urls+baseUrl;
	} 
	Urls=Urls+(srcurl.replace(/^\/+/, ''))+'\n'
    //alert($( this ).attr( "src" ));

/*
aClient = new HttpClient();
aClient.get('http://a.tcimg.net/tcdc/release_147.1-69/gen/js/tc/TrueCar-2.0.js?NOW', function(answer) {
    // do something with answer
    alert(answer);
});
*/
/*
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://a.tcimg.net/tcdc/release_147.1-69/gen/js/tc/TrueCar-2.0.js", false );
    xmlHttp.send( null );
    alert(xmlHttp.responseText);*/
    //$.post("http://a.tcimg.net/tcdc/release_147.1-69/gen/js/tc/TrueCar-2.0.js", function(data){
  	//	alert("Data: " + data);
	//});
});
$('script').each(function(){ 
    code=code+$(this).html();
});

//alert(code);
self.port.emit("myMessage", count+'\n'+Urls+code);

