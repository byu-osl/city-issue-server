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
	draggable: true,
	position: cityCenter,
	title: 'Issue location'
}
var geocoder = new google.maps.Geocoder();

var Map = React.createClass({

	getInitialState: function () {
		return {
			latLng: undefined,
			map: undefined
		}
	},

	getLatLng: function () {
		return this.state.latLng;
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

	mapClicked: function (event) {
		geocoder.geocode({latLng: event.latLng}, this.props.onGeocode);
		this.state.marker.setPosition(event.latLng);
		this.setState({
			latLng:event.latLng
		});
		this.props.markValid();
	},

	markerDragged: function (event) {
		this.setState({latLng:event.latLng});
	},

	setCenter: function (lat, long) {
		var position = new google.maps.LatLng(lat, long);
		this.state.map.panTo(position);
		this.state.marker.setPosition(position);
		this.setState({latLng:position});
		this.state.map.setZoom(19);
		geocoder.geocode({'latLng':position}, this.props.onGeocode);
		this.props.markValid();
	},

	componentDidMount: function () {
		var self = this;
		$(document).ready(function(){self.initializeMap()});
	},

	render: function () {

		var style = {
			width: '100%',
			minHeight: 350
		}

		return (
			<div onBlur={this.props.onBlur} style={style} className='map-canvas'></div>
		)
	}

});

module.exports = Map;