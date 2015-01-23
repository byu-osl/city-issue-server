/* 
	route: /requests.json
*/

var express = require('express');
var router  = express.Router();
var Request = require('../models/request');
var Service = require('../models/service');

router.get('/:requestID.json', queryStatus);
router.get('/', findRequests);
router.post('/', validatePOSTParameters, saveRequest);

module.exports = router;

function queryStatus(req, res){
	var requestID = req.body.service_request_id;
	var query = Request.find({service_request_id : requestID});
	query.exec(function foundRequest(error, result){
		if (error) {
			res.send500('There was an error querying the request status.');
		} else {
			res.send(cleanUpGetResponse(result));
		}
	});
}

function findRequests(req, res) {
	var requestsQuery = Request.buildQuery(req.body);
	requestsQuery.exec(function foundRequests(error, results){
		if (error) {
			console.log(error);
			res.send500('There was an error while searching for your request.');
		} else {
			res.send(results.slice(0,999).map(cleanUpGetResponse));
		}
	});
}

function validatePOSTParameters(req, res, next) {
	var serviceCode = req.body.service_code;

	if (typeof serviceCode === 'undefined') {
		res.send400('A service code was not defined.');
		return;
	}
	if (!hasLocationInfo(req.body)) {
		res.send400('Your request must have one of the following: latitude and longitude, address_string, or address_id.');
		return;
	}

	Service.checkExistence(serviceCode, function (err, serviceExists){
		if (err) {
			console.log(err);
			res.send500('Something went wrong while trying to see if you had a valid service code.');
			return;
		}
		if (!serviceExists){
			res.send404('Couldn\'t find a service of that type. Wrong service code.');
			return;
		} 
		next();
	});
}

function saveRequest(req, res, next) {
	var requestedDate = new Date().toISOString();

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

	request.save(function requestSaved(error, request, numberAffected){
		if (error) {
			res.send500('There was an error in saving your request.');
			throw new Error(error);
		} else if (numberAffected > 0) {
			// TODO: spec says service_request_id shouldn't be returned if a token is returned
			res.send({
				service_request_id: request._id
			});
		} else {
			res.send('Request not saved.');
		}
	});
}

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