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

serverAPI.authenticate = function (token, cb, thisArg) {
	$.post('/authenticate', {token:token}, function(data){
		cb.call(thisArg, data)
	});
}

module.exports = serverAPI;