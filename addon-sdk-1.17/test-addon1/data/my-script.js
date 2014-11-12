//var str=$( 'body' ).html().toString();
//alert($( 'p:first' ).text() +" = "+ eval($( 'p:first' ).text()));
//console.log($( 'p:first' ).text());
//console.log($( 'body' ).html().toString());
var code="";
$('script').each(function(){ 
    code=code+$(this).html();
});

//alert(code);
self.port.emit("myMessage", code);

