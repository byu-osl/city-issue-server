var mongoose = require('mongoose');
var moment   = require('moment');
var requestSchema = new mongoose.Schema({
    account_id: String,         // the user who submitted the request
    address_id: Number,         // address of some external system
    address_string: String,     // description of location of the issue
    agency_responsible: String, // who needs to fulfill it
    description: String,        // description of the request
    device_id: String,          // unique ID of the device that submitted the request
    email: String,              // of the submitter
    expected_datetime: Date,    // when it's expected to be fulfilled
    first_name: String,         // of the submitter
    jurisdiction_id: String,    // unique city identifier
    lat: String,                // of the location
    last_name: String,          // of the submitter
    media_url: String,          // image/etc. associate with the request
    long: String,               // of the location
    phone: String,              // of the submitter
    requested_datetime: Date,   // time requested
    service_code: String,       // type of service needed
    service_name: String,       // type of service needed (human readable)
    service_notice: String,     // about how it should be fixed
    service_request_id: String, // unique request id
    status: {type: String, enum: ['open', 'closed']},
    status_notes: String,       // reason for the status
    updated_datetime: Date,     // last modified
    zipcode: Number             // of the location
});

// Takes req.body as the parameter
// returns a built query to be executed
requestSchema.statics.findRequests = function(params, callback){
    var requestsQuery = this.find();
    var startDate = params.start_date; //  lower bound for requested_datetime
    var endDate = params.end_date;     // upper bound for requested_datetime
    var requestIDs = params.service_request_id;
    var serviceCodes = params.service_code;
    var status = params.status;

    if (typeof startDate === 'undefined') {
        startDate = moment().subtract(90, 'days');
    } else {
        startDate = moment(params.start_date); 
    }

    if (typeof serviceCode !== 'undefined') {    
        serviceCodes = serviceCodes.split(',');
        requestsQuery = requestsQuery.where('service_code').in(serviceCodes);
    }

    if (typeof endDate !== 'undefined') {
        endDate = new Date(params.end_date);
        if (startDate.diff(endDate, 'days') > 90) {
            endDate = startDate.add(90, 'days').toDate();
        }
        requestsQuery = requestsQuery.where('requested_datetime').lte(endDate);
    }

    if (typeof status !== 'undefined') {
        requestsQuery = requestsQuery.where('status').equals(status);
    }

    requestsQuery = requestsQuery.where('requested_datetime').gt(startDate.toDate());

    // Overrides everything else if defined.
    if (typeof requestIDs !== 'undefined') {
        requestIDs = requestIDs.split(',');
        requestsQuery = this.find().where('_id').in(requestIDs);
    }

    requestsQuery.exec(callback);
};

module.exports = mongoose.model('Request', requestSchema);

// If the difference between the start and end > 90, set the end
// to be 90 days after the start. Leave the start where it is.