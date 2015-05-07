'use strict';

var React  = require('react');
var styles = require('../styles');
var mixins = require('../mixins');

var Map = require('./Map.jsx');

// LocationSection of the form
module.exports = React.createClass({

    validate: function() {
        var isValid = (this.state.location.length > 0 || this.state.usedDetection || this.state.lat);
        this.setState({isValid:isValid});
        return isValid;
    },

    getInitialState: function () {
        return {
            lat: null,
            long: null,
            location: '',
            loading: false,
            usedDetection: false,
            isValid: undefined
        };
    },

    getLocation:   function () {return this.state.location},
    getLat:        function () {return this.refs.map.getLatLng().lat()},
    getLong:       function () {return this.refs.map.getLatLng().lng()},
    usedDetection: function () {return this.state.usedDetection},

    setLocation: function (positionData) {
        var lat = positionData.coords.latitude;
        var long = positionData.coords.longitude;

        this.refs.map.setCenter(lat, long);

        this.setState({
            lat:lat, 
            long:long, 
            usedDetection: true,
            isValid: true,
            loading: false
        });
    },

    handleLocationClick: function (event) {
        this.setState({loading: true});
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation, null, {enableHighAccuracy:true});
        } else {
            // report that they don't have 
        }
    },

    onGeocode: function (results, status) {
        if (typeof this.state.isValid !== 'undefined') {
            this.validate();
        }

        this.setState({
            location:results[0].formatted_address,
            usedDetection: false
        });
    },

    markValid: function () {
        this.setState({isValid:true});
    },

    handleChange: function (event) {
        if (typeof this.state.isValid !== 'undefined') {
            this.validate();
        }

        this.setState({
            location:event.target.value,
            usedDetection: false
        });
    },

    render: function () {
        var validationState = '';
        var errorStyle = styles.hidden;
        var autofocus;
        var buttonStyle = {
          marginLeft: 10
        }

        var markerStyle = {
            color: 'rgb(207, 99, 99)',
            display: this.state.loading ? 'none' : 'inherit'
        }

        var loadingStyle = {
            border: 'none',
            display: this.state.loading ? 'inherit' : 'none',
            top: -5,
            position: 'relative',
            paddingRight: 2,
            height: 9,
            marginRight: 5
        }

        if (this.state.isValid === false) {
            validationState += ' has-error';
            errorStyle = styles.visible;
        }

        if (this.state.isValid === true) {
            validationState += ' has-success';
         }

        return (
            <div className="row">
                <div className={'form-group' + validationState}>
                    <div>
                        <p style={errorStyle} className='bg-warning'>Please choose a location.</p>
                        <label className='control-label'>Location</label>
                        <button 
                            style={buttonStyle}
                            className='btn btn-default btn-xs location-button' 
                            onClick={this.handleLocationClick}>
                            <span  style={markerStyle} className='glyphicon glyphicon-map-marker'/>
                            <img style={loadingStyle} src='../../images/location-loader.gif'/>
                            go to my location
                        </button>
                    </div>
                    <Map markValid={this.markValid} onBlur={this.validate} onGeocode={this.onGeocode} ref='map'/>
                    <input 
                        style={{marginTop: 5}}
                        onChange={this.handleChange}
                        onBlur={this.validate}
                        tabIndex='1'
                        ref='input' 
                        className='form-control' 
                        name='location' 
                        type='text' 
                        value={this.state.location} 
                        placeholder='Address: use "go to my location" to detect'
                    />
                </div>
            </div>
        );
    }
});