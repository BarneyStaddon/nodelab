
// GRAB PACKAGES
// ============================================================
var express = require('express');
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

	// pass our messages object into our template
	res.render('pages/index', { messages: ['test1', 'test2', 'test3']  });

});

// START THE SERVER
// ==============================================================
app.listen(8080);
console.log('App started on http://localhost:8080');



