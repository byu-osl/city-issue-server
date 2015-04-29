'use strict';

var ServerAPI = require('../server-api');
var _ = require('../_');
var serverAPI = new ServerAPI();
var LocationSection = require('./LocationSection');
var CategorySection = require('./CategorySection');
var DescriptionSection = require('./DescriptionSection');
var Email = require('./Email');
var Phone = require('./Phone');
var Name = require('./Name');
 
var RequestForm = React.createClass({
    submitForm: function (event) {
        event.preventDefault()
        var long; 
        var lat;

        if (!this.validateForm()) {
            return;
        }

        var location = this.refs.location.getLocation();

        if (this.refs.location.usedDetection) {
            long = this.refs.location.getLong();
            lat  = this.refs.location.getLat();
        }

        serverAPI.postRequest({
            address_string: this.refs.location.usedDetection ? '' : location,
            email: this.refs.email.getEmail(),
            phone: this.refs.phone.getPhone(),
            first_name: this.refs.name.getFirstName(),
            last_name: this.refs.name.getLastName(),
            description: this.refs.description.getDescription(),
            lat:lat,
            long:long,
            media_url: this.refs.description.getImage(),
            service_code: this.refs.category.getSelectedCategory()
        }, function (data){
            console.log('Saved!');
            console.log(data);
        });
    },

    validateForm: function() {
        var passing = true;

        _.forEach(this.refs, function (ref) {
            passing = passing && ref.validate();
        });

        return passing;
    },

    render: function () {
        return (
            <div>
                <div className='row'>
                    <h1>Submit an issue</h1>
                </div>
                <form className='request-form' onSubmit={this.submitForm}>
                    <LocationSection ref='location'/>
                    <DescriptionSection ref='description'/>
                    <CategorySection ref='category'/>
                    <Email ref='email'/>
                    <Name ref='name'/>
                    <Phone ref='phone'/>
                    <input type='submit' className='btn btn-fault'></input>
                </form>
            </div>
        );
    }
});

module.exports = RequestForm;