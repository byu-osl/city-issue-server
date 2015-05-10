'use strict';

var _ = require('../_.js');

module.exports = {
	loadRequests: function (requests, options) {
		options = this.setDefaults(options);
		var map = this.state.map;
		this.setState({requests:requests});
		var markers = requests.map(function(request, index) {
			if (isUndefined(request.lat)) {return;}
			
			var infoWindow = new google.maps.InfoWindow({
				content: this.renderInfoWindow(request)
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(request.lat, request.long),
				map:      map,
				title:    request.service_name,
				icon:     this.getImageType(request.service_name)
			});

			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open(map, marker);
			});

			marker.request = request;
			return marker;
		}, this);	

		this.setState({markers:markers})
	},

	getImageType: function (serviceName) {
		switch(serviceName) {
			case 'potholes':     return '../../../images/marker-orange.png'; 
			case 'streetlights': return '../../../images/marker-yellow.png'; 
			case 'irrigation':   return '../../../images/marker-blue.png'; 
			case 'sidewalks':    return '../../../images/marker-white.png'; 
			case 'vandalism':    return '../../../images/marker-purple.png'; 
			default:             return '../../../images/marker-gray.png'
		}
	},

	setDefaults: function (options) {
		var defaultOptions = {
			status: ['open', 'closed']
		};

		if (isUndefined(options)) {
			return defaultOptions;
		}

		return _.assign(defaultOptions, options);
	}
}
