var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var indexRouter    = require('./routes/indexRouter');
var requestsRouter = require('./routes/requestsRouter');
var servicesRouter = require('./routes/servicesRouter');

var app = express();

// Database
// mongoose.set('debug', true);
var dbPath = process.env.DB || 'mongodb://localhost/city-issues';
console.log("dbPath: "+dbPath);
mongoose.connect('mongodb://localhost/city-issues');

app.connection = mongoose.connection;
app.connection.on('error', console.error.bind(console, 'connection error:'));
//app.connection.once('open', function dbConnected() {});

// Configuration
app.set('view engine', 'jade');
app.use(require('./lib/customizeResponse'));
app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev')); // Logs which requests come in, ms response time
app.use(bodyParser.urlencoded({type: 'application/x-www-form-urlencoded'}));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', indexRouter);
app.use(/\/requests(.json)?/, requestsRouter);
app.use(/\/services(.json)?/, servicesRouter);

app.use(function return404(req, res, next) {
    res.status(404).send({
    	code: 404,
    	description: 'Page not found.'
    });
});

// if (app.get('env') === 'development') {
// 	console.log('Dev block');
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.send(err.message);
// });

module.exports = app;
