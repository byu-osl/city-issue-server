'use strict';

var serverAPI = require('../server-api');
var _ = require('../_');
var LocationSection = require('./LocationSection.jsx');
var CategorySection = require('./CategorySection.jsx');
var DescriptionSection = require('./DescriptionSection.jsx');
var ContactInfo = require('./ContactInfo.jsx');
var styles = require('../styles');
 
var RequestForm = React.createClass({

    submitForm: function (event) {
        event.preventDefault()
        var long; 
        var lat;
        var email = this.refs.contactInfo.getEmail();
        var password =  this.refs.contactInfo.getPassword();
        var name = this.refs.contactInfo.getName();

        if (!this.validateForm()) {
            return;
        }

        var location = this.refs.location.getLocation();

        if (this.refs.location.usedDetection()) {
            long = this.refs.location.getLong();
            lat  = this.refs.location.getLat();
        }

        serverAPI.postRequest({
            address_string: this.refs.location.usedDetection ? '' : location,
            email: email,
            phoneNumber: this.refs.contactInfo.getPhoneNumber(),
            name: name,
            description: this.refs.description.getDescription(),
            lat:lat,
            long:long,
            media_url: this.refs.description.getImage(),
            service_code: this.refs.category.getSelectedCategory()
        }, function (data){
            console.log('Saved!');
            console.log(data);
        });

        if (this.refs.contactInfo.getPassword()) {
            serverAPI.registerUser({
                email: email,
                password: password,
                name: name
            }, function (data) {
                localStorage['issueTrackerToken'] = data.token;
            });
        }
    },

    validateForm: function() {
        var passing = true;

        _.forEach(this.refs, function (ref) {
            if (typeof ref.validate !== 'undefined') {
                passing = passing && ref.validate();
            }
        });

        return passing;
    },

    render: function () {
        return (
            <div>
                <div className='row'>
                    <h1>Submit an issue</h1>
                </div>
                <form className='request-form col-md-6' onSubmit={this.submitForm}>
                    <LocationSection    ref='location'/>
                    <DescriptionSection ref='description'/>
                    <CategorySection    ref='category'/>
                    <ContactInfo        ref='contactInfo'/>
                    <input type='submit' className='btn btn-fault'></input>
                </form>
            </div>
        );
    }
});

module.exports = RequestForm;