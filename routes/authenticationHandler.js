'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');
var router  = express.Router();

router.post('/', authenticate);

function authenticate (req, res) {
	console.log(req.body.token);
	var decodedUser = jwt.decode(req.body.token, config.key);
	console.log(decodedUser);
	if (decodedUser) {
		res.send(decodedUser);
	} else {
		res.send({authenticated: false});
	}
}

module.exports = router;

