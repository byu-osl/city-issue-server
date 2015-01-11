var express = require('express');
var requests = express.Router();

requests.get('/:requestID', function(req, res) {
  var requestID = req.params.requestID;
  res.send('You requested #'+requestID+'. We aren\'t really sure what to do what your request yet.');
});

module.exports = requests;
