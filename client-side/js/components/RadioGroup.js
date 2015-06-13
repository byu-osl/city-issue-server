'use strict';
var React  = require('react');
var styles = require('styles');

var RadioGroup = React.createClass({
	getDefaultProps: function () {
		return {
			style: {},
			onChange: function(){},
			initialValue: undefined
		}
	},

	getInitialState: function () {
		return {
			value: this.props.initialValue
		}
	},

	value: function () {
		return this.state.value;
	},

	valueChanged: function (event) {
        var newValue = event.target.value;
		this.setState({
			value: newValue
		}, function (){
		    this.props.onChange(newValue)
        });
	},

    render: function() {
        return (
        	<div style={this.props.style} className="form-group">
				<span style={styles.bold}>{this.props.label}</span>
				{this.props.data.map(this.renderRadioButton, this)}
        	</div>
        );
    },

    renderRadioButton: function (data, index) {
    	var labelStyle = {
    		fontWeight: '500'
    	}

    	var checked = false;

    	if (!isUndefined(this.state.value) && this.state.value === data.value) {
    		checked = true;
    	} else if (!isUndefined(data.checked)) {
    		checked = data.checked;
    	}

    	if (isUndefined(data.label)) {
    		data.label = data.value;
    	}

    	return (
    		<div key={index} className="radio" style={{marginBottom:5, marginTop: 5}}>
    		    <label style={labelStyle}>
    		        <input 
    		        checked={checked} 
    		        name={this.props.ref} 
    		        type="radio" 
    		        value={data.value} 
    		        onChange={this.valueChanged}
    		        /> {data.label}
    		    </label>
    		</div>
    	)
    },

});

module.exports = RadioGroup;