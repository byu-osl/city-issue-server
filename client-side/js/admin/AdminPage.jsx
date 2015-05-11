'use strict';
var React        = require('react');
var AdminNav     = require('./AdminNav.jsx');
var Router       = require('react-router');
var Link         = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;
var api          = require('../server-api.js');

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
                <RouteHandler services={this.state.services}></RouteHandler>
        	</div>
        );
    }
});

module.exports = AdminPage;