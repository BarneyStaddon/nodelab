//test.js

var http = require('http');
var url = require('url'); 

var server = http.createServer(function(req, res){

	req.on('error', function(err){

		console.error(err);

	});

	res.on('error', function(err){
		console.error(err);
	});

	var method = req.method;
	//var url = req.url;
	var headers = req.headers;
	var userAgent = headers['user-agent'];
	var pathname = url.parse(req.url).pathname;

	var payload = {
		'method' : method,
		'userAgent' : userAgent,
		'pathname' : pathname
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.write(JSON.stringify(payload));
	res.end();

});

server.listen(8080);