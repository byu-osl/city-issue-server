'use strict';

var React  = require('react');
var Router = require('react-router');
var Link   = Router.Link;
var styles = require('styles');

var Navbar = React.createClass({

    render: function() {
        return (
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
        );
    }
});

module.exports = Navbar;