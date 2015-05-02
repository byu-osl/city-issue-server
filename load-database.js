'use strict';

var mongoose   = require('mongoose');
var Request = require('./models/request');
var Service = require('./models/service');

mongoose.connect('mongodb://localhost/city-issues');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function dbConnected() {
    console.log('DB connected.');
});

new Service({
    description:  'streetlight problems',
    metadata:     false,
    keywords:     'roads',
    group:        'infrastructure',
    service_code: 2,
    service_name: 'streetlights',
    type:  'realtime'
}).save(function (){
        console.log('service saved.');
    });

new Service({
    description:  'pothole problems',
    metadata:     false,
    keywords:     'roads',
    group:        'infrastructure',
    service_code: 2,
    service_name: 'potholes',
    type:  'realtime'
}).save(function (){
        console.log('service saved.');
    });

new Request({account_id: 123, address_string: 'address', address_id: 4, device_id: 5, description: 'desc', email: 'email', name: 'Anderson', lat: '2432', long: '2342342', media_url: undefined, phone: '24232234', service_code: 1, requested_datetime: new Date().toISOString(), status: 'open'})
    .save(function (err, request){
        console.log('request saved');
        new Request({account_id: 123, address_string: 'address', address_id: 4, device_id: 5, description: 'desc', email: 'email', name: 'Anderson', lat: '2432', long: '2342342', media_url: undefined, phone: '24232234', service_code: 2, requested_datetime: new Date().toISOString(), status: 'open'})
        .save(function (err, request){
            console.log('request saved');
            console.log('All done!');
            process.exit(0);
        });
    });


//change in the file