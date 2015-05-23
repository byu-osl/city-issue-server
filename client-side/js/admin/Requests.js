'use strict';
var React           = require('react');
var api             = require('server-api.js');
var EditableTable   = require('EditableTable');
var AdminMap        = require('./AdminMap');
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

	rowClicked: function (id) {
		this.transitionTo('/requests/' + id);
	},

	rowSaved: function (updatedValues) {
		api.updateRequest(updatedValues, () => {

		});
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
    		<EditableTable
				data        = {rows}
				transform   = {this.transformRequest}
				onRowClick  = {this.rowClicked}
				onRowSave   = {this.rowSaved}
	    		filterBy    = {['Category', 'Description', 'Date Submitted','Location', 'Status', 'Priority']}
	    		sortOptions = {[
					'Category',
					{column: 'Date Submitted', sortFunction: Reactable.Sort.Date},
					'Status', 
					{column: 'Priority', sortFunction: function (a, b){
						if (a === 'high'   && b ==='medium' ||
							a === 'high'   && b ==='low'    ||
							a === 'medium' && b ==='low') {
							return 1
						} else {
							return -1
						}
					}}
				]}
	    		defaultSort ={{
					column: 'Date Submitted',
					direction: 'desc'
				}}
				editableColumns={['Category', 'Status', 'Description', 'Location', 'Priority']}
				editableColumnKeys={['service_name', 'status', 'description', 'address_string', 'priority']}
			></EditableTable>
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

	// Line order is important: this determines the order of the columns.
	transformRequest: function (request) {
		var newRequest = {};
		newRequest.Image             = unsafe('<img style="max-width: 40px" src="'+request.media_url+'"/>');
		newRequest.Priority          = request.priority;
		newRequest.Category          = request.service_name;
		newRequest['Date Submitted'] = formatDate(new Date(request.requested_datetime))
		newRequest.Status            = request.status;
		newRequest.Description       = request.description;
		newRequest.Location          = request.address_string;
		newRequest._id               = request._id;
		return newRequest;
	}

});

module.exports = Requests;