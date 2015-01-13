var express    = require('express');
var path       = require('path');
var favicon    = require('serve-favicon');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport   = require('passport');

// DB
mongoose.connect('mongodb://localhost/city-issues');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("DB connected.")
});

var app = express();

app.set('view engine', 'jade');

var indexRouter = require('./routes/index');
var requestsRouter = require('./routes/requests');
var servicesRouter = require('./routes/services');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({type: 'application/x-www-form-urlencoded'}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(passport.authenticate());

app.use('/', indexRouter);
app.use('/requests.json', requestsRouter);
app.use('/services', servicesRouter);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
