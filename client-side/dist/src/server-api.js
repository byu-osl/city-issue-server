var ServerAPI = function () {
	this.postRequest = function (data, callback) {
	    $.post('/requests.json', data, callback);
	};

	this.getCategories = function (callback) {
	     $.get('/services.json', callback);
	};
}

module.exports = ServerAPI;