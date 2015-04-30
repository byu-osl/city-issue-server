'use strict';

var Email = React.createClass({
	getInitialState: function () {
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