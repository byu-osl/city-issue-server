'use strict';

var ServerAPI = require('../server-api');
var _ = require('../_');
var serverAPI = new ServerAPI();
var LocationSection = require('./LocationSection');
var CategorySection = require('./CategorySection');
var DescriptionSection = require('./DescriptionSection');
 
var RequestForm = React.createClass({
    submitForm: function (event) {
        event.preventDefault()

        if (!this.validateForm()) {
            return;
        }
 
        var long; 
        var lat;

        var location    = this.refs.location.getLocation();

        if (this.refs.location.usedDetection) {
            long = this.refs.location.getLong();
            lat  = this.refs.location.getLat();
        }

        serverAPI.postRequest({
            address_string: this.refs.location.usedDetection ? '' : location,
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

        _.forEach(this.refs, function(ref){
            debugger;
            if (ref.isValid === false) {
                passing = false;
                ref.markInvalid();
            }
        });

        return true;
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
                    <input type='submit' className='btn btn-fault'></input>
                </form>
            </div>
        );
    }
});

module.exports = RequestForm;