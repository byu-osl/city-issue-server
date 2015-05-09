'use strict';
var React  = require('react');
var api = require('../server-api.js');
var styles = require('../styles.js');

var RequestFilters = React.createClass({

	getInitialState: function () {
		return  {
			services: {}
		}
	},

	serviceChanged: function (event) {	

		
	},

	statusChanged: function (event) {
		var values;

		if (event.target.value === 'all') {
			values = ['open', 'closed']
		} else {
			values = [event.target.value];
		}

		$(window).trigger('map:filterChanged', {
			status: values
		});
	},


    render: function() {
    	var labelStyle = {
    		fontWeight: '500'
    	}

    	var containerStyle = {
    		marginBottom: 15,
    		marginLeft: 10
    	}

        return (
			<div style={styles.mix(this.props.style, containerStyle)}>

				<div className="form-group">
					<span style={styles.bold}>Status</span>
					<div class="checkbox">
					    <label style={labelStyle}>
					        <input name='status' type="radio" value='all' onChange={this.statusChanged}/> all
					    </label>
					</div>
					<div class="checkbox">
					    <label style={labelStyle}>
					        <input name='status' type="radio" value='open' onChange={this.statusChanged}/> open
					    </label>
					</div>
					<div class="checkbox">
					    <label style={labelStyle}>
					        <input name='status' type="radio" value='closed' onChange={this.statusChanged}/> closed
					    </label>
					</div>
				</div>
				<div className="form-group"><span style={styles.bold}>Category</span>
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
	    	<div class="checkbox">
	    	    <label style={labelStyle}>
	    	        <input onChange={this.categoryChanged} type="checkbox" value={service.service_code}/> {service.service_name}
	    	    </label>
	    	</div>
		);
    }
});

module.exports = RequestFilters;