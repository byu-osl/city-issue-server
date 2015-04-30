'use strict';

var styles = require('../styles');
var mixins = require('../mixins');

var Map = require('./Map.jsx');

// LocationSection of the form
module.exports = React.createClass({

    validate: function() {
        var isValid = (!!this.getLocation());
        this.setState({isValid:isValid});
        return isValid;
    },

    getInitialState: function () {
        return {
            location: '',
            usedDetection: false,
            isValid: undefined
        };
    },

    getLocation:   function () {return this.refs.map.getLatLng()},
    getLat:        function () {return this.state.lat},
    getLong:       function () {return this.state.long},
    usedDetection: function () {return this.state.usedDetection},

    setLocation: function (positionData) {
        var lat = positionData.coords.latitude;
        var long = positionData.coords.longitude;

        this.refs.map.setCenter(lat, long);

        this.setState({
            lat:lat, 
            long:long, 
            usedDetection: true,
            isValid: true
        });
    },

    handleLocationClick: function (event) {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation, null, {enableHighAccuracy:true});
        } else {
            // report that they don't have 
        }
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
          marginLeft: '10px'
        }

        var markerStyle = {
            color: 'rgb(207, 99, 99)'
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
                        <p style={errorStyle} className='bg-warning'>Please add a location.</p>
                        <label className='control-label'>Location</label>
                        <button 
                            style={buttonStyle}
                            className='btn btn-default btn-xs location-button' 
                            onClick={this.handleLocationClick}>
                            <span  style={markerStyle} className='glyphicon glyphicon-map-marker'/>
                            detect my location
                        </button>
                    </div>
                    <Map ref='map'/>
                </div>
            </div>
        );
    }
});
                    // <input 
                    //     onChange={this.handleChange}
                    //     onBlur={this.validate}
                    //     tabIndex='1'
                    //     ref='input' 
                    //     className='form-control' 
                    //     name='location' 
                    //     type='text' 
                    //     value={this.state.location} 
                    // />