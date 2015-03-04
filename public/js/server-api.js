function serverAPI () {}

serverAPI.prototype.postRequest = function (data, callback) {
    $.post('/requests.json', data, callback);
}

serverAPI.prototype.getCategories = function (data, callback) {
     $.get('/services.json', callback);
 }