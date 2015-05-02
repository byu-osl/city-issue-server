'use strict';

var Name = React.createClass({
	getInitialState: function () {
	    return {
	        name: '',
	        visible: false
	    };
	},

	getName : function () {
		return this.state.name;
	},

	componentDidUpdate: function () {
		if (this.getName().length === 0) {
			this.refs.input.getDOMNode().focus();
		}
	},

	focus: function () {
		
	},

	validate: function () {
		return true;
	},

	nameChange: function () {
		this.setState({name:event.target.value});
	},

	render: function () {
		return (
			<div ref='parent' style={this.props.style}>
				<label className='control-label' htmlFor="Name">Name</label>
				<input 
					ref='input'
					className='form-control'
					type='text'
					name='name'
					onChange={this.nameChange}
					value={this.state.name}
				/>
			</div>
		)
	}
});

module.exports = Name;