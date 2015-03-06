'use strict';

var api = require('./server-api');
var LocationSection = require('./LocationSection');
var CategorySection = require('./CategorySection');
 
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
                <input type='submit' className='btn btn-fault'></input>
            </form>
        </div>
    )}
});

var DescriptionSection = React.createClass({
    getDescription: function (){return this.state.description},

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

var Category = React.createClass({
    render: function(){return(
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">{this.props.name}</a></li>
    )}
})

React.render(<RequestForm />, $('.app-container')[0]);

///////////////////////////////
