'use strict';
var express        = require('express');
var path           = require('path');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var routes 		   = require('./routes');

var app = express();
app.use(require('./utility/customizeResponse'));

// mongoose.set('debug', true);
var dbPath = process.env.DB || 'mongodb://localhost/city-issues';
console.log("dbPath: " + dbPath);

mongoose.connect('mongodb://localhost/city-issues');
app.connection = mongoose.connection;
app.connection.on('error', handleDBError);

app.use(express.static(path.join(__dirname, 'client-side')));
app.use(bodyParser.urlencoded({type: 'application/x-www-form-urlencoded', extended: true}));

app.use('/', 				  routes.indexHandler);
app.use(/\/requests(.json)?/, routes.requestsHandler);
app.use(/\/services(.json)?/, routes.servicesHandler);
app.use('/register', 		  routes.registrationHandler);
app.use('/login', 			  routes.loginHandler);
app.use('/authenticate', 	  routes.authenticationHandler);

app.use(function return404(req, res) {
    res.status(404).send({
    	code: 404,
    	description: 'Page not found.'
    });
});

module.exports = app;

function handleDBError(error) {
	console.log(error);
    console.log('Error connecting to DB. Is MongoDB running? (sudo service mongod start)');
    console.log('Try "sudo service mongod start". If mongod is an unrecognized service, you will need to install MongoDB.');
}
