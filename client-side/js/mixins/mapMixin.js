'use strict';

var _   = require('_');
var api = require('server-api');

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
	            }, function (){
			        this.constructMarkers(requests, options);
	            });
	        }, this);
		}
	},

	constructMarkers: function (requests, options) {
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

			this.filterMarker(marker, options);
			return marker;
		}, this);	

		this.setState({markers:markers})
	},

	setDefaults: function (options) {
		var defaultOptions = {
			status: ['open']
		};

		if (isUndefined(options)) {
			return defaultOptions;
		}

		return _.assign(defaultOptions, options);
	},

	filterMarker: function (marker, options) {
		var allGood = true;

		_.keys(options).forEach(function (option){
			if (typeof options[option] === 'string') {
				options[option] = [options[option]]
			}
			
			if (!_.contains(options[option], marker.request[option])) {
				allGood = false
			} 
		});

		if (!allGood) {
			marker.setMap(null)
		} else {
			marker.setMap(this.state.map)
		}
	},
}

function hasLatitude(request) {
	return !isUndefined(request.lat)
}
