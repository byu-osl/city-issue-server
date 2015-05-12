'use strict';
var React  = require('react');
var api = require('../server-api.js');
var styles = require('../styles.js');
var _ = require('../_.js');

var RequestFilters = React.createClass({

	getInitialState: function () {
		return  {
			selectedServices: undefined,
			status: 'all'
		}
	},

	serviceChanged: function (event) {	
		var newSelections = this.state.selectedServices;
		newSelections[event.target.value] = event.target.checked;

		this.setState({
			selectedServices: newSelections
		});

		this.triggerMapUpdate(this.state.status, newSelections);
	},

	statusChanged: function (event) {
		this.setState({
			status: event.target.value,
		});

		this.triggerMapUpdate(event.target.value, this.state.selectedServices);
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

		var self = this;
		$(window).trigger('map:filterChanged', {
			status: status,
			service_name: selectedServices
		});
	},

	componentWillReceiveProps: function (nextProps) {
		if (isUndefined(this.state.selectedServices)) {
			var selectedServices = {};
			nextProps.services.forEach(function (service){
				selectedServices[service.service_name] = true;
			});
			this.setState({
				selectedServices: selectedServices
			});
		}
	},


    render: function() {
    	var labelStyle = {
    		fontWeight: '500'
    	}

    	var containerStyle = {
    		marginBottom: 15,
    		marginLeft: 10
    	}

// TODO: all filter for categories
        return (
			<div style={_.assign(containerStyle, this.props.style)}>

				<div className="form-group">
					<span style={styles.bold}>Status</span>
					<div className="checkbox">
					    <label style={labelStyle}>
					        <input checked={this.state.status === 'all'} name='status' type="radio" value='all' onChange={this.statusChanged}/> all
					    </label>
					</div>
					<div className="checkbox">
					    <label style={labelStyle}>
					        <input checked={this.state.status === 'open'} name='status' type="radio" value='open' onChange={this.statusChanged}/> open
					    </label>
					</div>
					<div className="checkbox">
					    <label style={labelStyle}>
					        <input checked={this.state.status === 'closed'} name='status' type="radio" value='closed' onChange={this.statusChanged}/> closed
					    </label>
					</div>
				</div>
				<div className="form-group"><span style={styles.bold}>Type</span>
					{this.props.services.map(this.renderService, this)}
				</div>
			</div>
        );
    },

    renderService: function (service) {
    	var labelStyle = {
    		fontWeight: '500'
    	}

    	return (
	    	<div className="checkbox">
	    	    <label style={labelStyle}>
	    	        <input onChange={this.serviceChanged} checked={this.state.selectedServices[service.service_name]} type="checkbox" value={service.service_name}/> {service.service_name}
	    	    </label>
	    	</div>
		);
    }
});

module.exports = RequestFilters;

// TODO: filter table too :/