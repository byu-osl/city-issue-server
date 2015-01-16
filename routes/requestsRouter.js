/* 
	route: /requests.json
*/

var express = require('express');
var router = express.Router();
var Request = require('../models/request');
var Service = require('../models/service');

// TODO: this is supposed to require an API key
router.post('/', function(req, res) {
	console.log('POST: requests.json');
	// TODO: is this really how the start date should be done?
	var startDate = new Date().toISOString();
	var status    = 'open';
	var serviceCode = req.body.service_code;

	if (typeof serviceCode === 'undefined') {
		res
		  .status(400)
		  .send('No service code specified.');
		return;
	}

	Service.find({service_code:serviceCode}).exec(function(error, services){
		if (services.length === 0) {
			res.status(404).send('Incorrect service code.');
		}
	});




	// TODO: correct validation...
	if (!hasLocationInfo(req.body)) {
		console.log('Invalid request.');
		res.send('Your request must have one of the following: latitude and longitude, address_string, or address_id.');
		return;
	}

	var request = new Request({
		account_id:     req.body.account_id,
		address_string: req.body.address_string,
		address_id:     req.body.address_id,
		device_id:      req.body.device_id,
		description:    req.body.description,
		email:          req.body.email,
		first_name:     req.body.first_name,
		last_name:      req.body.last_name,
		lat: 		    req.body.lat,
		long: 		    req.body.long,
		media_url:      req.body.media_url,
		phone:          req.body.phone,
		service_code:   req.body.service_code,
		start_date:     startDate,
		status:         status
	});

	console.log('Saving...');
	request.save(function(error, request, numberAffected){
		console.log('Saved.');
		if (error) {
			res.send('There was an error in saving your request.');
		} else if (numberAffected > 0) {
			// TODO: spec says service_request_id shouldn't be returned if a token is returned
			res.send({
				service_request_id: request._id,
			});
		} else {
			res.send('Request not saved.');
		}
	});
});

router.get('/', function(req, res) {
	console.log('Fetching requests');
	var requestsQuery = Request.buildQuery(req.body);
	requestsQuery.exec(function(error, results){
		if (error) {
			res.send('There was an error while handling your request.');
		} else {
			res.send(results.slice(0,999));
		}
	});
});

router.get('/:serviceRequestID.json', function(req, res){
	var serviceRequestID = req.body.service_request_id;
	var request = Request.find({service_request_id : serviceRequestID});
	res.send(request);
});

module.exports = router;

function hasLocationInfo(params) {
	return ((typeof params.lat != 'undefined' && typeof params.long != 'undefined') ||  
	    (typeof params.address_string != 'undefined') ||
	    (typeof params.address_id != 'undefined'));
}