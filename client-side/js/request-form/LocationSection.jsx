'use strict';
var React         = require('react');
var styles        = require('styles');
var Input         = require('Input.jsx');
var SubmissionMap = require('./SubmissionMap.jsx');
var IconButton    = require('IconButton.jsx');

module.exports = React.createClass({

    validate: function() {
        var isValid = (this.getLocation() > 0  || this.getLat());
        this.setState({isValid:isValid});
        return isValid;
    },

    getInitialState: function () {
        return {
            loading: false,
            isValid: undefined
        };
    },

    getLocation:   function () {return this.refs.location.value()},
    getLat:        function () {return this.refs.map.getLatLng().lat()},
    getLong:       function () {return this.refs.map.getLatLng().lng()},

    setLocation: function (positionData) {
        var lat = positionData.coords.latitude;
        var lng = positionData.coords.longitude;

        this.refs.map.setMarkerPosition(lat, lng);

        this.setState({
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
            // report that they don't have geolocation available
        }
    },

    onGeocode: function (results) {
        if (!isUndefined(this.state.isValid)) {
            this.validate();
        }

        this.refs.location.value(results[0].formatted_address);
    },

    markValid: function () {
        this.setState({isValid:true});
    },

    render: function () {
        var validationState = '';
        var errorStyle = styles.hidden;

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
                    <div style={{marginBottom:5}}>
                        <p style={errorStyle} className='bg-warning'>Please choose a location.</p>
                        <label className='control-label'>Location</label>
                        <IconButton
                            icon='map-marker'
                            iconStyle={{color: 'rgb(207, 99, 99)'}}
                            loading={this.state.loading}
                            label='go to my location'
                            onClick={this.handleLocationClick}
                        ></IconButton>
                    </div>
                    <SubmissionMap markValid={this.markValid} onBlur={this.validate} onGeocode={this.onGeocode} ref='map'/>
                    <Input 
                    ref='location'
                    placeholder='You can use "go to my location" to guess your address.'
                    label='Address'
                    onBlur={this.validate}></Input>
                </div>
            </div>
        );
    }
});