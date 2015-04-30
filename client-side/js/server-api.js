'use strict';

var serverAPI = {};

serverAPI.postRequest = function (data, cb) {
    $.post('/requests.json', data, cb);
}

serverAPI.getCategories = function (cb) {
     $.get('/services.json', cb);
}

serverAPI.registerUser = function (data, cb) {
	$.post('/register-user', data, cb);
}

serverAPI.login = function (token, cb) {
	$.post('/login', {token:token}, cb);
}

module.exports = serverAPI;