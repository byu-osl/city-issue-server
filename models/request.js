var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
    jurisdiction_id: Number,
    service_code: Number,
    lat: String,
    long: String,
    address_string: String,
    address_id: Number,
    email: String,
    device_id: Number,
    account_id: Number,
    first_name: String,
    last_name: String,
    phone: String,
    description: String,
    media_url: String,
});

module.exports = mongoose.model('Request', requestSchema);