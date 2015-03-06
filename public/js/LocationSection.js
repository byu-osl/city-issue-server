// LocationSection of the form
module.exports = React.createClass({
    getInitialState: function () {
        return {
            location: '',
            usedDetection: false
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
        this.setState({location:output});
        this.setState({
            lat:lat, 
            long:long, 
            location: output,
            usedDetection: true
        });
    },

    handleLocationClick: function (event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(this.setLocation, null, {enableHighAccuracy:true});
    },

    handleChange: function (event) {
        this.setState({location:event.target.value});
    },

    render: function() {return(
        <div className='form-group'>
            <div>
                <label>Location</label>
                <button className='btn btn-default btn-xs location-button' onClick={this.handleLocationClick}>
                    <span className='glyphicon glyphicon-map-marker'/>
                    detect my location
                </button>
            </div>
            <input name='location' className='form-control' type='text' value={this.state.location} onChange={this.handleChange}/>
        </div>
    )}
});