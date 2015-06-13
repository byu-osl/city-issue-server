'use strict';

var globals = require('global'); // just runs global.js
var React   = require('react');
var Router  = require('react-router');
var {Route, RouteHandler} = Router;
var Navbar  = require('./Navbar');
var api     = require('server-api');

React.getDOMNode = React.findDOMNode;
React.initializeTouchEvents(true);

var App = React.createClass({
	componentWillMount: function authenticate() {
		window.issueTrackerUser = {};
	    var token = localStorage.getItem('issueTrackerToken');
	    if (!token) {
	    	window.issueTrackerUser = {};
	    } else {
	        api.authenticate(token, function (user) {
	            if (user.authenticated === false) {
			    	window.issueTrackerUser = {};
	            } else {
	                window.issueTrackerUser = user;
	                window.issueTrackerUser.loggedIn = true;
	            }
	        }, this);
	    }
	},

	render: function() {
		return (
			<div>
			    <Navbar></Navbar>
			    <div style={{padding:10}}>
			    	<RouteHandler />
			    </div>
			</div>
		)
	}
});

var routes = (
	<Route handler={App}>
		<Route name='/' handler={require('./HomePage')}/>
		<Route name='issue-submission' handler={require('./request-form/RequestForm')}/>
		<Route name='admin' handler={require('./admin/AdminPage')}>
			<Route name='requests' handler={require('./admin/Requests')}></Route>
			<Route name='services' handler={require('./admin/Services')}></Route>
			<Route name='users'    handler={require('./admin/Users')}></Route>
		</Route>
		<Route name='requests/:id' handler={require('./individual-request/RequestPage')}></Route>
	</Route>
);

Router.run(routes, Router.HashLocation, function (Root) {
	React.render(<Root />, $('.app-container')[0]);
});