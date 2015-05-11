'use strict';

var api = {};

// Requests
api.postRequest = function (data, cb) {
    $.post('/requests.json', data, cb);
}

api.getRequest = function (id, cb, thisArg){
	$.get('/requests/'+id+'.json', function (data){
		cb.call(thisArg, data);
	});
}

api.getRequests = function(options, cb, thisArg) {
	if (typeof options === 'function') {
		thisArg = cb;
		cb = options;
		options = {};
	}

	$.get('/requests', options, function gotRequests(data){
		cb.call(thisArg, data);
	});
}

// Services
api.getServices = function (cb, thisArg) {
     $.get('/services.json', function(data) {
		cb.call(thisArg, data);
     });
}

api.getServiceMetadata = function (cb, thisArg) {
	$.get('/services/metadata', function(data) {
		cb.call(thisArg, data)
	});
}
// Users
api.registerUser = function (data, cb) {
	$.post('/register', data, cb);
}

api.authenticate = function (token, cb, thisArg) {
	$.post('/authenticate', {token:token}, function authDone(data){
		cb.call(thisArg, data);
	});
}

api.getUsers = function(options, cb, thisArg) {
	if (typeof options === 'function') {
		thisArg = cb;
		cb = options;
		options = {};
	}
	
	cb.call(thisArg, []);
}

module.exports = api;