'use strict';
var React  = require('react');
var Link   = require('react-router').Link;
var HomePage = React.createClass({

	render: function () {
		return (
			<div className='container'>
				<h1>City Issue Tracker</h1>
				<p>Welcome to the Cedar Hills City Issue Tracker.</p>
				<Link className='btn btn-primary btn-lg' to='issue-submission'>Submit an Issue</Link>
			</div>
		)
	},

})

module.exports = HomePage;