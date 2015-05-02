'use strict';

// requests/addHistoryEntry

var express = require('express');
var router  = express.Router();
var Request = require('../models/request');

router.post('/', addHistoryEntry);

function addHistoryEntry(req, res) {
	console.log('adding history');
	Request.findById(req.body.requestID, function(error, request){
		if (request) {
			request.history.push({date: new Date(), description: req.body.description});
			request.markModified('history');
			debugger;
			request.save(function(error, request){
				debugger;
				res.send(request);
			});
		} else {
			res.send404('Couldn\'t find a request with that ID.');
		}
	});
}

module.exports = router;