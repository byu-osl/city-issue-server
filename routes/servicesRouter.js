/*
	route: services.json

*/
var express  = require('express');
var router   = express.Router();
var Service  = require('../models/service');

// provide a list of acceptable 311 service request types and their associated service codes. 
router.get('/', function listServices(req, res) {

	// The route might end up here with /services, which is invalid.
	if (req.originalUrl === '/services') {
		res.send400('You must define a service code.');
		return;
	}

	Service.find().exec(function (error, services){
		if (error){
			res.send('Error finding service request types.');
		} else if (services.length === 0) {
			res.send404('Could not find any services.');
		} else {
			res.send(services);
		}
	});
});

router.get(':serviceCode.json', function getServiceDescription(req, res){
	var serviceCode = req.params.serviceCode;

	if (typeof serviceCode === 'undefined') res.send400('You need to provide a service code to search for.');

	Service.find({service_code: serviceCode}, function (err, result){
		if (result.length === 0) {
			res.send404('Could not find a service with that code.');
		} else {
			res.send(result);
		}
	});
});

module.exports = router;