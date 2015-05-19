'use strict';

var api = {};
api.cache = {};
var TEN_MINUTES = 1000 * 60 * 10;
var BASE_PATH = 'http://localhost:3000';

setInterval(function resetCache() {
	api.cache = {};
}, TEN_MINUTES);

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

////////////////////////////////
// Requests
////////////////////////////////

api.postRequest = function (data, cb, thisArg) {
    $.post(BASE_PATH + '/requests.json', data, function(request) {
    	resetCacheItem('requests');
    	cb.call(thisArg, request);
    });
}

api.updateRequest = function (data, cb, thisArg) {
	$.post(BASE_PATH + '/requests/update', data, function (request){
		resetCacheItem('requests');
		cb.call(thisArg, request);
	});
}

api.getRequest = function (id, cb, thisArg){
	if (isInCache(id)) {
		cb.call(thisArg, getFromCache(id));
		return;
	} else {
		$.get(BASE_PATH + '/requests/'+id+'.json', function (request){
			addToCache(id, request)
			cb.call(thisArg, request);
		}.bind(this));
	}
}

api.getRequests = function(options, cb, thisArg) {
	if (typeof options === 'function') {
		thisArg = cb; cb = options; options = {}; 
	}

	if (isInCache('requests')) {
		cb.call(thisArg, getFromCache('requests'));
		return;
	}

	if (typeof options === 'function') {
		thisArg = cb;
		cb = options;
		options = {};
	}

	$.get(BASE_PATH + '/requests', options, function gotRequests(requests){
		addToCache('requests', requests);
		cb.call(thisArg, requests);
	}.bind(this));
}

api.addHistoryEntry = function (options, cb, thisArg) {
	$.post(BASE_PATH + '/requests/addHistoryEntry', options, function postedHistory (newHistory) {
		cb.call(thisArg, newHistory);
	});
}

////////////////////////////////
// Services
////////////////////////////////

api.addService = function(options, cb, thisArg) {
	$.post(BASE_PATH + '/services', options, function (newService) {
		cb.call(thisArg, newService);
		resetCacheItem('services');
	});
}

api.updateService = function(data, cb) {
	$.post(BASE_PATH + '/services/update', data, cb);
	resetCacheItem('services');
}

api.getServices = function (cb, thisArg) {
	if (isInCache('services')) {
		cb.call(thisArg, getFromCache('services'));
		return;
	}

    $.get(BASE_PATH + '/services.json', function(data) {
    	addToCache('services', data)
		cb.call(thisArg, data);
    }.bind(this));
}

api.getServiceMetadata = function (cb, thisArg) {
	if (isInCache('service-metadata')) {
		cb.call(thisArg, getFromCache('service-metadata'));
		return;
	}

	$.get(BASE_PATH + '/services/metadata', function(metadata) {
		addToCache('service-metadata', metadata);
		cb.call(thisArg, metadata)
	}.bind(this)); 
}

////////////////////////////////
// Users
////////////////////////////////

api.registerUser = function (data, cb) {
	resetCacheItem('users');
	$.post(BASE_PATH + '/register', data, cb);
}

api.authenticate = function (token, cb, thisArg) {
	$.post(BASE_PATH + '/authenticate', {token:token}, function authDone(data){
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