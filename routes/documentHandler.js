'use strict';
// requests/addDocument

var express    = require('express');
var router     = express.Router();
var Request    = require('../models/request');

router.post('/', addDocument);

function addDocument(req, res) {

	Request.findById(req.body._id, function(error, request){
		if (request) {
			var file = req.files.file;

			request.documents.push({
				name: file.originalname,
				filetype: file.extension,
				path: file.path.replace(new RegExp(global.__rootDirname),'')
			});

			request.markModified('documents');

			request.save(function (error, request){
				if (error || !request) {
					console.log('error', error);
					res.send500('Document handler: error saving the request.');
				} else {
					console.log('request.documents', request.documents);
					res.send(request.documents);
				}
			});
		} else {
			res.send404('Couldn\'t find a request with that ID.');
		}
	});
}

module.exports = router;