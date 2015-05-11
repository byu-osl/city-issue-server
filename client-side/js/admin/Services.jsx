'use strict';
var React     = require('react');
var api       = require('../server-api.js');
var mapMixin  = require('../mixins/mapMixin.js');
var Reactable = require('reactable');
var Table     = Reactable.Table
var unsafe    = Reactable.unsafe

var Services = React.createClass({

	getInitialState: function () {
		return {
			services: []
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

    render: function() {
    	var labelStyle = {
			position: 'relative',
			top: 8,
			left: 7,
		}

        return (
			<div className='col-xs-10' style={{paddingRight:0}}>
	        	<h2>Services</h2>
        		<label style={labelStyle}>Search</label>
        		<Table 
        		filterable   = {['Date Submitted','Location', 'Status']} 
        		sortable     = {true} 
        		className    = 'table-responsive table-hover table' 
        		data         = {this.state.services}
        		itemsPerPage = {10}
        		/>
        	</div>
        );
    }
});

module.exports = Services;