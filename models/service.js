var mongoose = require('mongoose');
var serviceSchema = new mongoose.Schema({
    description:  String,
    metadata:     Boolean,
    keywords:     String,
    group:        String,
    service_code: String,
    service_name: String,
    type:         String
});

module.exports = mongoose.model('Service', serviceSchema);