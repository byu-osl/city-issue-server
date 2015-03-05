function serverAPI () {}

serverAPI.prototype.postRequest = function (data, callback) {
    $.post('/requests.json', data, callback);
}

serverAPI.prototype.getCategories = function (callback) {
     $.get('/services.json', callback);
 }