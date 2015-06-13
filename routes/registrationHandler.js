'use strict';

var express = require('express');
var router  = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');  
var jwt = require('jwt-simple');
var config = require('../config');

router.post('/', validateUser, registerUser);

function validateUser (req, res, next) {
	User.count({email:req.body.email}, function (err, count) {
		if (count > 0) {
			res.send('Email already in use.');
		} else {
			console.log('good to go');
			next();
		}
	});
}

function registerUser (req, res) {
	// 10 rounds: ~10 hashes/sec. Duration doubles for every extra round.
	bcrypt.hash(req.body.password, 15, function(err, hash) {
		req.body.passwordHash = hash;
		req.body.role = 'admin';
		var user = new User(req.body);

		user.save(function userSaved (error, user, numberAffected){
			delete user.passwordHash;
			var token = jwt.encode(user, config.key);
			if (error) {
				res.send500('There was an error saving this user');
			} else if (numberAffected > 0) {
				res.json({
					user: user,
					token: token
				});
			}
		});
	});
}

module.exports = router;

 