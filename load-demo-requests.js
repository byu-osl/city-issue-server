'use strict';

var mongoose   = require('mongoose');
var Request = require('./models/request');
var Service = require('./models/service');
var randgen = require('randgen');

mongoose.connect('mongodb://localhost/city-issues');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function dbConnected() {
    console.log('DB connected.');
});

var latMin = 40.392299;
var latMax = 40.431967;
var longMin = -111.773320;
var longMax = -111.738301;
var stdDeviation = 0.005;

for (var i = 0; i < 90; i++) {
    var service = getService();
    new Request({
        lat: getLat(),
        long: getLong(),
        service_code: service.code,
        service_name: service.name,
        media_url: 'http://lorempixel.com/300/300/city',
        status: getStatus(),
        requested_datetime: getRandomDate(new Date('2015/02/08'), new Date())
    }).save(log);
}

function log () {
    console.log(i, 'done')
}

function getStatus() {
    return randomInRange(0,1) < 0.33 ? 'open' : 'closed'
}

function getLat() {
    return randgen.rnorm(40.415436, stdDeviation);
}

function getLong() {
    return randgen.rnorm(-111.756283,stdDeviation);
}

function randomInRange(min, max) {
    var range = max-min;
    return (Math.random() * (range)) + min;
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function getService() {
    var code = Math.floor(randomInRange(1,6))
    var name;
    switch (code) {
        case 1: name = 'streetlights'; break;
        case 2: name = 'potholes'; break;
        case 3: name = 'vandalism'; break;
        case 4: name = 'sidewalks'; break;
        case 5: name = 'irrigation'; break;
    }

    return {
        code: code,
        name: name
    }

}