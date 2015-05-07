'use strict';
var React  = require('react');
var AdminNav = require('./AdminNav.jsx');
var AdminBody = require('./AdminBody.jsx');
var Link = require('react-router').Link;
var api = require('../server-api.js');

var AdminPage = React.createClass({

	getInitialState: function () {
		return {
			services: []
		}
	},

	componentDidMount: function () {
        api.getServices(function gotServices(services) {
            this.setState({
                services: services
            });
        }, this);
    },

    render: function() {
        return (
        	<div className=''>
        		<AdminNav  services={this.state.services}></AdminNav>
        		<AdminBody services={this.state.services}></AdminBody>
        	</div>
        );
    }
});

module.exports = AdminPage;