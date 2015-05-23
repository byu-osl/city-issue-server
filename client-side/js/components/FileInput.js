'use strict';
var React  = require('react');

var FileInput = React.createClass({

	getValue: function () {
		return this.state.value;
	},

	reset: function () {
		this.setState({
			value: null
		})
		this.refs.input.files = null;
	},

	handleChange: function (event) {
		this.props.onChange(React.getDOMNode(this.refs.input).files[0], event)
	},

    render: function() {
        return (
        	<div className='form-group'>
				<label htmlFor="">{this.props.label}</label>
				<input onChange={this.handleChange} ref='input' type="file"/>
        	</div>
        );
    }
});

module.exports = FileInput;