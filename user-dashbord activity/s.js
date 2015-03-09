var http = require('http');
var express = require('express');
var path  = require('path');
//var app = express.createServer();


var app = express();
app.set('port',process.env.PORT || 3035);

app.use(express.bodyParser());


function parseCookies(request){
	var list = {},
	           rc = request.headers.cookie;
	   /* rc && rc.split(';').forEach(function( cookie ){
			    var parts = cookie.split('=');
			           list[parts.shift().trim()] = decodeURI(parts.join('='));
				   });*/
	    return rc;
}


app.use(express.static(path.join(__dirname, 'src'), {
maxAge: 31557600000
}));




app.get('/',function(req,res){
  res.sendfile("e1.html");
});




app.post('/', function(req, res){
	var obj = {};
	s = JSON.stringify(req.body);
	console.log('body-virendra: ' + JSON.stringify(req.body));
	res.send(req.body);
       var postData = req.body;
       s = postData.email;
    console.log('email------> ' + s);    


    var cookies = parseCookies(req);
	console.log(cookies);




var options = {
		hostname : "localhost",
	      //port: "8080",
	        //path : '/userservice/data/v1/entity/user/who-am-i',
	  //      path : '/app/v1/user/journey?email=siddharthgupta25@gmail.com',
	        path : '/app/v1/user/journey?email='+ s,
     	    method :'Get',
     	    


	headers : {
 		'Cookie' : cookies
 		}
 	};
   
        //console.log('hello-virendra:' + JSON.stringify(req.body));


http.get(options,function(resp){
	console.log("statusCode: ",resp.statusCode);
	console.log("headers :" , resp.headers);
	resp.on('data',function(d){
		res.write(d);
		var s = JSON.parse(d);
		console.log("data"+ "  "+ s.data[0].eventType.displayName);
		});
	resp.on('end',function(){
		res.end();
		});
	});


});




http.createServer(app).listen(app.get('port'),function(){
		console.log('Express server listening on port' + app.get('port'))
		});

