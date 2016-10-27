
// GRAB PACKAGES
// ============================================================
var express = require('express');
var utils = require('./utils'); 
var app = express();

// CONFIGURE THE APP
// ============================================================
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs - http://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'ejs');


// SET THE ROUTES
// =============================================================
// home page route 
app.get('/', function(req,res){


	// call http://fe01.museumoflondon.org.uk/solr/mol/select?q=borough:Camden&wt=json


	// options for GET
	var options = {
    	host : 'fe01.museumoflondon.org.uk', // here only the domain name
    	// (no http/https !)
    	port : 80,
    	path : '/solr/mol/select?q=borough:Camden&wt=json', // the rest of the url with parameters if needed
    	method : 'GET', // do GET
    	headers: {
        	'Content-Type': 'application/json'
    	}
	};


	// pass options and a callback to handle the result
	utils.getJSON(options, (statusCode, result) => {

		console.log("statusCode:" + statusCode);
		//return { result : result };
		res.render('pages/index', { result : result.response.docs });

	});


});

// START THE SERVER
// ==============================================================
app.listen(8080);
console.log('App started on http://localhost:8080');



