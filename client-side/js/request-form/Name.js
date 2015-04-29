'use strict';

var Name = React.createClass({
	getInitialState: function () {
	    return {
	        firstName: '',
	        lastName: ''
	    };
	},

	getFirstName : function () {
		return this.state.firstName;
	},

	getLastName : function () {
		return this.state.lastName;
	},

	validate: function () {
		return true;
	},

	firstNameChange: function () {
		this.setState({firstName:event.target.value});
	},

	lastNameChange: function () {
		this.setState({lastName:event.target.value});
	},

	render: function () {
		return (
			<div>
				<label className='control-label' htmlFor="firstName">First Name</label>
				<input 
					className='form-control'
					type='text'
					name='firstName'
					onChange={this.firstNameChange}
					value={this.state.firstName}
				/>
				<label className='control-label' htmlFor="lastName">Last Name</label>
				<input 
					className='form-control'
					type='text'
					name='lastName'
					onChange={this.lastNameChange}
					value={this.state.lastName}
				/>
			</div>
		)
	}
});

module.exports = Name;