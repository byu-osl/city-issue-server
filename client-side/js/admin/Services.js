'use strict';

var React        = require('react');
var api          = require('server-api');
var {unsafe}     = require('reactable');
var EditableTable = require('EditableTable');
var ToggleButton = require('ToggleButton');
var Input        = require('Input');
var styles       = require('styles');
var ImageInput   = require('ImageInput');

var Services = React.createClass({
	getInitialState: function () {
		return {
			errorType: null,
			services: [],
			addingAService: false,
			serviceMetadata: {}
		}
	},

	// TODO: similar to RequestHistoryTable
	toggleAdding: function () {
		var addingAService = !this.state.addingAService;
		this.setState({addingAService: addingAService}, function (){
			if (this.state.addingAService){
				this.refs.name.focus();
			}
		});
	},

	componentDidMount: function () {
		api.getServices((services) => {
            api.getServiceMetadata((data) => {
				this.setState({
					serviceMetadata: data
				}); this.state.serviceMetadata = data;
				this.setState({
					services: services
				});
			});
        });
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

	rowSaved: function (service) {
		api.updateService(service, () => {

		});
	},


    render: function() {

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
	        	<EditableTable
		        	sortOptions        = {true}
		        	data               = {this.state.services}
		        	transform          = {this.transformService}
		        	editableColumns    = {['Name']}
		        	editableColumnKeys = {['service_name']}
		        	onRowSave          = {this.rowSaved}
	        	></EditableTable>	
        	</div>
        );
    },

	transformService: function (service) {
		var newService = {};
		var metaData = this.state.serviceMetadata[service.service_code]
		if (isUndefined(metaData)) {
			metaData = {openCount:0, closedCount: 0, total: 0}
		}
		var src = service.marker_image;
		newService.Icon = unsafe('<img style="height:20px" src="'+src+'"/>');
		newService.Name   = service.service_name;
		newService.Open   = metaData.openCount;
		newService.Closed = metaData.closedCount;
		newService.Total  = metaData.total;
		newService._id    = service._id;
		return newService;
	},
});

module.exports = Services;