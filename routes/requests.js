var express = require('express');
var requests = express.Router();
var Request = require('../models/request')

requests.post('/', function(req, res) {
	console.log('Hit requests rdoute.')
	console.log(req.body)
	var request = new Request({
		first_name: req.body.first_name,
		last_name:  req.body.last_name
	});
	request.save();
	console.log(request)
	// var serviceRequest = new ServiceRequest();
	res.end('Woo');
});

module.exports = requests;
