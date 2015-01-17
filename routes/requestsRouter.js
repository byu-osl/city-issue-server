/* 
	route: /requests.json
*/

var express = require('express');
var router = express.Router();
var Request = require('../models/request');
var Service = require('../models/service');

// TODO: this is supposed to require an API key
router.post('/', function saveRequest(req, res) {
	// TODO: is this really how the start date should be done?
	var requestedDate = new Date().toISOString();
	var serviceCode = req.body.service_code;

	if (typeof serviceCode === 'undefined') {
		res.status(400).send({
			code: 400,
			description: "A service code was not defined."
		});
		return;
	}

	var query = Service.find({service_code:serviceCode});
	query.exec(function checkServiceExistence(error, services){
		if (services.length === 0) {
			res.status(404).send({
				code: 404,
				description: 'Couldn\'t find a service of that type. Wrong service code number.'
			});
			return;
		}
	});

	// TODO: what error message to send?
	if (!hasLocationInfo(req.body)) {
		console.log('Invalid request.');
		res.status(400).send({
			code: 400,
			description: 'Your request must have one of the following: latitude and longitude, address_string, or address_id.'
		});
		return;
	}

	var request = new Request({
		account_id:         req.body.account_id,
		address_string:     req.body.address_string,
		address_id:         req.body.address_id,
		device_id:          req.body.device_id,
		description:        req.body.description,
		email:              req.body.email,
		first_name:         req.body.first_name,
		last_name:          req.body.last_name,
		lat: 		        req.body.lat,
		long: 		        req.body.long,
		media_url:          req.body.media_url,
		phone:              req.body.phone,
		service_code:       req.body.service_code,
		requested_datetime: requestedDate,
		status:       	    'open'
	});

	console.log('Saving...');
	request.save(function requestSaved(error, request, numberAffected){
		console.log('Saved.');
		if (error) {
			res.status(500).send({
				code: 500,
				description: 'There was an error in saving your request.'
			});
		} else if (numberAffected > 0) {
			// TODO: spec says service_request_id shouldn't be returned if a token is returned
			res.send({
				service_request_id: request._id
			});
		} else {
			res.send('Request not saved.');
		}
	});
});

router.get('/', function findRequests(req, res) {
	console.log('Fetching requests');
	var requestsQuery = Request.buildQuery(req.body);
	requestsQuery.exec(function foundRequests(error, results){
		if (error) {
			res.status(500).send({
				code: 500,
				description: 'There was an error while searching for your request.'
			});
		} else {
			res.send(results.slice(0,999).map(cleanUpGetResponse));
		}
	});
});

// Should be /requests/:id.json
router.get('/:requestID.json', function queryStatus(req, res){
	console.log('Querying status.');
	var requestID = req.body.service_request_id;
	var query = Request.find({service_request_id : requestID});
	query.exec(function foundRequest(error, result){
		if (error) {
			res.status(500).send({
				code: 500,
				description: 'There was an error querying the request status.'
			});
		} else {
			res.send(cleanUpGetResponse(result));
		}
	});
});

module.exports = router;

//  required for requests
function hasLocationInfo(params) {
	return ((typeof params.lat != 'undefined' && 
			 typeof params.long != 'undefined') ||  
	    (typeof params.address_string != 'undefined') ||
	    (typeof params.address_id != 'undefined'));
}

// Takes a request JSON object
// Returns a JSON object with parts filtered out
function cleanUpGetResponse(request) {
	var fieldsToDelete = [
		'status_notes',
		'agency_responsible',
		'service_notice',
		'expected_datetime'
	];
	fieldsToDelete.forEach(function deleteField(field){
		delete request[field];
	});
	return request;
}