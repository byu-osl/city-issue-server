var mongoose = require('mongoose');
var serviceSchema = new mongoose.Schema({
    service_code: String,
    service_name: String,
    description:  String,
    metadata:     Boolean,
    type:         String,
    keywords:     String,
    group:        String
});

module.exports = mongoose.model('Service', serviceSchema);