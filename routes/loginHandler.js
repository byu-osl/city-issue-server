'use strict';

var express = require('express');
var router  = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

router.post('/', loginUser);

function loginUser (req, res) {
	User.findOne({email: req.body.email}, function userFound(err, user) {
		if (err) {
			res.send500('There was an error finding a user');
		}

		if (!user) {
			res.send('That user does not exist');
		}

		bcrypt.compare(req.body.password, user.passwordHash, function(err, response) {
			if (response === true) {
				res.send(user);
			} else {
				res.send('Incorrect password');
			}
		})
	})
}

module.exports = router;

