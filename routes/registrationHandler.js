'use strict';

var express = require('express');
var router  = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');  

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
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		req.body.passwordHash = hash;
		var user = new User(req.body);
		user.save(function userSaved (error, user, numberAffected){
			if (error) {
				res.send500('There was an error saving this user');
			} else if (numberAffected > 0) {
				res.send('User saved.');
			}
		});
	});
}

module.exports = router;

