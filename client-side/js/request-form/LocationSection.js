'use strict';

// LocationSection of the form
module.exports = React.createClass({

    validate: function() {
        var isValid = this.state.location.length > 0;
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

    getLocation:   function () {return this.state.location; },
    getLat:        function () {return this.state.lat; },
    getLong:       function () {return this.state.long; },
    usedDetection: function () {return this.state.usedDetection; },

    setLocation: function (positionData) {
        var lat = positionData.coords.latitude;
        var long = positionData.coords.longitude;
        var output = 'latitude: ' + lat + ', longitude: ' + long;

        this.setState({
            location:output
        });

        this.setState({
            lat:lat, 
            long:long, 
            location: output,
            usedDetection: true,
            isValid: true
        });
    },

    handleLocationClick: function (event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(this.setLocation, null, {enableHighAccuracy:true});
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
        var buttonStyle = {
          marginLeft: '10px'
        }

        if (this.state.isValid === false) {
            validationState += ' has-error';
        }

        if (this.state.isValid === true) {
            validationState += ' has-success';
         }

        return (
            <div className="row">
                <div className={'form-group col-md-6' + validationState}>
                    <div>
                        <label className='control-label'>Location</label>
                        <button 
                            style={buttonStyle}
                            className='btn btn-default btn-xs location-button' 
                            onClick={this.handleLocationClick}>
                            <span className='glyphicon glyphicon-map-marker'/>
                            detect my location
                        </button>
                    </div>
                    <input 
                        ref='input' 
                        name='location' 
                        className='form-control' 
                        type='text' 
                        value={this.state.location} 
                        onChange={this.handleChange}
                        onBlur={this.validate
                    }/>
                </div>
            </div>
        );
    }
});