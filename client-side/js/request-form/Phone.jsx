'use strict';
var React  = require('react');
var Phone = React.createClass({
	getInitialState : function () {
		var phoneNumber = this.props.value || '';
		return {
			phoneNumber: phoneNumber
		}
	},

	getPhoneNumber: function () {
		return this.state.phoneNumber;
	},

	handleChange: function () {
		this.setState({phone: event.target.value})
	},

	componentWillReceiveProps: function (newProps) {
		this.setState({phoneNumber:newProps.value});
	},

	render: function () {
		return (
			<div style={this.props.style}>
				<label className='control-label' htmlFor='phone'>Phone number</label>
				<input 
					className='form-control'
					onChange={this.handleChange}
					type='text' name='phoneNumber' value={this.state.phoneNumber}></input>
			</div>
		)
	}
});

module.exports = Phone;