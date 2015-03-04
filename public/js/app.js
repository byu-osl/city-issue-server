'use strict';

var api = new serverAPI();

var RequestForm = React.createClass({

    submitForm: function (event) {
        event.preventDefault();

        var long;
        var lat;

        var description = this.refs.description.getDescription();
        var location = this.refs.location.getLocation();

        if (this.refs.location.usedDetection) {
            long = this.refs.location.getLong();
            lat  = this.refs.location.getLat();
        }

        api.postRequest({
            lat:lat,
            long:long
        }, function (data){
            console.log('Saved!');
            console.log(data);
        });
    },

    render: function () {return (
        <div>
            <div className="row">
                <h1>Submit an issue</h1>
            </div>
            <form className='request-form' onSubmit={this.submitForm}>
                <LocationSection ref='location'/>
                <DescriptionSection ref='description'/>
                <CategorySection ref='category'/>
                <input type='submit' className='btn btn-fault'>Submit</input>
            </form>
        </div>
    )}
});

var LocationSection = React.createClass({
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

var DescriptionSection = React.createClass({
    getDescription: function (){return this.state.description },

    getInitialState: function () {
        return {
              description: ''
        };
    },

    handleChange: function (){
        this.setState({description:event.target.value})
    },

    render: function() {return(
        <div className='form-group'>
            <label>Description</label>
            <button className='btn btn-default btn-xs location-button'>
                <span className='glyphicon glyphicon-camera'/>
                take a picture
            </button>
            <textarea 
                name='description' 
                className='form-control' 
                value={this.state.description} 
                onChange={this.handleChange}
                placeholder='Additional location details, severity, etc.'></textarea>
        </div>
    )}
});

var CategorySection = React.createClass({
    loadCategories: function (data) {
        console.log('Loaded categories: ')
        console.log(data)
    },

    componentDidMount: function () {
        api.getCategories(this.loadCategories);
    },

    render: function() {return(
        <div className='form-group'>
            <label>Category</label>
            <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">
                    other
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu">
                    <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Action</a></li>
                    <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Another action</a></li>
                    <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Something else here</a></li>
                    <li role="presentation" className="divider"></li>
                    <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Separated link</a></li>
                </ul>
            </div>
        </div>
    )}
});

React.render(<RequestForm />, $('.app-container')[0]);

///////////////////////////////
