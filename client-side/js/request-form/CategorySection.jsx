'use strict';
var React            = require('react');
var api              = require('server-api');
var SegmentedControl = require('SegmentedControl.jsx');
var _                = require('_');

var CategorySection = React.createClass({

    getInitialState: function () {
        return {
            services: [],
        };
    },

    getSelectedService:     function() {return this.refs.category.getSelectedItem()},
    getSelectedServiceName: function() {
        var id = this.refs.category.getSelectedItem();
        return _.findWhere(this.state.services, {service_code:id}).service_name;
    },

    validate: function() {
        return this.refs.category.validate();
    },

    componentDidMount: function () {
        api.getServices((services) => {
            this.setState({
                services: services
            });
        });
    },
 
    render: function() {
        return (
            <SegmentedControl
            errorMessage='Please choose a category'
            label='Issue type:'
            data={this.state.services}
            id='service_code'
            buttonLabel='service_name'
            required={true}
            ref='category'/>
        );
    }
});

module.exports = CategorySection;