'use strict';

var express = require('express');
var User = require('../models/user');
var config = require('../config');
var router  = express.Router();

router.get('/', getUsers);

function getUsers (req, res) {
	
}

module.exports = router;

