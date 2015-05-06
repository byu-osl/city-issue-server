'use strict';
var React  = require('react');
var AdminNav = require('./AdminNav.jsx');
var Link = require('react-router').Link;

var AdminPage = React.createClass({

    render: function() {
        return (

        	<div className='container'>
        		<AdminNav></AdminNav>
        	</div>

        );
    }
});

module.exports = AdminPage;