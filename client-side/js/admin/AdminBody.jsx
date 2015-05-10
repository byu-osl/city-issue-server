'use strict';
var React     = require('react');
var api       = require('../server-api.js');
var Reactable = require('reactable');
var Router    = require('react-router');
var Table     = Reactable.Table
var unsafe    = Reactable.unsafe
var mapMixin   = require('../mixins/mapMixin.js');
var AdminMap  = require('./AdminMap.jsx');


var AdminBody = React.createClass({
	mixins: [Router.State],

	getInitialState: function () {
		return {
			requests: [],
			services: [],
			users:    [],
			serviceMetadata: undefined,
		}
	},

	componentDidMount: function () {
		api.getRequests(function(requests){
			this.setState({
				requests: requests.map(transformRequest)
			});

			this.refs.map.loadRequests(requests);
		}, this);

		api.getUsers(function(users){
			this.setState({
				users: users.map(transformUser)
			});
		}, this);

		
	},

	// TODO: this is weird. call what we need from the parent
	//       shouldn't set the state so often
	componentWillReceiveProps: function (newProps) {
		if (isUndefined(this.state.serviceMetadata)) {
			api.getServiceMetadata(function(data){
				this.setState({
					serviceMetadata: data
				});
				this.forceUpdate();
				this.setState({
					services: newProps.services.map(this.transformService, this)
				});
			}, this);
		} else {
			this.setState({
				services: newProps.services.map(this.transformService, this)
			});
		}
	},

	transformService: function (service) {
		var newService = {};
		var metaData = this.state.serviceMetadata[service.service_name]
		var src = mapMixin.getImageType(service.service_name);
		newService[' '] = unsafe('<img style="height:20px" src="'+src+'"/>');
		newService.Name   = service.service_name;
		newService.Open   = metaData.openCount;
		newService.Closed = metaData.closedCount;
		newService.Total  = metaData.total;
		return newService;
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
        	<div className='col-xs-10' style={{paddingRight:0}}>
        		<AdminMap ref='map' requests={this.state.requests} />
        		<label style={labelStyle}>Search</label>
        		<Table 
        		filterable   = {['Date Submitted','Location', 'Status']} 
        		sortable     = {true} 
        		className    = 'table-responsive table-hover table' 
        		data         = {activeData}
        		itemsPerPage = {10}
        		/>
        	</div>
        );
    },
});

// TODO: perf issue?
function transformRequest (request) {
	var newRequest = {};
	newRequest.Image             = unsafe('<img style="max-width: 40px" src="'+request.media_url+'"/>');
	newRequest['Date Submitted'] = new Date(request.requested_datetime).toDateString().substring(4)
	newRequest.Status            = request.status;
	newRequest.Description       = request.description;
	newRequest.Location          = request.address_string;

	return newRequest;
}

function transformUser (user) {
	return user;
}

module.exports = AdminBody;