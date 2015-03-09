var http = require('http');
var express = require('express');
//var app = express.createServer();
var app = express();
app.set('port',process.env.PORT || 3031);
app.use(express.bodyParser());

app.get('/',function(req,res){
  res.sendfile("c1.html");
});

var s;
app.post('/endpoint', function(req, res){
	var obj = {};
	console.log('body-virendra: ' + JSON.stringify(req.body));
	res.send(req.body);


});
//console.log('hello-virendra' + s);
http.createServer(app).listen(app.get('port'),function(){
		console.log('Express server listening on port' + app.get('port'))
		});

