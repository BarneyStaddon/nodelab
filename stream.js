var http = require('http');
var fs = require('fs');
var data = '';

var server = http.createServer(function(request, response){

	request.on('error', function(err){

		console.log(err);

	});

	response.on('error', function(err){

		console.log(err);

	});

	var url = request.url;
	var headers = request.headers;
	var userAgent = headers['user-agent'];

	var readerStream = fs.createReadStream('someText.txt');

	readerStream.setEncoding('UTF8');

	readerStream.on('data', function(chunk){
		data += chunk; 
	});

	readerStream.on('end', function(){

		response.write(data);
		response.end();

	});

	readerStream.on('error', function(err){
		console.log(err);
	});

});

server.listen(8080);