'use strict';
var React      = require('react');
var mapMixin   = require('../mixins/mapMixin.js');
var api        = require('../server-api.js');
var Marker     = google.maps.Marker;
var styles     = require('../styles.js');
var cityCenter = new google.maps.LatLng(40.4122994, -111.75418)
var mapOptions = {
	center: {
		lat: 40.4122994,
		lng: -111.75418
	},
	draggableCursor: 'crosshair',
	zoom:            14,
	mapTypeId:       google.maps.MapTypeId.HYBRID,

	streetViewControl:  false,
	panControl:         true,
	zoomControl:        true,
	mapTypeControl:     true,
	scaleControl:       true,
	overviewMapControl: true
}

var markerOptions = {
	animation: google.maps.Animation.DROP,
	draggable: true,
	position:  cityCenter,
	title:     'Issue location'
}

var geocoder = new google.maps.Geocoder();

var Map = React.createClass({
	mixins: [mapMixin],

	getInitialState: function () {
		return {
			latLng: undefined,
			map:    undefined,
			requests: []
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
			map:    map,
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
		geocoder.geocode({latLng: event.latLng}, this.props.onGeocode);
		this.props.markValid();
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
		api.getRequests({
			status: 'open'
		}, this.loadRequests);
		api.getServices(function gotServices(services) {
            this.setState({
                services: services
            });
        }, this);
	},

	renderInfoWindow: function (request) {
		var imageStyle = styles.hiddenIf((typeof request.media_url === 'undefined' || !request.media_url));

		imageStyle = styles.mix(imageStyle, {
			maxWidth:     150,
			maxHeight:    150,
			marginBottom: 10
		});

		var content = (
			<div>
				<label>Category: {request.service_name}</label>
				<p>open</p>
				<img style={imageStyle} src={typeof request.media_url !== 'undefined'? request.media_url : ''}></img>
				<p>{request.address_string}</p>
			</div>
		);

		return React.renderToStaticMarkup(content);
	},

	render: function () {

		var style = {
			width:     '100%',
			minHeight: 500
		}

		return (
			<div onBlur={this.props.onBlur} style={style} className='map-canvas'></div>
		)
	}

});

module.exports = Map;