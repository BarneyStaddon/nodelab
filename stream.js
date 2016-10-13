var http = require('http');
var fs = require('fs');
var data = '';
var chunkNum = 0;

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

	//create a readable stream
	var readerStream = fs.createReadStream('someText.txt');
	//create a writable stream
	var writerStream = fs.createWriteStream('output.txt');

	readerStream.setEncoding('UTF8');
	readerStream.on('data', function(chunk){
		
		if(url !== "/favicon.ico") {

			data += chunk; 
			console.log(chunk + ':' + chunkNum);
			chunkNum++;
		}

	});

	readerStream.on('end', function(){

		response.write('')
		response.write(data);
		response.end();
		writerStream.write(data, 'UTF8');

	});

	readerStream.on('error', function(err){
		console.log(err);
	});

});

server.listen(8080);