'use strict';

var Phone = React.createClass({
	getInitialState : function () {
		return {
			phone: ''
		}
	},

	getPhone : function () {
		return this.state.phone;
	},

	handleChange : function () {
		this.setState({phone: event.target.value})
	},

	render: function () {
		return (
			<div>
				<label htmlFor='phone'>Phone number</label>
				<input 
					onChange={this.handleChange}
					type='text' name='phone' value={this.state.phone}></input>
			</div>
		)
	}
});

module.exports = Phone;