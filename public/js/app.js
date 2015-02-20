'use strict';

var LocationSection = React.createClass({
    getInitialState: function () {
        return {
            location: ''
        };
    },

    setLocation: function (positionData) {
        var lat = positionData.coords.latitude;
        var long = positionData.coords.longitude;
        var output = 'latitude: ' + lat + ', longitude: ' + long;
        this.setState({location:output});
    },

    handleLocationClick: function (event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(this.setLocation, null, {enableHighAccuracy:true});
    },

    handleChange: function (event) {
        this.setState({location:event.target.value});
    },

    render: function() {return(
        <div>
            <div className="row">
                <label>Location</label>
                <button className='btn btn-default btn-xs location-button' onClick={this.handleLocationClick}>
                    <span className='glyphicon glyphicon-map-marker glyphicon-align-left'/>
                    detect my location
                </button>
            </div>
            <input className='form-control' type='text' value={this.state.location} onChange={this.handleChange}/>
        </div>
    )}
});

var RequestForm = React.createClass({
    render: function () {return (
        <div>
            <div className="row">
                <h1>Submit an issue</h1>
            </div>
            <form>
               <LocationSection />

            </form>
        </div>
    )}
});



React.render(<RequestForm />, $('.app-container')[0]);
