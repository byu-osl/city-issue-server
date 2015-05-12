'use strict';
var React      = require('react');
var mapMixin   = require('../mixins/mapMixin.js');
var styles     = require('../styles.js');
var _          = require('../_.js');
var Router     = require('react-router');
var Link       = Router.Link
var Marker     = google.maps.Marker;
var cityCenter = new google.maps.LatLng(40.4122994, -111.75418)


var mapOptions = {
	center: {
		lat: 40.4122994,
		lng: -111.75418
	},
	zoom:      14,
	mapTypeId: google.maps.MapTypeId.HYBRID
}

var geocoder = new google.maps.Geocoder();

var AdminMap = React.createClass({
	mixins: [mapMixin],

	getInitialState: function () {
		return {
			map: undefined,
			requests: [],
			markers: []
		}
	},

	initializeMap: function () {
		var map = new google.maps.Map($('.map-canvas')[0], mapOptions);
		google.maps.event.addListener(map, 'click', this.mapClicked);
		
		this.setState({
			map: map,
		});

		this.state.map = map;
	},

	renderInfoWindow: function (request) {
		var imageStyle = styles.hiddenIf((isUndefined(request.media_url) || !request.media_url));

		_.assign(imageStyle, {
			maxWidth:     150,
			maxHeight:    150,
			marginBottom: 10
		});

		var content = (
			<a href={'/#/requests/'+request._id}>
				<label>Category: {request.service_name}</label>
				<p>open</p>
				<img style={imageStyle} src={isUndefined(request.media_url)? '' : request.media_url}></img>
				<p>{request.address_string}</p>
			</a>
		);

		return React.renderToStaticMarkup(content);
	},

	setFilter: function (event, options) {
		var self = this;
		options = this.setDefaults(options);

		this.state.markers.forEach(function (marker) {
			var allGood = true;

			_.keys(options).forEach(function (option){
				if (!_.contains(options[option], marker.request[option])) {
					allGood = false
				} 
			});

			if (!allGood) {
				marker.setMap(null)
			} else {
				marker.setMap(self.state.map)
			}
		});
	},

	componentDidMount: function () {
		var self = this;
		$(document).ready(function(){self.initializeMap()});
		$(window).on('map:filterChanged', this.setFilter)
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

