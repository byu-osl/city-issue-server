'use strict';
var React        = require('react');
var api          = require('../server-api.js');
var mapMixin     = require('../mixins/mapMixin.js');
var Reactable    = require('reactable');
var Table        = Reactable.Table
var unsafe       = Reactable.unsafe
var ToggleButton = require('../components/ToggleButton.jsx');

var Services = React.createClass({

	getInitialState: function () {
		return {
			services: [],
			addingAService: false
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

	// TODO: dangerously similar to RequestHistoryTable
	toggleAdding: function () {
		var addingAService = !this.state.addingAService;
		this.setState({addingAService: addingAService});
	},

	componentDidMount: function () {
		api.getServices(function gotServices(services) {
            api.getServiceMetadata(function(data){
				this.setState({
					serviceMetadata: data
				});
				this.state.serviceMetadata = data;
				
				this.setState({
					services: services.map(this.transformService, this)
				});
			}, this);
        }, this);
	},

    render: function() {
    	var labelStyle = {
			position: 'relative',
			top: 8,
			left: 7,
		}


        return (
			<div className='col-md-10' style={{paddingRight:0}}>
	        	<h2>Services
		        	<ToggleButton
		        		condition={this.state.addingAService}
		        		actionText='add a service'
		        		onClick={this.toggleAdding}
		        	></ToggleButton
		>	
	        	</h2>
	        	<div className='table-responsive'>
	        		<Table 
	        		sortable     = {true} 
	        		className    = 'table-hover table' 
	        		data         = {this.state.services}
	        		/>
	        	</div>
        	</div>
        );
    }
});

module.exports = Services;