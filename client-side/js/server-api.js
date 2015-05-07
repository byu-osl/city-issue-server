'use strict';

var serverAPI = {};

serverAPI.postRequest = function (data, cb) {
    $.post('/requests.json', data, cb);
}

serverAPI.getServices = function (cb, thisArg) {
     $.get('/services.json', function(data) {
		cb.call(thisArg, data);
     });
}

serverAPI.registerUser = function (data, cb) {
	$.post('/register', data, cb);
}

serverAPI.authenticate = function (token, cb, thisArg) {
	$.post('/authenticate', {token:token}, function authDone(data){
		cb.call(thisArg, data);
	});
}

serverAPI.getRequests = function(options, cb, thisArg) {
	if (typeof options === 'function') {
		thisArg = cb;
		cb = options;
		options = {};
	}

	$.get('/requests', options, function gotRequests(data){
		cb.call(thisArg, data);
	});
}

serverAPI.getUsers = function(options, cb, thisArg) {
	if (typeof options === 'function') {
		thisArg = cb;
		cb = options;
		options = {};
	}
	
	cb.call(thisArg, []);
}

module.exports = serverAPI;