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

var images = [
'marker-brown.png',
'marker-dark-blue.png',
'marker-dark-green.png',
'marker-dark-orange.png',
'marker-dark-pink.png',
'marker-dark-purple.png',
'marker-dark-red.png',
'marker-gray.png',
'marker-green.png',
'marker-light-blue.png',
'marker-light-green.png',
'marker-light-orange.png',
'marker-light-purple.png',
'marker-light-red.png',
'marker-light-yellow.png',
'marker-red.png',
'marker-white.png',
'marker-yellow.png'
];

[
'Sewer',
'Water',
'Storm Drains',
'Pressurized Irrigation',
'Streets',
'Sidewalks',
'Parks & Trails',
'Streetlights',
'Signs',
'Facilities',
'Cedar Hills Property',
'Residential Property'
].forEach(function (type, index){
    new Service({
        marker_image: '/images/' + images[index],
        service_name: type,
        service_code: index
    }).save(log.bind(null, type))
});



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
    }).save(log.bind(i));
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
    var code = Math.floor(randomInRange(1,13))
    var name;
    switch (code) {
        case 1: name  = 'Water'                   ; break;
        case 2: name  = 'Pressurized Irrigation'                   ; break;
        case 3: name  = 'Sewer'                   ; break;
        case 4: name  = 'Storm Drains'                   ; break;
        case 5: name  = 'Streets'                   ; break;
        case 6: name  = 'Sidewalks'                   ; break;
        case 7: name  = 'Parks & Trails'                   ; break;
        case 8: name  = 'Streetlights'                   ; break;
        case 9: name  = 'Signs'                   ; break;
        case 10: name = 'Facilities'                   ; break;
        case 11: name = 'Cedar Hills Property'                   ; break;
        case 12: name = 'Residential Property'                   ; break;
    }

    return {
        code: code,
        name: name
    }

}

function getDictionary() {
    return ['everything', 'is', 'fixed', 'now', 'we', 'came', 'by', 'the', 'resident', 'said', 'we', 'forgot', 'to', 'backfill', 'the', 'hole', 'duct', 'tape', 'did', 'the', 'trick', 'streetlight', 'out', 'truck', 'backhoe', 'repaint', 'vandalism', 'third', 'time', 'this', 'month', 'crack', 'in', 'the', 'sidewalk', 'irrigation', 'flooding', 'problems', 'replaced', 'a', 'bulb', 'filled', 'the', 'pothole', 'reported', 'that', 'jackhammer', 'street', 'corner'];
}