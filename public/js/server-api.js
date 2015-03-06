function ServerAPI () {}

ServerAPI.prototype.postRequest = function (data, callback) {
    $.post('/requests.json', data, callback);
}

ServerAPI.prototype.getCategories = function (callback) {
     $.get('/services.json', callback);
}

module.exports = ServerAPI;