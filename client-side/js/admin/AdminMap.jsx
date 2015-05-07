'use strict';
var React  = require('react');
var Marker = google.maps.Marker;
var cityCenter = new google.maps.LatLng(40.4122994, -111.75418)
var mapOptions = {
	center: {
		lat: 40.4122994,
		lng: -111.75418
	},
	draggableCursor:'crosshair',
	zoom: 14,
	mapTypeId: google.maps.MapTypeId.HYBRID
}

var markerOptions = {
	animation: google.maps.Animation.DROP,
	draggable: false,
}

var geocoder = new google.maps.Geocoder();

var AdminMap = React.createClass({

	getInitialState: function () {
		return {
			map: undefined,
			requests: []
		}
	},

	initializeMap: function () {
		var map = new google.maps.Map($('.map-canvas')[0], mapOptions);
		google.maps.event.addListener(map, 'click', this.mapClicked);
		
		var marker = new Marker(markerOptions);
		marker.setMap(map);
		google.maps.event.addListener(marker, 'dragend', this.markerDragged);

		this.setState({
			map: map,
			marker: marker
		});
	},

	loadRequests: function (requests) {
		var map = this.state.map;
		var self = this;
		requests.forEach(function(request, index) {
			if (typeof request.lat === 'undefined') {return;}

			var infoWindow = new google.maps.InfoWindow({
				content: this.renderInfoWindow(request)
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(request.lat, request.long),
				map: map,
				title: request.description,
				icon: self.getImageType(request.service_code)
			});

			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open(map, marker);
			});
		}, this);
	},

	renderInfoWindow: function (request) {
		var content = (
			<div>
				<label>Pothole</label>
				<p>open</p>
				<p>{request.address_string}</p>
			</div>
		);

		return React.renderToStaticMarkup(content);
	},

	getImageType: function (serviceCode) {
		switch(serviceCode) {
			case 2:  return '../../../images/pothole-marker.png'
			default: return '../../../images/pothole-marker.png'
		}
	},

	componentDidMount: function () {
		var self = this;
		$(document).ready(function(){self.initializeMap()});
	},

	render: function () {

		var style = {
			width: '100%',
			minHeight: 500
		}

		return (
			<div onBlur={this.props.onBlur} style={style} className='map-canvas'></div>
		)
	}

});

module.exports = AdminMap;