// /requests.json

var express = require('express');
var router = express.Router();
var Request = require('../models/request');

router.post('/', function(req, res) {
	// TODO: is this really how the start date should be done?
	var startDate = new Date().toISOString();
	var status    = "open";

	var request = new Request({
		first_name:     req.body.first_name,
		last_name:      req.body.last_name,
		lat: 		    req.body.lat,
		long: 		    req.body.long,
		address_string: req.body.address_string,
		address_id:     req.body.address_id,
		email:          req.body.email,
		device_id:      req.body.device_id,
		account_id:     req.body.account_id,
		phone:          req.body.phone,
		description:    req.body.description,
		media_url:      req.body.media_url,
		start_date:     startDate,
		status:         status
	});
	
	request.save(function(error, requests, numberAffected){
		if (error) {
			res.end('Error in saving your request');
		} else if (numberAffected > 0) {
			res.send('Request saved.')
		} else {
			res.send('Request not saved.')
		}
	});
});

router.get('/', function(req, res) {
	console.log("Fetching requests")
	var requestsQuery = Request.buildQuery(req.body);
	requestsQuery.exec(function(error, results){
		res.send(results);
	})
});

router.get('/:serviceRequestID.json', function(req, res){
	var serviceRequestID = req.body.service_request_id;
	var request = Request.find({service_request_id : serviceRequestID});
	res.send(request);
})

module.exports = router;
