var http = require('http');
var https = require('https');
var path  = require('path');
var express = require('express');

var app = express();

app.set('port',process.env.PORT || 3030);


if('development'== app.get('env')){
	app.use(express.errorHandler());
}

function parseCookies(request){
	var list = {},
	           rc = request.headers.cookie;
	   /* rc && rc.split(';').forEach(function( cookie ){
			    var parts = cookie.split('=');
			           list[parts.shift().trim()] = decodeURI(parts.join('='));
				   });*/
	    return rc;
}

//var cookies = parseCookies(request);

app.get('/',function(req,res){
  res.sendfile("client.html");
});

app.post('/endpoint',function(req,res){
	var cookies = parseCookies(req);
	console.log(cookies);
      //  res.sendfile("client.html");
     //console.log(cookies);
     
        var obj = {};
	s = JSON.stringify(req.body);
	console.log('body-virendra: ' + JSON.stringify(req.body));
	res.send(req.body);

/*var options = {
hostname : "localhost",
 //    port: "8080",
     path : '/userservice/data/v1/entity/user/who-am-i',
     mathod :'Get',
headers : {
 'Cookie' : cookies
 }
 };

http.get(options,function(resp){
	console.log("statusCode: ",resp.statusCode);
	console.log("headers :" , resp.headers);
	resp.on('data',function(d){
		res.write(d);
		});
	resp.on('end',function(){
		res.end();
		});
	});*/

}).on('error',function(e){
	console.error(e);
	});


http.createServer(app).listen(app.get('port'),function(){
		console.log('Express server listening on port' + app.get('port'))
		});

/*http.createServer(app,function(request,response){
		var cookies = parseCookies(request);
		response.end('Hello World\n');
		}).listen(8124);
console.log('server running at port 8124');*/







