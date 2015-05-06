'use strict';
var express  = require('express');
var router   = express.Router();
var Service  = require('../models/service');
var isAdmin = require('../utility/isAdmin.js')

// services.json/...
router.get('/', listServices);
router.get(':serviceCode.json', getServiceDescription);
router.post('/add', addService);
router.post('/delete', isAdmin, deleteService);

// provide a list of acceptable 311 service request types and their associated service codes. 
function listServices(req, res) {
	// The route might end up here with /services, which is invalid.
	if (req.originalUrl === '/services') {
		res.send400('You must define a service code.');
		return;
	}

	Service.find(function (error, services){
		if (error){
			res.send('Error finding service request types.');
		} else if (services.length === 0) {
			res.send404('Could not find any services.');
		} else {
			res.send(services);
		}
	});
}

function getServiceDescription(req, res){
	var serviceCode = req.params.serviceCode;

	if (typeof serviceCode === 'undefined') {
		res.send400('You need to provide a service code to search for.');
	}

	Service.find({service_code: serviceCode}, function serviceFound(err, result){
		if (result.length === 0) {
			res.send404('Could not find a service with that code.');
		} else {
			res.send(result);
		}
	});
}

function addService(req, res) {
	var service = new Service(req.body);

	service.save(function serviceSaved (error, service) {
		if (error) {
			res.send500('Error while trying to save the service.');
		} else {
			res.send(service);
		}
	});
}

function deleteService (req, res, next) {
	Service.findByIdAndRemove(req.body.id, function(error) {
		if (error) {
			res.send500('Could not remove. Service may not exist, or some other error.');
		} else {
			res.send('Service deleted.');
		}
	});
}

module.exports = router;