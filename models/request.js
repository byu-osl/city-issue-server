var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
    account_id: Number,
    address_id: Number,
    address_string: String,
    description: String,
    device_id: Number,
    email: String,
    first_name: String,
    jurisdiction_id: Number,
    lat: String,
    last_name: String,
    media_url: String,
    long: String,
    phone: String,
    service_code: Number,
    service_request_id: Number,
});

requestSchema.statics.getAll = function(params){
    var requestsQuery = this.find();
    var startDate = params.start_date;
    var endDate = params.end_date;
    var serviceCodes = params.service_code;
    // Can be multiple, separated by commas
    var requestIDs = params.service_request_id;

    console.log("requestIDs: "+requestIDs);

    if (typeof requestIDs != 'undefined') {
        console.log("Adding request IDs to the query.")
        requestIDs = requestIDs.split(',');
        requestsQuery = requestsQuery.where('service_request_id').in(requestIDs);
    }

    // Default to 90 days ago
    if (typeof startDate == 'undefined') {
        console.log("No start date")
        startDate = new Date(new Date().setDate(new Date().getDate()-90))
    } else {
        startDate = new Date(params.start_date) ; 
    }

    if (typeof endDate == 'undefined') {
        console.log("No end date")
        endDate = new Date(params.end_date) || new Date();
    } else {
        endDate = new Date(params.end_date)
    }

    var status = params.status || /.*/;
    console.log("status: "+status)

    requestsQuery = 
        requestsQuery
            .where('start_date').gt(startDate)
            .where('end_date').lte(endDate)
            .where('service_code').in(serviceCodes);

    requestsQuery.exec(function(error, requests){
        return requests;
    });
}

module.exports = mongoose.model('Request', requestSchema);