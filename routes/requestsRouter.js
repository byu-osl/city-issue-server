// /requests.json

var express = require('express');
var router = express.Router();
var Request = require('../models/request');

router.post('/', function(req, res) {
	var request = new Request({
		first_name: req.body.first_name,
		last_name:  req.body.last_name
	});
	request.save();
	console.log(request)
	// var serviceRequest = new ServiceRequest();
	res.end('Request successfully saved.');
});

router.get('/', function(req, res) {
	console.log("Fetching requests")
	var requests = Request.getAll(req.body);
	res.send(requests);
});

router.get('/:serviceRequestID.json', function(req, res){
	var serviceRequestID = req.body.service_request_id;
	var request = Request.find({service_request_id : serviceRequestID});
	res.send(request);
})

module.exports = router;
