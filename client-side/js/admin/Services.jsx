'use strict';
var React        = require('react');
var api          = require('../server-api.js');
var mapMixin     = require('../mixins/mapMixin.js');
var Reactable    = require('reactable');
var Table        = Reactable.Table
var Row          = Reactable.Tr
var unsafe       = Reactable.unsafe
var ToggleButton = require('../components/ToggleButton.jsx');
var Input        = require('../components/Input.jsx');
var styles       = require('../styles.js');
var _            = require('../_.js');
var ImageInput   = require('../components/ImageInput.jsx');

var Services = React.createClass({
	getInitialState: function () {
		return {
			errorType: null,
			services: [],
			addingAService: false,
			serviceMetadata: {}
		}
	},

	transformService: function (service) {
		var newService = {};
		var metaData = this.state.serviceMetadata[service.service_code]
		if (isUndefined(metaData)) {
			metaData = {openCount:0, closedCount: 0, total: 0}
		}
		var src = service.marker_image;
		newService[' '] = unsafe('<img style="height:20px" src="'+src+'"/>');
		newService.Name   = service.service_name;
		newService.Open   = metaData.openCount;
		newService.Closed = metaData.closedCount;
		newService.Total  = metaData.total;
		return <Row key={service.service_code} data={newService}/>;
	},

	// TODO: dangerously similar to RequestHistoryTable
	toggleAdding: function () {
		var addingAService = !this.state.addingAService;
		this.setState({addingAService: addingAService}, function (){
			if (this.state.addingAService){
				this.refs.name.focus();
			}
		});
	},

	componentDidMount: function () {
		api.getServices(function gotServices(services) {
            api.getServiceMetadata(function(data){
				this.setState({
					serviceMetadata: data
				});
				this.state.serviceMetadata = data;
				this.setState({
					services: services
				});
			}, this);
        }, this);
	},

	submitForm: function () {
		this.setState({
			errorType: null
		});

		api.addService({
			service_name: this.refs.name.value(),
			marker_image: this.refs.image.value()
		}, function (newService) {
			this.setState({
				services: [].concat(this.state.services, newService),
				addingAService: false
			});
			this.refs.name.value('');
			this.refs.image.reset();
		}, this);	
	},

    render: function() {
    	var labelStyle = {
			position: 'relative',
			top: 8,
			left: 7,
		}

		var formStyle  = styles.visibleIf(this.state.addingAService);
		var errorStyle = styles.visibleIf(this.state.errorType);

        return (
			<div className='col-sm-10' style={{paddingRight:0}}>
	        	<h2>Services
		        	<ToggleButton
		        		condition={this.state.addingAService}
		        		actionText='add a service'
		        		onClick={this.toggleAdding}
		        	></ToggleButton>	
	        	</h2>
	        	<form style={formStyle}>
		        	<Input ref='name' label='Name'></Input>
		        	<ImageInput
		        		helpText='Images must be smaller than 25 pixels wide by 50 pixels high.'
		        		label='Map marker image'
		        		ref='image'
		        		validate={{
		        			widthMax: 25,
		        			heightMax: 50
		        		}}
		        	/>
		        	<button onClick={this.submitForm} type="submit" className="btn btn-primary">Submit</button>
	        	</form>
	        	<div className='table-responsive'>
	        		<Table 
	        		sortable     = {true} 
	        		className    = 'table-hover table' 
	        		>
	        			{this.state.services.map(this.transformService,this)}
	        		</Table>
	        	</div>
        	</div>
        );
    },
});

module.exports = Services;