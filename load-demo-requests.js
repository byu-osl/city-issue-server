'use strict';

var mongoose   = require('mongoose');
var Request = require('./models/request');
var Service = require('./models/service');
var randgen = require('randgen');
var loremIpsum = require('lorem-ipsum');

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
        history: getHistory(),
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

function getHistory () {
    var history = [];
    var lorem;
    for (var i = 0; i < 10; i++) {
        lorem = loremIpsum({
            count: 1,                     
            units: 'sentences',        
            sentenceLowerBound: 5,        
            sentenceUpperBound: 15,       
            format: 'plain',              
            words: getDictionary(),  
            random: Math.random          
        });
        var date = getRandomDate(new Date('2015/02/08'), new Date());
        history.push({date: date, description: lorem})
    }

    return history;
}

function getStatus() {
    return randomInRange(0,1) < 0.33 ? 'open' : 'closed'
}

function getLat() {
    return randgen.rnorm(40.413436, stdDeviation);
}

function getLong() {
    return randgen.rnorm(-111.755283,stdDeviation);
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
        case 1: name = 'streetlight'; break;
        case 2: name = 'pothole'; break;
        case 3: name = 'vandalism'; break;
        case 4: name = 'sidewalk'; break;
        case 5: name = 'irrigation'; break;
    }

    return {
        code: code,
        name: name
    }

}

function getDictionary() {
return ['tech', 'crew', 'came', 'to', 'the', 'site', 'dug', 'up', 'some', 'wires', 'that', 'were', 'obstructing', 'the', 'road', 'to', 'fix', 'the', 'pothole', 'streetlight', 'had', 'been', 'out', 'fot', 'several', 'weeks', 'vandalism', 'on', 'the', 'wall', 'street']
}