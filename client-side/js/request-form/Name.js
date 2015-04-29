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
				<label htmlFor="email">Email</label>
				<input type='text'
					name='firstName'
					onChange={this.firstNameChange}
					value={this.state.firstName}
				/>
				<input type='text'
					name='firstName'
					onChange={this.handleChange}
					value={this.state.lastName}
				/>
			</div>
		)
	}
});

module.exports = Name;