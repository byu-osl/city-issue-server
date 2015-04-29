'use strict';

var Email = React.createClass({
	getInitialState: function () {
	    return {
	        email: '',
	        isValid: undefined
	    };
	},

	getEmail: function () {
		return this.state.email;
	},

	validate: function () {
		var isValid = /.+@.+\..+/.test(this.state.email);
		this.setState({isValid:isValid});
		return isValid;
	},

	handleChange: function () {
		this.setState({email:event.target.value});
	},

	render: function () {
		return (
			<div>
				<p className='bg-warning'>Please enter a valid email0</p>
				<label htmlFor="email">Email</label>
				<input type='text'
					name='email'
					onChange={this.handleChange}
					onBlur={this.validate}
					value={this.state.email}
				/>
			</div>
		)
	}
});

var Name = React.createClass({
	getInitialState: function () {
	    return {
	        firstName: '',
	        lastName: '',
	        isValid: undefined
	    };
	},

	validate: function () {
		var isValid = this.statefirstName.length > 0 && this.statelastName.length > 0
		this.setState({isValid:isValid});
		return isValid;
	},

	handleChange: function () {
		this.setState({email:event.target.value});
	},

	render: function () {
		return (
			<div>
				<p className='bg-warning'>Please enter a valid email0</p>
				<label htmlFor="email">Email</label>
				<input type='text'
					name='firstName'
					onChange={this.handleChange}
					onBlur={this.validate}
					value={this.state.email}
				/>
				<input type='text'
					name='firstName'
					onChange={this.handleChange}
					onBlur={this.validate}
					value={this.state.email}
				/>
			</div>
		)
	}
});

var Phone = React.createClass({
	render: function () {
		return (
			<div>
			</div>
		)
	}
});

var UserInfo = React.createClass({

	render: function () {
		return (
			<div>
				<Name />
				<Email />
				<Phone />
			</div>
		)
	}
});


module.exports = UserInfo;