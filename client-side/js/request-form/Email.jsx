'use strict';
var React  = require('react');


var Email = React.createClass({
	getInitialState: function () {
		var email = this.props.value || '';
	    return {
	        email: '',
	    };
	},

	getEmail: function () {
		return this.state.email;
	},

	validate: function () {
		return true;
	},

	handleChange: function () {
		this.setState({email:event.target.value});
	},

	componentWillReceiveProps: function (newProps) {
		if (typeof newProps.value !== 'undefined') {
			this.setState({email:newProps.value});
		}
	},

	render: function () {
		return (
			<div style={this.props.style}>
				<label className='control-label' htmlFor="email">Email</label>
				<input 
					className='form-control'
					type='text'
					name='email'
					onChange={this.handleChange}
					value={this.state.email}
				/>
			</div>
		)
	}
});

module.exports = Email;