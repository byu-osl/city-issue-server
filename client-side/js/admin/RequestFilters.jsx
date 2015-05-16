'use strict';
var React      = require('react');
var styles     = require('../styles.js');
var _          = require('../_.js');
var api        = require('../server-api.js');
var RadioGroup = require('../components/RadioGroup.jsx');

var RequestFilters = React.createClass({

	getInitialState: function () {
		return  {
			selectedServices: {},
			services: []
		}
	},

	uncheckAllServices: function () {
		_.map(this.state.selectedServices, function (){
			return false;
		});

		this.setState({
			selectedServices: this.state.selectedServices
		});
	},

	checkAllServices: function () {
		_.map(this.state.selectedServices, function (){
			return true;
		});

		this.setState({
			selectedServices: this.state.selectedServices
		});
	},

	serviceChanged: function (event) {	
		var newSelections = this.state.selectedServices;
		newSelections[event.target.value] = event.target.checked;

		this.setState({
			selectedServices: newSelections
		});

		this.triggerMapUpdate(this.refs.status.value(), newSelections);
	},

	statusChanged: function (value) {
		this.triggerMapUpdate(value, this.state.selectedServices);
	},

	triggerMapUpdate: function(status, selectedServices) {
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

// TODO: all filter for categories
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

				<div ref='types' className="form-group"><span style={styles.bold}>Type</span><br/>
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

// TODO: filter table too :/