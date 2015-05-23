'use strict';
var React        = require('react');
var AdminNav     = require('./AdminNav');
var Router       = require('react-router');
var RouteHandler = Router.RouteHandler;
var api          = require('server-api');

var AdminPage = React.createClass({

	getInitialState: function () {
		return {
			services: []
		}
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
        	<div className=''>
        		<AdminNav  services={this.state.services}></AdminNav>
                <RouteHandler></RouteHandler>
        	</div>
        );
    }
});

module.exports = AdminPage;