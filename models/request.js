var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
    account_id: Number,
    address_id: Number,
    address_string: String,
    description: String,
    device_id: Number,
    email: String,
    end_date: Date,
    first_name: String,
    jurisdiction_id: Number,
    lat: String,
    last_name: String,
    media_url: String,
    long: String,
    phone: String,
    service_code: Number,
    service_request_id: Number,
    start_date: Date,
    status: String
});

/* If a request in the DB does not have an end date, it should
be treated as if the end date is today.
    
*/

requestSchema.statics.buildQuery = function(params){
    var requestsQuery = this.find();
    var startDate = params.start_date;
    var endDate = params.end_date;
    var serviceCodes = params.service_code;
    // Can be multiple, separated by commas
    var requestIDs = params.service_request_id;

    if (typeof requestIDs != 'undefined') {
        requestIDs = requestIDs.split(',');
        requestsQuery = requestsQuery.where('service_request_id').in(requestIDs);
    }

    // Default to 90 days ago
    if (typeof startDate == 'undefined') {
        startDate = new Date(new Date().setDate(new Date().getDate()-90))
    } else {
        startDate = new Date(params.start_date) ; 
    }

    if (typeof endDate != 'undefined') {
        endDate = new Date(params.end_date)
        requestsQuery = requestsQuery.where('end_date').lte(endDate)
    }

    var status = params.status || /.*/;

    requestsQuery = requestsQuery
        .where('start_date').gt(startDate)
        .where('status').equals(status)


    return requestsQuery;
}

module.exports = mongoose.model('Request', requestSchema);