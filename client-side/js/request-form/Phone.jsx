'use strict';

var Phone = React.createClass({
	getInitialState : function () {
		return {
			phone: ''
		}
	},

	getPhoneNumber: function () {
		return this.state.phone;
	},

	handleChange: function () {
		this.setState({phone: event.target.value})
	},

	render: function () {
		return (
			<div style={this.props.style}>
				<label className='control-label' htmlFor='phone'>Phone number</label>
				<input 
					className='form-control'
					onChange={this.handleChange}
					type='text' name='phone' value={this.state.phone}></input>
			</div>
		)
	}
});

module.exports = Phone;