'use strict';
var React           = require('react');
var api             = require('../server-api.js');
var Reactable       = require('reactable');
var Table           = Reactable.Table;
var unsafe          = Reactable.unsafe;
var Row             = Reactable.Tr;
var AdminMap        = require('./AdminMap.jsx');
var Router          = require('react-router');
var Link            = Router.Link;
var NavigationMixin = Router.Navigation
var _               = require('../_.js');


var Requests = React.createClass({
	mixins: [NavigationMixin],

	getInitialState: function () {
		return {
			requests: [],
			filters: {}
		}
	},

	componentDidMount: function () {
		api.getRequests(function(requests){
			this.setState({
				requests: requests,
			});

			this.refs.map.loadRequests(requests, {status:'open'});
		}, this);

		$(window).on('requests:filterChanged', this.setFilter)
	},

	setFilter: function (event, filters) {
		this.setState({
			filters: filters
		});
	},

	rowClicked: function (event) {
		var id = $(event.target).parent('tr').attr('data-id');
		this.transitionTo('/requests/' + id);
	},

    render: function() {
		var labelStyle = {
			position: 'relative',
			top: 8,
			left: 7,
		};

		var sortOptions = [
			'Category',
			{column: 'Date Submitted', sortFunction: Reactable.Sort.Date},
			'Status', 
		]

		var defaultSort = {
			column: 'Date Submitted',
			direction: 'desc'
		}

		var rows = this.renderRows();

        return (
        	<div className='col-sm-10' style={{paddingRight:0}}>
	        	<h2>Requests</h2>
        		<AdminMap ref='map'/>
        		<label style={labelStyle}>Search <span className='small'>by category, date, status, description, or location</span></label>
        		<div className='table-responsive'>
	        		<Table 
	        		filterable   = {['Category', 'Description', 'Date Submitted','Location', 'Status']} 
	        		sortable     = {sortOptions} 
	        		defaultSort  = {defaultSort}
	        		className    = 'table-hover table' 
	        		itemsPerPage = {1000}
	        		>
	        			{rows}
	        		</Table>
        		</div>
        	</div>
        );
    },

    renderRows: function () {
  		var rowStyle = {
  			cursor: 'pointer'
  		};

    	var filters = this.state.filters;

    	return this.state.requests.filter(function applyFilters (request) {
    		var allGood = true;
    		_.keys(filters).forEach(function (filter){
    			if (!_.contains(filters[filter], request[filter])) {
    				allGood = false
    			} 
    		});
    		return allGood;

    	}, this).map(function formatRequest (request) {

    		request = transformRequest(request);
			return (
		    	<Row data-id={request._id} style={rowStyle} onClick={this.rowClicked} data={request}></Row>
			)
    	}, this);
	}
});

module.exports = Requests;

function transformRequest (request) {
	var newRequest = {};
	newRequest.Image             = unsafe('<img style="max-width: 40px" src="'+request.media_url+'"/>');
	newRequest.Category          = request.service_name;
	newRequest['Date Submitted'] = new Date(request.requested_datetime).toDateString().substring(4)
	newRequest.Status            = request.status;
	newRequest.Description       = request.description;
	newRequest.Location          = request.address_string;
	newRequest._id               = request._id;
	return newRequest;
}