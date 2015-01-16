var mongoose = require('mongoose');
var serviceSchema = new mongoose.Schema({
    description:  String,  // of the service type
    metadata:     Boolean, // requires additional data
    keywords:     String,  // CSV of tags about the request type
    group:        String,  // "sanitation"
    service_code: String,  // unique ID for this type
    service_name: String,  // human readable name
    
    // type: 
    //   realtime: The service request ID will be returned immediately after the service request is submitted. 
	//   batch: A token will be returned immediately after the service request is submitted. This token can then be later used to return the service request ID. 
	//	 blackbox: No service request ID will be returned after the service request is submitted
    type:  {type: String, enum:['realtime','batch', 'blackbox']}
});

module.exports = mongoose.model('Service', serviceSchema);