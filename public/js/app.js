'use strict';

var api = require('./server-api');
api = new api();
var LocationSection = require('./LocationSection');
var CategorySection = require('./CategorySection');
var DescriptionSection = require('./DescriptionSection');
 
var RequestForm = React.createClass({
    submitForm: function (event) {
        event.preventDefault();
 
        var long;
        var lat;

        var description = this.refs.description.getDescription();
        var location = this.refs.location.getLocation();
        var category = this.refs.category.getSelectedCategory();

        if (this.refs.location.usedDetection) {
            long = this.refs.location.getLong();
            lat  = this.refs.location.getLat();
        }

        api.postRequest({
            lat:lat,
            long:long,
            service_code: category
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

var Category = React.createClass({
    render: function(){return(
        <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">{this.props.name}</a></li>
    )}
})

React.render(<RequestForm />, $('.app-container')[0]);