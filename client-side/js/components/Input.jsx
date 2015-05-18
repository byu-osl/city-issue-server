'use strict';
var React  = require('react');
var _      = require('_');
var styles = require('styles');

var Input = React.createClass({
	getDefaultProps: function () {
		return {
			initialValue: '',
			onChange    : function(){},
			label       : '',
			type        : 'text',
			placeholder : ''
		}
	},

	getInitialState: function () {
		return {
			value: this.props.initialValue,
			passWordVisible: false
		}
	},

	value: function (valueToSet) {
		if (!isUndefined(valueToSet)) {
			this.setState({value:valueToSet});
		} else {
			return this.state.value
		}
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

	componentWillReceiveProps: function (newProps) {
		if (!isUndefined(newProps.initialValue) && this.state.value.length === 0) {
			this.setState({value: newProps.initialValue})
		}
	},

	togglePasswordVisibility: function () {
		this.setState({passwordVisible:!this.state.passwordVisible});
	},


    render: function() {
    	var type = this.props.type;
    	if (type === 'password') {
    		type = this.state.passwordVisible ? 'text' : 'password';
    	}
    	var visibilityText = 
    		this.state.passwordVisible ? 'hide password' : 'show password';

    	var visLinkStyle = styles.visibleIf(this.props.type === 'password');

    	_.assign(visLinkStyle, {
			marginLeft: 10,
			cursor: 'pointer',
			color: 'rgb(155, 155, 155)'
		});

        return (
        	<div style={this.props.style} className='form-group'>
                <label className='control-label' style={{marginRight:10}}>{this.props.label}
                	<a style={visLinkStyle} className='small' onClick={this.togglePasswordVisibility}>{visibilityText}</a></label>

                <input ref='input' value={this.state.value} type={this.props.type} 
                onChange={this.onChange} 
                style={{marginRight:20}} 
                className='form-control'
                placeholder={this.props.placeholder}/>
            </div>

        );
    }
});

module.exports = Input;