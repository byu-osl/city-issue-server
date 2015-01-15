var express = require('express');
var services = express.Router();
var Service = require('../models/service');

// provide a list of acceptable 311 service request types and their associated service codes. 
services.get('/', function(req, res) {
	res.send(Service.find())
});

services.get(':serviceCode.json', function(req, res){
	var serviceCode = req.params.serviceCode;
	var service = Service.find({service_code: serviceCode});
	res.send(service)
});

module.exports = services;

// Example:
// {
//     "service_code":001,
//     "service_name":"Cans left out 24x7",
//     "description":"Garbage or recycling cans that have been left out for more than 24 hours after collection. Violators will be cited.",
//     "metadata":true,
//     "type":"realtime",
//     "keywords":"lorem, ipsum, dolor",
//     "group":"sanitation"
// }