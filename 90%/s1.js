var http = require('http');
var express = require('express');
var path  = require('path');



var app = express();
app.set('port',process.env.PORT || 3030);

app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'src'), {
maxAge: 31557600000
}));

app.engine('html', require('ejs').renderFile);
// app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);
app.set('view engine', 'html');

function parseCookies(request){
	var list = {},
	           rc = request.headers.cookie;
	   /* rc && rc.split(';').forEach(function( cookie ){
			    var parts = cookie.split('=');
			           list[parts.shift().trim()] = decodeURI(parts.join('='));
				   });*/
	    return rc;
}





app.get('/', function(req, res){
  // The form's action is '/' and its method is 'POST',
  // so the `app.post('/', ...` route will receive the
  // result of our form
  var html = '<form action="/" method="post">' +
               'Email:' +
               '<input type="text" name="userName" placeholder="..." />' +
               '<br>' +
                '<button type="submit">Submit</button>' +
            '</form>';
               
  res.send(html);
 // res.sendfile("index.html");
});


app.post('/', function(req, res){
  var userName = req.body.userName;
  //var html = 'Hello: ' + userName + '.<br>' +
            // '<a href="/">Try again.</a>';
var cookies = parseCookies(req);
	console.log(cookies);


var options = {
		hostname : "localhost",
	      //port: "8080",
	        //path : '/userservice/data/v1/entity/user/who-am-i',
	       // path : '/app/v1/user/journey?email=siddharthgupta25@gmail.com',
	        path : '/app/v1/user/journey?email='+ userName,
     	    mathod :'Get',
     	    


	headers : {
 		'Cookie' : cookies
 		}
 	};
   

http.get(options,function(resp){
	console.log("statusCode: ",resp.statusCode);
	console.log("headers :" , resp.headers);
	var s = '';
	resp.on('data',function(d){
		// res.write(d);
		console.log("orginal string"+ "  " + d);
		s += d;

	});

    resp.on('end',function(){
    	s = JSON.parse(s);
    	console.log("d--->1" + "  " +  s.statusCode );
    	console.log("d--->2" + "  " +  s.version );
    	console.log("d--->3" + "  " +  s.data );
    	console.log("d--->4" + "  " +  s.data[0].id );
    	console.log("d--->5" + "  " +  s.data[0].userId );
    	console.log("d--->6" + "  " +  s.data[0].eventTypeId );
    	console.log("d--->7" + "  " +  s.data[0].eventType.id);
    	console.log("d--->8" + "  " +  s.data[0].eventType.event);
    	console.log("d--->9" + "  " +  s.data[0].eventType.displayName);
    	console.log("d--->10" + "  " +  s.data[0].occurrenceDate);
    	console.log("d--->11" + "  " +  s.data[0].attributeDetail);
    	console.log("d--->12" + "  " +  s.data[0].attributeSecondaryDetail);
    	console.log("d--->13" + "  " +  s.data[0].eventAttributes);
    	res.render('e1', {
			//displayName: s.data[0].eventType.displayName

			 journeyData  : [{"displayName": s.data[0].eventType.displayName, "journeyDate": s.data[0].occurrenceDate }, {"displayName": s.data[0].eventType.displayName, "journeyDate": s.data[0].occurrenceDate }]
         
		})
	});
});



 // res.send(html);
});


/*app.get('/e1',function(req,res){
  res.sendfile("index.html");
});*/


http.createServer(app).listen(app.get('port'),function(){
		console.log('Express server listening on port' + app.get('port'))
		});

