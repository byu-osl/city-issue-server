'use strict';
var React              = require('react');
var api                = require('server-api');
var _                  = require('_');
var LocationSection    = require('./LocationSection');
var CategorySection    = require('./CategorySection');
var DescriptionSection = require('./DescriptionSection');
var ContactInfo        = require('./ContactInfo');
var Router             = require('react-router' );
var NavigationMixin    = Router.Navigation
 
var RequestForm = React.createClass({
    mixins: [NavigationMixin],

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
            description:    this.refs.description.getDescription(),
            email:          email,
            lat:            lat,
            long:           long,
            media_url:      this.refs.description.getImage(),
            name:           name,
            phone_number:   phoneNumber,
            service_code:   this.refs.category.getSelectedService(),
            service_name:   this.refs.category.getSelectedServiceName()
        }, function (data){
            var id = data.service_request_id
            if (password) {
                api.registerUser({
                    email:          email,
                    contact_method: contactMethod,
                    password:       password,
                    phone_number:   phoneNumber,
                    name:           name
                }, function (data) {
                    localStorage.issueTrackerToken = data.token;
                    this.transitionTo('/requests/' + id);
                }.bind(this));
            } else {
                this.transitionTo('/requests/' + id);
                // TODO: this is almost too fast: smooth would be a bit better.
            }
        }.bind(this));
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