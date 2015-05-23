'use strict';
// requests/addDocument

var mongoose   = require('mongoose');
var fs         = require('fs');
var express    = require('express');
var router     = express.Router();
var Request    = require('../models/request');
// var Grid       = require('gridfs-stream');
// var connection = mongoose.createConnection('mongodb://localhost/city-issues');
// Grid.mongo     = mongoose.mongo;
// var gfs        = Grid(connection.db);

router.post('/', addDocument);

function addDocument(req, res) {
	debugger;
	Request.findById(req.body._id, function(error, request){
		debugger;
		if (request) {
			debugger;
		} else {
			res.send404('Couldn\'t find a request with that ID.');
		}
	});
}

module.exports = router;