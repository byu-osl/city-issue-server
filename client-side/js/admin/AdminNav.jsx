'use strict';
var React  = require('react');
var Link = require('react-router').Link;

var AdminNav = React.createClass({


    render: function() {
		var containerStyle = {
			background: 'rgb(243, 243, 225)',
			border: 'solid 1px rgb(231, 231, 231)',
			padding: '10px',
			minHeight: '500px',
		};

        return (

        	<div style={containerStyle} className='col-xs-3'>
        		<ul className='list-unstyled'>
        			<li><Link to='requests'>Requests</Link></li>
        			<li><Link to='services'>Service Types</Link></li>
        			<li><Link to='users'>Users</Link></li>
        		</ul>
        	</div>

        );
    }
});

module.exports = AdminNav;