var express = require('express');
var requests = express.Router();

requests.get('/', function(req, res) {
	console.log(req)
  var firstName = req.query.first_name;
  res.send(firstName+', thanks for your request!');
});

module.exports = requests;
