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
var baseURL = 'http://fe01.museumoflondon.org.uk/solr/mol';

// options for GET
var options = {
    host : 'fe01.museumoflondon.org.uk', // here only the domain name
    // (no http/https !)
    port : 80,
    path : '/solr/mol/select?q=borough:Camden&wt=json', // the rest of the url with parameters if needed
    method : 'GET' // do GET
};


var server = http.createServer();


function getJSON(nodeRes){


	// do the GET request
	var reqGet = http.request(options, function(res) {
    	console.log("statusCode: ", res.statusCode);
    	// uncomment it for header details
		//  console.log("headers: ", res.headers);


		var ourData = '';

    	res.on('data', (d) => {
        	
        	console.log('Got some data');
        	ourData += d;
    	});


    	res.on('end', () => {

    		console.log('Got all data again');
    		nodeRes.writeHead(200);
			nodeRes.end(ourData);
    	});

	});

	reqGet.end();
	reqGet.on('error', (e) => {
    	console.error(e);
	});

}


server.on('request', function(req,res){

	if (req.url != '/favicon.ico') {
		getJSON(res);
	}

});


//call listen on our server object to tell it what port we want it to listen for requests on
server.listen(8080);