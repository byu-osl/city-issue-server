'use strict';
var React      = require('react');
var mapMixin   = require('../mixins/mapMixin.js');
var styles     = require('styles');
var _          = require('_');

var mapOptions = {
	center: {
		lat: 40.4122994,
		lng: -111.75418
	},
	zoom:      14,
	mapTypeId: google.maps.MapTypeId.HYBRID
}

var AdminMap = React.createClass({
	mixins: [mapMixin],

	getInitialState: function () {
		return {
			map: undefined,
			requests: [],
			markers:  []
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

	setFilter: function (event, options) {
		options = this.setDefaults(options);

		this.state.markers.forEach(marker => {
			this.filterMarker(marker, options)
		}, this);
	},

	componentDidMount: function () {
		$(document).ready(() => {this.initializeMap()});

		// Emitted by RequestFilters.jsx
		$(window).on('requests:filterChanged', this.setFilter)
	},

	render: function () {
		var style = {
			width: '100%',
			height: $(window).width() < 500 ? 300 : 500,
			maxHeight: $(window).height() / 1.5
		}

		return (
			<div onBlur={this.props.onBlur} style={style} className='map-canvas'></div>
		)
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
	}
});

module.exports = AdminMap;