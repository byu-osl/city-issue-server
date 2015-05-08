'use strict';
var React  = require('react');
var mapMixin = require('../mixins/mapMixin.js');
var Marker = google.maps.Marker;
var cityCenter = new google.maps.LatLng(40.4122994, -111.75418)
var styles     = require('../styles.js');

var mapOptions = {
	center: {
		lat: 40.4122994,
		lng: -111.75418
	},
	zoom:            14,
	mapTypeId:       google.maps.MapTypeId.HYBRID
}

var geocoder = new google.maps.Geocoder();

var AdminMap = React.createClass({
	mixins: [mapMixin],

	getInitialState: function () {
		return {
			map: undefined,
			requests: []
		}
	},

	initializeMap: function () {
		var map = new google.maps.Map($('.map-canvas')[0], mapOptions);
		google.maps.event.addListener(map, 'click', this.mapClicked);
		
		this.setState({
			map: map,
		});
	},

	renderInfoWindow: function (request) {
		var imageStyle = styles.hiddenIf((typeof request.media_url === 'undefined' || !request.media_url));

		imageStyle = styles.mix(imageStyle, {
			maxWidth:     200,
			maxHeight:    200,
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