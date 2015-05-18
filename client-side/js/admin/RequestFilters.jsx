'use strict';
var React      = require('react');
var styles     = require('styles');
var _          = require('_');
var api        = require('server-api');
var RadioGroup = require('RadioGroup.jsx');

var RequestFilters = React.createClass({

	getInitialState: function () {
		return  {
			selectedServices: {},
			services: []
		}
	},

	changeAllServices: function(boolean) {
		var newSelections = _.mapObject(this.state.selectedServices, function (){
			return boolean;
		});

		this.setState({
			selectedServices: newSelections
		}, function (){
			this.triggerFilterChanged();
		}); 
	},

	uncheckAllServices: function (){this.changeAllServices(false);},
	checkAllServices:   function (){this.changeAllServices(true);},

	serviceChanged: function (event) {	
		var newSelections = this.state.selectedServices;
		newSelections[event.target.value] = event.target.checked;

		this.setState({
			selectedServices: newSelections
		}, function (){
			this.triggerFilterChanged();
		}); 
	},

	statusChanged: function () {
		this.triggerFilterChanged();
	},

	triggerFilterChanged: function() {
		var status = this.refs.status.value();
		var selectedServices = this.state.selectedServices;

		if (status === 'all') { 
			status = ['open', 'closed']
		} else {
			status = [status];
		}

		selectedServices = _.keys(selectedServices).filter(function(service){
			return (selectedServices[service] === true)
		}, this);

		// Caught by the AdminMap and Requests section to filter the map and
		// the table. Pass an array for each one, and make sure to follow the
		// request model exactly (hence status and service_name, which are 
		// properties of every request.

		$(window).trigger('requests:filterChanged', {
			status: status,
			service_name: selectedServices
		});
	},

	componentWillMount: function () {
		api.getServices(function gotServices(services) {
			var selectedServices = {};
			services.forEach(function (service){
				selectedServices[service.service_name] = true;
			});
			this.setState({
				selectedServices: selectedServices,
				services: services
			});
        }, this);
	},

    render: function() {
    	var containerStyle = {
    		marginBottom: 15,
    		marginLeft: 10
    	}

        return (
			<div>
	        	<RadioGroup
	        	label='Status'
	        	ref='status'
	        	data={[
	        		{value: 'all' },
	        		{value: 'open' },
	        		{value: 'closed' },
	        	]}
	        	onChange={this.statusChanged}
	        	style={_.assign(containerStyle, this.props.style)}
	        	initialValue='open'/>

				<div style={containerStyle} ref='types' className="form-group"><span style={styles.bold}>Type</span><br/>
					<button type="button" className="btn btn-default btn-xs" onClick={this.checkAllServices}>check all</button>
					<button type="button" className="btn btn-default btn-xs" onClick={this.uncheckAllServices}>uncheck all</button>
					{this.state.services.map(this.renderService, this)}
				</div>
			</div>
        );
    },

    renderService: function (service) {
    	var labelStyle = {
    		fontWeight: '500'
    	}

    	return (
	    	<div key={service.service_code} className="checkbox">
	    	    <label style={labelStyle}>
	    	        <input onChange={this.serviceChanged} checked={this.state.selectedServices[service.service_name]} type="checkbox" value={service.service_name}/> {service.service_name}
	    	    </label>
	    	</div>
		);
    }
});

module.exports = RequestFilters;