var mongoose   = require('mongoose');
var Request = require('./models/request');
var Service = require('./models/service');

mongoose.connect('mongodb://localhost/city-issues');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function dbConnected() {
    console.log('DB connected.');
});

// graffiti service
var service = new Service({description:  'Requests to remove graffiti.', metadata:     false, keywords:     'crime, graffiti, tagging',  // CSV of tags about the request type group:        'crime',  // "sanitation"service_code: 'GRAF',  // unique ID for this type service_name: 'graffiti',  // human readable name // type: //   realtime: The service request ID will be returned immediately after the service request is submitted. //   batch: A token will be returned immediately after the service request is submitted. This token can then be later used to return the service request ID. //	 blackbox: No service request ID will be returned after the service request is submitted type:  'realtime'});
service.save();
// potholes service
var service = new Service({
	description:  'Requests to fix potholes',
    metadata:     false,
    keywords:     'roads',  // CSV of tags about the request type
    group:        'infrastructure',  // "sanitation"
    service_code: 'POTH',  // unique ID for this type
    service_name: 'potholes',  // human readable name
    // type: 
    //   realtime: The service request ID will be returned immediately after the service request is submitted. 
	//   batch: A token will be returned immediately after the service request is submitted. This token can then be later used to return the service request ID. 
	//	 blackbox: No service request ID will be returned after the service request is submitted
    type:  'realtime'
});

service.save(function(){
	console.log('Saved.')
});