'use strict';
var React  = require('react');
var api = require('../server-api');
var _ = require('../_');
var LocationSection = require('./LocationSection.jsx');
var CategorySection = require('./CategorySection.jsx');
var DescriptionSection = require('./DescriptionSection.jsx');
var ContactInfo = require('./ContactInfo.jsx');
var styles = require('../styles');
var loggedOutUser = {
    user: {
        loggedIn: false
    }
}
 
var RequestForm = React.createClass({

    getInitialState: function () {
        return loggedOutUser;
    },

    componentWillMount: function authenticate() {
        var token = localStorage.getItem('issueTrackerToken');
        if (!token) {
            this.setState(loggedOutUser);
        } else {
            api.authenticate(token, function (data) {
                var user = this.state.user;
                if (data.authenticated === false) {
                    this.setState(loggedOutUser);
                } else {
                    console.log('Authenticated.');
                    _.assign(user, data);
                    user.loggedIn = true;
                    this.setState({user:user});
                }
            }, this);
        }
    },

    submitForm: function (event) {
        event.preventDefault()
        var long; 
        var lat;
        var email         = this.refs.contactInfo.getEmail();
        var password      = this.refs.contactInfo.getPassword();
        var name          = this.refs.contactInfo.getName();
        var contactMethod = this.refs.contactInfo.getContactMethod();
        var phoneNumber   = this.refs.contactInfo.getPhoneNumber();

        if (!this.validateForm()) {
            return;
        }

        var location = this.refs.location.getLocation();

        long = this.refs.location.getLong();
        lat  = this.refs.location.getLat();

        api.postRequest({
            address_string: location,
            contact_method: contactMethod,
            description: this.refs.description.getDescription(),
            email: email,
            lat: lat,
            long: long,
            media_url: this.refs.description.getImage(),
            name: name,
            phone_number: phoneNumber,
            service_code: this.refs.category.getSelectedService(),
            service_name: this.refs.category.getSelectedServiceName()
        }, function (data){
            console.log('Saved!');
            console.log(data);
        });

        if (this.refs.contactInfo.getPassword()) {
            api.registerUser({
                email: email,
                contact_method: contactMethod,
                password: password,
                phone_number: phoneNumber,
                name: name
            }, function (data) {
                localStorage.issueTrackerToken = data.token;
            });
        }
    },

    validateForm: function() {
        var passing = true;

        _.forEach(this.refs, function validateFormComponents(ref) {
            if (!isUndefined(ref.validate)) {
                passing = passing && ref.validate();
            }
        });

        return passing;
    },

    render: function () {
        return (
            <div>
                <div className='row'>
                    <h1>Submit an Issue</h1>
                </div>
                <form className='request-form col-md-8' onSubmit={this.submitForm}>
                    <LocationSection    user={this.state.user} ref='location'/>
                    <DescriptionSection user={this.state.user} ref='description'/>
                    <CategorySection    user={this.state.user} ref='category'/>
                    <ContactInfo        user={this.state.user} ref='contactInfo'/>
                    <input type='submit' className='btn btn-fault'></input>
                </form>
            </div>
        );
    }
});

module.exports = RequestForm;