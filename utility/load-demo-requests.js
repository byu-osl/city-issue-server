'use strict';

var mongoose   = require('mongoose');
var Request = require('./models/request');
var Service = require('./models/service');
var randgen = require('randgen')

mongoose.connect('mongodb://localhost/city-issues');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function dbConnected() {
    console.log('DB connected.');
});

var latMin = 40.392299;
var latMax = 40.423453;
var longMin = -111.780481;
var longMax = -111.746149;

for (var i = 0; i < 100; i++) {
    var service = getService();
    new Request({
        lat: getLat(),
        long: getLong(),
        service_code: service.code,
        service_name: service.name,
        media_url: 'http://lorempixel.com/300/300/city',
        requested_datetime: getRandomDate(new Date('03/08/2015'), new Date())
    }).save(log);
}

function log () {
    console.log(i, 'done')
}

function getLat() {
    return randgen.rnorm(40.415436, 0.000001);
}

function getLong() {
    return randgen.rnorm(-111.756283, 0.000001);
}

function randomInRange(min, max) {
    var range = max-min;
    return (Math.random() * range) + min;
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