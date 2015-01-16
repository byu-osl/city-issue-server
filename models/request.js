var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
    account_id: Number,         // the user who submitted the request
    address_id: Number,         // address of some external system
    address_string: String,     // description of location of the issue
    agency_responsible: String, // who needs to fulfill it
    description: String,        // description of the request
    device_id: Number,          // unique ID of the device that submitted the request
    email: String,              // of the submitter
    expected_datetime: Date,    // when it's expected to be fulfilled
    first_name: String,         // of the submitter
    jurisdiction_id: Number,    // unique city identifier
    lat: String,                // of the location
    last_name: String,          // of the submitter
    media_url: String,          // image/etc. associate with the request
    long: String,               // of the location
    phone: String,              // of the submitter
    requested_datetime: Date,   // time requested
    service_code: Number,       // type of service needed
    service_name: String,       // type of service needed (human readable)
    service_notice: String,     // about how it should be fixed
    service_request_id: Number, // unique request id
    status: {type: String, enum: ['open', 'closed']},
    status_notes: String,       // reason for the status
    updated_datetime: Date,     // last modified
    zipcode: Number             // of the location
});

// Takes req.body as the parameter
// returns a built query to be executed
// 
requestSchema.statics.buildQuery = function(params){
    var requestsQuery = this.find();
    var startDate = params.start_date; //  lower bound for requested_datetime
    var endDate = params.end_date;     // upper bound for requested_datetime
    var requestIDs = params.service_request_id;
    var serviceCodes = params.service_code;
    var status = params.status;

    // TODO: if given range is greater than 90 days, set to be the most
    //   recent 90 days
    if (typeof startDate == 'undefined') {
        startDate = new Date(new Date().setDate(new Date().getDate()-90)); // 90 days ago
    } else {
        startDate = new Date(params.start_date) ; 
    }

    if (typeof serviceCode != 'undefined') {
        serviceCodes = serviceCodes.split(',');
        requestsQuery = requestsQuery.where('service_code').in(serviceCodes);
    }

    if (typeof endDate != 'undefined') {
        endDate = new Date(params.end_date);
        requestsQuery = requestsQuery.where('requested_datetime').lte(endDate);
    }

    if (typeof status != 'undefined') {
        requestsQuery = requestsQuery.where('status').equals(status);
    }

    requestsQuery = requestsQuery.where('request_datetime').gt(startDate)

    // Overrides everything else if defined.
    if (typeof requestIDs != 'undefined') {
        requestIDs = requestIDs.split(',');
        requestsQuery = this.find().where('service_request_id').in(requestIDs);
    }

    return requestsQuery;
};

module.exports = mongoose.model('Request', requestSchema);