'use strict';
var React  = require('react');
var api       = require('../server-api.js');
var Reactable = require('reactable');
var Table     = Reactable.Table
var unsafe    = Reactable.unsafe
var AdminMap  = require('./AdminMap.jsx');

var Requests = React.createClass({
	getInitialState: function () {
		return {
			requests: [],
		}
	},

	componentDidMount: function () {
		api.getRequests(function(requests){
			this.setState({
				requests: requests.map(transformRequest)
			});

			this.refs.map.loadRequests(requests);
		}, this);
	},

    render: function() {
		var labelStyle = {
			position: 'relative',
			top: 8,
			left: 7,
		}
		;
        return (
        	<div className='col-xs-10' style={{paddingRight:0}}>
	        	<h2>Requests</h2>
        		<AdminMap ref='map' requests={this.state.requests} />
        		<label style={labelStyle}>Search</label>
        		<Table 
        		filterable   = {['Date Submitted','Location', 'Status']} 
        		sortable     = {true} 
        		className    = 'table-responsive table-hover table' 
        		data         = {this.state.requests}
        		itemsPerPage = {10}
        		/>
        	</div>
        );
    }
});

module.exports = Requests;

function transformRequest (request) {
	var newRequest = {};
	newRequest.Image             = unsafe('<img style="max-width: 40px" src="'+request.media_url+'"/>');
	newRequest['Date Submitted'] = new Date(request.requested_datetime).toDateString().substring(4)
	newRequest.Status            = request.status;
	newRequest.Description       = request.description;
	newRequest.Location          = request.address_string;

	return newRequest;
}