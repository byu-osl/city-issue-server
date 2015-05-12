'use strict';

var api = {};
api.cache = {};
var FIVE_MINUTES = 1000 * 60 * 5;

setInterval(function resetCache() {
	api.cache = {};
}, FIVE_MINUTES);

var addToCache = function(key, value) {
	api.cache[key] = value;
}

var getFromCache = function(key) {
	return api.cache[key];
};

var isInCache = function(key) {
	if (isUndefined(key) || isUndefined(api.cache[key]) || !api.cache[key]) {
		return false;
	} else {
		return true;
	}
};

var resetCacheItem = function(key) {
	api.cache[key] = null;
}

// Requests
api.postRequest = function (data, cb, thisArg) {
    $.post('/requests.json', data, function(request) {
    	resetCacheItem('requests');
    	cb.call(thisArg, request);
    });
}

api.getRequest = function (id, cb, thisArg){
	if (isInCache(id)) {
		cb.call(thisArg, getFromCache(id));
		return;
	} else {
		$.get('/requests/'+id+'.json', function (request){
			addToCache(id, request)
			cb.call(thisArg, request);
		}.bind(this));
	}
}

api.getRequests = function(options, cb, thisArg) {
	if (typeof options === 'function') {thisArg = cb; cb = options; options = {}; }

	if (isInCache('requests')) {
		cb.call(thisArg, getFromCache('requests'));
		return;
	}

	if (typeof options === 'function') {
		thisArg = cb;
		cb = options;
		options = {};
	}

	$.get('/requests', options, function gotRequests(requests){
		addToCache('requests', requests);
		cb.call(thisArg, requests);
	}.bind(this));
}

// Services
api.getServices = function (cb, thisArg) {
	if (isInCache('services')) {
		cb.call(thisArg, getFromCache('services'));
		return;
	}

    $.get('/services.json', function(data) {
    	addToCache('services', data)
		cb.call(thisArg, data);
    }.bind(this));
}

api.getServiceMetadata = function (cb, thisArg) {
	if (isInCache('service-metadata')) {
		cb.call(thisArg, getFromCache('service-metadata'));
		return;
	}

	$.get('/services/metadata', function(metadata) {
		addToCache('service-metadata', metadata);
		cb.call(thisArg, metadata)
	}.bind(this));
}
// Users
api.registerUser = function (data, cb) {
	resetCacheItem('users');
	$.post('/register', data, cb);
}

api.authenticate = function (token, cb, thisArg) {
	$.post('/authenticate', {token:token}, function authDone(data){
		cb.call(thisArg, data);
	});
}

api.getUsers = function(options, cb, thisArg) {
	if (typeof options === 'function') {thisArg = cb; cb = options; options = {}; }

	if (isInCache('users')) {
		cb.call(thisArg, getFromCache('users'));
	}

	cb.call(thisArg, []);
}

module.exports = api;