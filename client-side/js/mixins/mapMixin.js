'use strict';

module.exports = {
	loadRequests: function (requests) {
		var map = this.state.map;
		var self = this;
		this.setState({requests:requests});
		requests.forEach(function(request, index) {
			if (typeof request.lat === 'undefined') {return;}

			var infoWindow = new google.maps.InfoWindow({
				content: this.renderInfoWindow(request)
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(request.lat, request.long),
				map:      map,
				title:    request.service_name,
				icon:     self.getImageType(request.service_name)
			});

			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open(map, marker);
			});
		}, this);	
	},

	getImageType: function (serviceName) {
		switch(serviceName) {
			case 'potholes':     return '../../../images/marker-orange.png'; 
			case 'streetlights': return '../../../images/marker-yellow.png'; 
			case 'irrigation':  return '../../../images/marker-blue.png'; 
			case 'sidewalks':    return '../../../images/marker-white.png'; 
			case 'vandalism':   return '../../../images/marker-purple.png'; 
			default:            return '../../../images/marker-gray.png'
		}
	},
}