'use strict';
// requests/addHistoryEntry

var express = require('express');
var router  = express.Router();
var Request = require('../models/request');

router.post('/', addHistoryEntry);

function addHistoryEntry(req, res) {
	console.log('req.body._id', req.body._id);
	Request.findById(req.body._id, function(error, request){

		
		if (request) {
			request.history.push({date: req.body.date, description: req.body.description});
			request.markModified('history');
			if (request.contact_method === 'email') {
				// sendEmail(request, some callback);
			}
			request.save(function(error, request){
				res.send(request.history);
			});
		} else {
			res.send404('Couldn\'t find a request with that ID.');
		}
	});
}

module.exports = router;