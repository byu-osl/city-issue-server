'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');


function authenticate (req, res, next) {
	var decodedUser = jwt.decode(req.headers.Authorization, config.key);
	if (decodedUser) {
		req.user = decodedUser;
		next();
	} else {
		res.send401('Could not authenticate the request.');
	}
}

module.exports = authenticate;

