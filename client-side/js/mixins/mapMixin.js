'use strict';

var _   = require('../_.js');
var api = require('../server-api.js');

// TODO: cache maps rather than taking the time to add markers so much

module.exports = {
	loadRequests: function (requests, options) {
		var services;
		options = this.setDefaults(options);
		this.setState({requests:requests});

		if (this.state.services) {
			services = this.state.services;
			this.constructMarkers(requests, options);
		} else {
			api.getServices(function gotServices(services) {
	            this.setState({
	                services: services
	            });
		        this.constructMarkers(requests, options);
	        }, this);
		}
	},

	constructMarkers: function (requests) {
		var map = this.state.map;

		var markers = requests.filter(hasLatitude).map(function constructMarker(request) {
			var infoWindow = new google.maps.InfoWindow({
				content: this.renderInfoWindow(request)
			});

			var service = _.findWhere(this.state.services, {service_code:request.service_code})
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(request.lat, request.long),
				map:      map,
				title:    request.service_name,
				icon:     service.marker_image
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
			case 'pothole':     return '../../../images/marker-orange.png'; 
			case 'streetlight': return '../../../images/marker-yellow.png'; 
			case 'irrigation':  return '../../../images/marker-blue.png'; 
			case 'sidewalk':    return '../../../images/marker-white.png'; 
			case 'vandalism':   return '../../../images/marker-purple.png'; 
			default:            return '../../../images/marker-gray.png'
		}
	},

	setDefaults: function (options) {
		var defaultOptions = {
			status: ['open']
		};

		if (isUndefined(options)) {
			return defaultOptions;
		}

		return _.assign(defaultOptions, options);
	}
}

function hasLatitude(request) {
	return !isUndefined(request.lat)
}
