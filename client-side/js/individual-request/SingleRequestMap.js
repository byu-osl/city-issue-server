'use strict';
var React      = require('react');
var mapMixin   = require('../mixins/mapMixin');

var mapOptions = {
	center: {
		lat: 40.4122994,
		lng: -111.75418
	},
	zoom:            14,
	scrollwheel: false
}

var Map = React.createClass({
	mixins: [mapMixin],

	getInitialState: function () {
		return {
			map: undefined,
		}
	},

	initializeMap: function () {
		var map = new google.maps.Map($('.map-canvas')[0], mapOptions);
		
		this.setState({
			map:map,
		}); this.state.map = map;
	},

	setRequest: function (request) {
		var latLng = new google.maps.LatLng(request.lat, request.long);
		var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			draggable: false,
			position: latLng
		});

		marker.setMap(this.state.map);

		if (!isUndefined(request.media_url) && request.media_url.length > 0) {
			var infoWindow = new google.maps.InfoWindow({
				content: '<img style="max-width:100%" src="'+request.media_url+'"/>'
			});
			infoWindow.open(this.state.map, marker);
		}

		this.state.map.setCenter(latLng);
		this.state.map.setZoom(17);
	},

	componentDidMount: function () {
		$(document).ready(function(){this.initializeMap()}.bind(this));
	},

	render: function () {

		var style = {
			width:     '100%',
			height: $(window).width() < 500 ? 300 : 500,
			maxHeight: $(window).height() / 1.5
		}

		return (
			<div style={style} className='map-canvas'></div>
		)
	}

});

module.exports = Map;