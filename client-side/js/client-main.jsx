'use strict';

var React           = require('react');
var Router          = require('react-router');
var Route           = Router.Route;
var DefaultRoute    = Router.DefaultRoute;
var Redirect        = Router.Redirect;
var RouteHandler    = Router.RouteHandler;
var Link            = Router.Link;
var RequestForm     = require('./request-form/RequestForm.jsx');
var AdminPage       = require('./admin/AdminPage.jsx');
var RequestPage     = require('./RequestPage.jsx');
var HomePage        = require('./HomePage.jsx');
var serverAPI       = require('./server-api.js');
var styles          = require('./styles.js');
var Requests        = require('./admin/Requests.jsx');
var Services        = require('./admin/Services.jsx');
var Users           = require('./admin/Users.jsx');
React.getDOMNode    = React.findDOMNode;
React.initializeTouchEvents(true);
window.isUndefined = function (thing) {return typeof thing === 'undefined'}

var App = React.createClass({


render: function() {
return (
	<div >
	    <div className="navbar navbar-default" role="navigation">
	        <div className="container" style={{paddingLeft:10}}>
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
	    <div style={{padding:10}}>
	    	<RouteHandler />
	    </div>
	</div>
	)
}
});

// TODO: close menu on transition change

var routes = (
	<Route handler={App}>
		<Route name='/' 			   handler={HomePage}/>
		<Route name='issue-submission' handler={RequestForm}/>
		<Route name='admin' 		   handler={AdminPage}>
			<Route name='requests' handler={Requests}></Route>
			<Route name='services' handler={Services}></Route>
			<Route name='users'    handler={Users}></Route>
		</Route>
		<Route name='requests/:id' handler={RequestPage}></Route>
	</Route>
);

Router.run(routes, Router.HashLocation, function (Root) {
	React.render(<Root />, $('.app-container')[0]);
});

////////

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
