/*
	route: services.json

*/
var express  = require('express');
var router = express.Router();
var Service  = require('../models/service');

// provide a list of acceptable 311 service request types and their associated service codes. 
router.get('/', function listServices(req, res) {
	console.log('GET: /services');
	Service.find().exec(function(error, services){
		if (error){
			res.send('Error finding service request types.');
		} else {
			res.send(services);
		}
	});
});


router.get(':serviceCode.json', function(req, res){
	console.log('GET: /services');

	var serviceCode = req.params.serviceCode;
	var service = Service.find({service_code: serviceCode});
	res.send(service);
});

module.exports = router;

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