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

login();

function login () {
	var token = localStorage.getItem('token');

	if (!token) {
		window.loggedIn = false;
	} else {
		serverAPI.login(token, function (data) {
			data = JSON.parse(data);
			if (data.loggedIn === true) {
				window.userData = JSON.parse(data);
				window.loggedIn = true;
			} else {
				window.loggedIn = false;
			}
		});
	}

}



