'use strict';
var React  = require('react');
var api = require('../server-api.js');
var styles = require('../styles.js');

var RequestFilters = React.createClass({

	handleChange: function (event) {
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
					        <input name='status' type="radio" value='open'/> open
					    </label>
					</div>
					<div class="checkbox">
					    <label style={labelStyle}>
					        <input name='status' type="radio" value='closed'/> closed
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
	    	        <input type="checkbox" value={service.service_code}/> {service.service_name}
	    	    </label>
	    	</div>
		);
    }
});

module.exports = RequestFilters;