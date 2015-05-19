'use strict';
var React           = require('react');
var api             = require('server-api.js');
var Table           = require('Table.jsx');
var AdminMap        = require('./AdminMap.jsx');
var Router          = require('react-router');
var NavigationMixin = Router.Navigation
var _               = require('_');
var {formatDate}    = require('utils');
var Reactable		= require('reactable');
var {unsafe}        = Reactable;


var Requests = React.createClass({
	mixins: [NavigationMixin],

	getInitialState: function () {
		return {
			requests: [],
			filters: {}
		}
	},

	componentDidMount: function () {
		api.getRequests((requests) => {
			this.setState({
				requests: requests,
			});

			this.refs.map.loadRequests(requests, {status:'open'});
		});

		$(window).on('requests:filterChanged', this.setFilter)
	},

	setFilter: function (event, filters) {
		this.setState({
			filters: filters
		});
	},

	rowClicked: function (id, event) {
		this.transitionTo('/requests/' + id);
	},

    render: function() {
		var labelStyle = {
			position: 'relative',
			top: 8,
			left: 7,
		};

		var rows = this.filterRows();

        return (
        	<div className='col-sm-10' style={{paddingRight:0}}>
	        	<h2>Requests</h2>
        		<AdminMap ref='map'/>
        		<label style={labelStyle}>Search <span className='small'>by category, date, status, description, or location</span></label>
        		<Table
        		filterBy={['Category', 'Description', 'Date Submitted','Location', 'Status']}
        		sortOptions={[
					'Category',
					{column: 'Date Submitted', sortFunction: Reactable.Sort.Date},
					'Status', 
				]}
        		defaultSort={{
					column: 'Date Submitted',
					direction: 'desc'
				}}
				transform={this.transformRequest}
				onRowClick={this.rowClicked}
				data={rows}
				editableColumns={['Category','Date Submitted', 'Status', 'Description', 'Location']}/>
        	</div>
        );
    },

    filterRows: function () {
    	var filters = this.state.filters;

    	return this.state.requests.filter((request) => {
    		var allGood = true;

    		_.keys(filters).forEach((filter) => {
    			if (!_.contains(filters[filter], request[filter])) {
    				allGood = false
    			} 
    		});

    		return allGood;
    	});
	},

	transformRequest: function (request) {
		var newRequest = {};
		newRequest.Image             = unsafe('<img style="max-width: 40px" src="'+request.media_url+'"/>');
		newRequest.Category          = request.service_name;
		newRequest['Date Submitted'] = formatDate(new Date(request.requested_datetime))
		newRequest.Status            = request.status;
		newRequest.Description       = request.description;
		newRequest.Location          = request.address_string;
		newRequest._id               = request._id;
		return newRequest;
	},

});

module.exports = Requests;