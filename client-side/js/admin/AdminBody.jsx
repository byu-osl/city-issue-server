'use strict';
var React     = require('react');
var api       = require('../server-api.js');
var Reactable = require('reactable');
var Router    = require('react-router');
var Table     = Reactable.Table
var unsafe    = Reactable.unsafe


var AdminBody = React.createClass({
	mixins: [Router.State],

	getInitialState: function () {
		return {
			requests: [],
			services: [],
			users:    [],
		}
	},

	componentDidMount: function () {
		api.getRequests(function(requests){
			this.setState({
				requests: requests.map(transformRequest)
			});
		}, this);

		api.getUsers(function(users){
			this.setState({
				users: users.map(transformUser)
			});
		}, this);
	},

	componentWillReceiveProps: function (newProps) {
		this.setState({services:newProps.services});
	},

	getSortingOptions: function () {
		
	},

    render: function() {
    	var activeData;
    	['requests','services','users'].forEach(function(navItem){
			if (this.isActive(navItem)) {
				activeData = this.state[navItem];
			}
		}, this);

    	var labelStyle = {
			position: 'relative',
			top: 8,
			left: 7,
		}


        return (
        	<div className='col-xs-10'>
        		<label style={labelStyle}>Search</label>
        		<Table 
        		filterable={['Date Submitted','Location', 'Status']} 
        		sortable={true} 
        		className='table-responsive table-hover table' 
        		data={activeData}
        		itemsPerPage={10}
        		/>
        	</div>
        );
    },
});

// TODO: perf issue?
function transformRequest (request) {
	var newRequest = {};
	newRequest.Image = unsafe('<img style="max-width: 40px" src="'+request.media_url+'"/>');
	newRequest['Date Submitted'] = new Date(request.requested_datetime).toDateString().substring(4)
	newRequest.Status = request.status;
	newRequest.Description = request.description;
	newRequest.Location = request.address_string;

	return newRequest;
}

function transformService (service) {
	return service;
}

function transformUser (user) {
	return user;
}

module.exports = AdminBody;