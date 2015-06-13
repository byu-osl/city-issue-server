'use strict';

var mongoose   = require('mongoose');
var Request = require('../models/request');
var Service = require('../models/service');
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

var services = [
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
];

services.forEach(function (type, index){
    new Service({
        marker_image: '/images/' + images[index],
        service_name: type,
        service_code: index+1
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
        priority: getPriority(),
        media_url: 'http://lorempixel.com/300/300/city',
        status: getStatus(),
        requested_datetime: getRandomDate(new Date('2015/02/08'), new Date())
    }).save(log.bind(null, i));
}

setTimeout(function (){
    process.exit();
}, 500);

function log (i) {
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

function getPriority () {
    var randomNumber = randomInRange(0,1);
    if (randomNumber < .2) {
        return 'high'
    }
    if (randomNumber < .8) {
        return 'medium'
    }
    return 'low'
}

function randomInteger (min, max) {
    return Math.floor(randomInRange(min,max+1));
}

function randomInRange(min, max) {
    var range = max-min;
    return (Math.random() * (range)) + min;
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function getService() {
    var code = randomInteger(1,12)
    var name = services[code-1]


    return {
        code: code,
        name: name
    }

}

function getDictionary() {
    return ['everything', 'is', 'fixed', 'now', 'we', 'came', 'by', 'the', 'resident', 'said', 'we', 'forgot', 'to', 'backfill', 'the', 'hole', 'duct', 'tape', 'did', 'the', 'trick', 'streetlight', 'out', 'truck', 'backhoe', 'repaint', 'vandalism', 'third', 'time', 'this', 'month', 'crack', 'in', 'the', 'sidewalk', 'irrigation', 'flooding', 'problems', 'replaced', 'a', 'bulb', 'filled', 'the', 'pothole', 'reported', 'that', 'jackhammer', 'street', 'corner'];
}