'use strict';

var serverAPI = {};

serverAPI.postRequest = function (data, cb) {
    $.post('/requests.json', data, cb);
}

serverAPI.getCategories = function (cb) {
     $.get('/services.json', cb);
}

serverAPI.registerUser = function (data, cb) {
	$.post('/register', data, cb);
}

serverAPI.authenticate = function (token, cb) {
	$.post('/authenticate', {token:token}, cb);
}

module.exports = serverAPI;