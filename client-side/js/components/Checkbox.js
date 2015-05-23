'use strict';
var React  = require('react');

var Checkbox = React.createClass({
    getDefaultProps: function () {
        return {
            onChange: function(){}
        }
    },

	isChecked: function() {
		return React.getDOMNode(this.refs.input).checked
	},

    handleChange: function () {
        this.props.onChange();
    },

    render: function() {
        return (
 
	    	<div style={this.props.style} className='checkbox'>
                <label>
                    <input type='checkbox' ref='input' onChange={this.handleChange}/>{this.props.label}
                </label>
            </div>

        );
    }
});

module.exports = Checkbox;	