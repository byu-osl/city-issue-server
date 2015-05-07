'use strict';

var React        = require('react');
var Router       = require('react-router');
var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Redirect     = Router.Redirect;
var RouteHandler = Router.RouteHandler;
var Link         = Router.Link;
var RequestForm  = require('./request-form/RequestForm.jsx');
var AdminPage    = require('./admin/AdminPage.jsx');
var HomePage     = require('./HomePage.jsx');
var serverAPI    = require('./server-api.js');
var styles       = require('./styles.js');
React.getDOMNode = React.findDOMNode;
React.initializeTouchEvents(true);


var App = React.createClass({
render: function() {
return (
	<div>
	    <div className="navbar navbar-default" role="navigation">
	        <div className="container">
	            <div className="navbar-header">
	                <button 
	                type="button" 
	                className="navbar-toggle collapsed" 
	                data-toggle="collapse" 
	                data-target="#navbar" 
	                aria-expanded="false" 
	                aria-controls="navbar">
	                    <span className="sr-only">Toggle navigation</span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                </button>
	                <a className="navbar-brand" href="#">Cedar Hills Issue Tracker</a>
	            </div> 
	            <div id="navbar" className="navbar-collapse collapse">
	                <ul className="nav navbar-nav">
	                	<li>
	                    	<Link activeStyle={styles.bold} to="/">Home</Link>
	                	</li>
	                    <li>
	                    	<Link activeStyle={styles.bold} to="issue-submission">Submit an Issue</Link>
	                    </li>
	                    <li>
	                    	<Link activeStyle={styles.bold} to="/admin/requests">Admin</Link>
	                    </li>
	                </ul>
	            </div>
	        </div>
	    </div>
	    <RouteHandler />
	</div>
	)
}
});

var routes = (
	<Route handler={App}>
		<Route name='/' 				 handler={HomePage}/>
		<Route name='issue-submission'   handler={RequestForm}/>
		<Route name='admin' 		     handler={AdminPage}>
			<Route name='requests'></Route>
			<Route name='services'></Route>
			<Route name='users'></Route>
		</Route>
	</Route>
);

Router.run(routes, Router.HashLocation, function (Root) {
	React.render(<Root />, $('.app-container')[0]);
});