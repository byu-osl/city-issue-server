'use strict';
var React          = require('react');
var Router         = require('react-router');
var Link           = Router.Link;
var styles         = require('styles');
var RequestFilters = require('./RequestFilters');

// Navigation on the left hand side on /admin.

var AdminNav = React.createClass({
mixins: [Router.State],

render: function() {
    var requestFiltersStyle = styles.visibleIf(this.isActive('requests'));

	var containerStyle = {
		background: 'rgb(243, 243, 225)',
		border: 'solid 1px rgb(231, 231, 231)',
		padding: 10,
        minHeight: $(window).width() < 500 ? 'auto' : 543,
	};

    return (
    	<div style={containerStyle} className='col-sm-2'>
    		<ul className='list-unstyled'>
    			<li>
                    <Link activeStyle={styles.bold} to='requests'>Requests</Link>
                    <RequestFilters style={requestFiltersStyle}/>
                </li>
    			<li><Link activeStyle={styles.bold} to='services'>Service Types</Link></li>
    			<li><Link activeStyle={styles.bold} to='users'>Users</Link></li>
    		</ul>
    	</div>
    );
}
});

module.exports = AdminNav;

