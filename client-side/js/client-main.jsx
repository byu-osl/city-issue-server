'use strict';

React.getDOMNode = React.findDOMNode;

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var RequestForm = require('./request-form/RequestForm.jsx');
var AdminPage   = require('./admin/AdminPage.jsx');
var serverAPI   = require('./server-api.js');

var App = React.createClass({
    render: function() {
        return <RouteHandler/>
    }
});

var routes = (
	<Route handler={RequestForm}>
		<Route path='/'     handler={RequestForm} />
		<Route path='admin' handler={AdminPage}   />
	</Route>
);

Router.run(routes, Router.HashLocation, function (Root) {
	React.render(<Root />, $('.app-container')[0]);
});

authenticate();

function authenticate () {
	var token = localStorage.getItem('issueTrackerToken');

	if (!token) {
		window.loggedIn = false;
	} else {
		serverAPI.authenticate(token, function (data) {
			if (data.authenticated === false) {
				window.loggedIn = false;
			} else {
				console.log('Authenticated.');
				window.userData = data;
				window.loggedIn = true;
			}
		});
	}

}



