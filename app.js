var express        = require('express');
var path           = require('path');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var indexRouter    = require('./routes/indexRouter');
var requestsRouter = require('./routes/requestsRouter');
var servicesRouter = require('./routes/servicesRouter');

var app = express();
app.use(require('./lib/customizeResponse'));

// mongoose.set('debug', true);
var dbPath = process.env.DB || 'mongodb://localhost/city-issues';
console.log("dbPath: "+dbPath);

mongoose.connect('mongodb://localhost/city-issues');
app.connection = mongoose.connection;
app.connection.on('error', function (error) {
    console.log(error);
    console.log('Error connecting to DB. Is MongoDB running? (sudo service mongod start)');
    console.log('Try "sudo service mongod start". If mongod is an unrecognized service, you will need to install MongoDB.');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({type: 'application/x-www-form-urlencoded', extended: true}));

app.use('/', indexRouter);
app.use(/\/requests(.json)?/, requestsRouter);
app.use(/\/services(.json)?/, servicesRouter);

app.use(function return404(req, res) {
    res.status(404).send({
    	code: 404,
    	description: 'Page not found.'
    });
});

module.exports = app;
