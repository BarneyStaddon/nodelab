//include the http core module and assign it to a var

/*
	Note, the string passsed to require doesn't include a relative hint about the location of the included file.
	In this case, node.js will look for a core module named 'http' and, if found, return it directly. If it can't 
	find it, it will walk the directory tree until it does, or if still not found, throw an exception.

	Lastly, node.js also lets you create an 'index.js' file, which indicates th emain include file for a directory.
	So, if you call 

	require('./foo')

	both 'foo.js' as well as an 'foo/index.js' file will be considered. This goes for non-relative URLs as well.     
*/

var http = require('http');

//create a server, passing in a closure that is called whenever an http request comes in 
var server = http.createServer(function(req, res){
	res.writeHead(200);
	res.end('Hello Http')
})

//call listen on our server object to tell it what port we want it to listen for requests on
server.listen(8080);