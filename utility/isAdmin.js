'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');


function isAdmin (req, res, next) {
	var decodedUser = jwt.decode(req.body.token, config.key);
	if (decodedUser) {
		User.count({email: decodedUser.email}, function (error, count) {
			if (count === 0 || decodedUser.role !== 'admin') {
				res.send403('You aren\'t authorized to make this request.');
			} else {
				next();
			}
		})
	} else {
		res.send403('You aren\'t authorized to make this request.');
	}
}
 
module.exports = isAdmin;

