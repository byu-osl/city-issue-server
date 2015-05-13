'use strict';
var React  = require('react');

var Input = React.createClass({
	getDefaultProps: function () {
		return {
			initialValue: '',
			onChange    : function(){}
		}
	},

	getInitialState: function () {
		return {
			value: this.props.initialValue
		}
	},

	value: function () {
		return this.state.value
	},

	focus: function () {
		React.getDOMNode(this.refs.input).focus();
	},

	onChange: function (event) {
		this.setState({
			value: event.target.value
		});

		this.props.onChange(event);
	},

    render: function() {
        return (
        	<div className='form-group'>
                <label htmlFor={this.props.ref} style={{marginRight:10}}>{this.props.label}</label>
                <input ref='input' value={this.state.value} type='text' 
                onChange={this.onChange} 
                style={{marginRight:20}} 
                className='form-control'/>
            </div>

        );
    }
});

module.exports = Input;