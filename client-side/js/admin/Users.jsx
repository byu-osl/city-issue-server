'use strict';
var React  = require('react');
var api    = require('server-api');

var Users = React.createClass({
	getInitialState: function () {
		return {
			users: []
		}
	},


	componentDidMount: function () {
		api.getUsers((users) => {
			this.setState({
				users: users.map(this.transformUser)
			});
		});
	},

	transformUser: function (user) {
		return user
	},

    render: function() {
        return (

        	<div>
	        	<h2>Users</h2>
        		
        	</div>

        );
    }
});

module.exports = Users;