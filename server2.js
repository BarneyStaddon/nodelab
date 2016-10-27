
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
		res.render('pages/index', { results : result.response.docs });

	});


});

// START THE SERVER
// ==============================================================
app.listen(8080);
console.log('App started on http://localhost:8080');

/*

example object

{"primaryMaterial":"paper",
"primaryMeasurement":"H 199 mm; W 245 mm",
"itemCount":"1",
"loanAllowed":"true",
"itemStatus":"permanent collection",
"recordType":"part",
"primaryTitle":"Dudley Street, Seven Dials",
"primaryMadeDate":"1872",
"primaryPeriod":"1872",
"section":"Library",
"primaryId":"NN23607(158)",
"type":"object",
"subType":"object",
"conformance":"extended 1",
"idIndex":"491136",
"language":"eng",
"currentLocation":"In Store",
"urn":"urn:mol:object-491136",
"identifier":"object-491136",
"modified":"2012-03-19T16:15:44Z",
"created":"2000-02-11T00:00:00Z",
"summaryTitle":"book illustration; wood engraving - Dudley Street, Seven Dials",
"previewMediaLocation":["/266/media-266883/preview.jpg"],
"dateMade":["1872"],
"makerRelation":["artist","engraver"],
"rightsHolder":["digital image copyright Museum of London"],
"mediaReference":["media-266883"],
"mediaType":["image"],
"imagePurchaseLink":["http://www.museumoflondonprints.com/image.php?imgref=002712"],
"nameType":["object name","SHIC","SHIC","full name","primary name"],
"originalMediaLocation":["/266/media-266883/original.jpg"],
"title":["Dudley Street, Seven Dials","Dudley Street, Seven Dials"],
"mediaQuality":["high"],
"description":["Illustration of a street market in Dudley Street, Seven Dials, from 'London: a Pilgrimage' by  Blanchard Jerrold and Gustave Doré, 1872.  Seven Dials was a slum area near Covent Garden.  Jerrold talks the squalor and hopelessness of the area and says that \"In the street market of Drury Lane the mark of misery seems to be upon every man, woman, and child.'"],
"titleType":["display title","primary title"],
"name":["book illustration","4.840","4.845","wood engraving","book illustration; wood engraving"],
"rightsGrantingStatus":["approved"],
"mediaRightsHolder":["Museum of London"],
"largeMediaLocation":["/266/media-266883/large.jpg"],
"placeString":["Camden"],
"makerString":["Doré, Gustave","Quesnel, Désiré-Mathieu"],
"idNumber":["NN23607(158)"],
"makerReference":["agent-116791","agent-134438"],
"placeRelation":["depicted"],
"dateMadeLatest":["1872"],
"placeReference":["place-88"],
"midMediaLocation":["/266/media-266883/mid.jpg"],
"descriptionType":["online caption"],
"borough":["Camden"],
"rightsCategory":["out of copyright (risk assessed)"],
"mediaRightsType":["digital image copyright"],
"dateMadeEarliest":["1872"],
"formattedModified":["2012-03-19"],
"idNumberType":["accession number"]}


*/



