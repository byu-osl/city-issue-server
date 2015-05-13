'use strict';
var React  = require('react');

var Checkbox = React.createClass({

	checked: function() {
		return React.getDOMNode(this.refs.input).checked
	},

    render: function() {
        return (

	    	<div style={this.props.style} className='checkbox'>
                <label>
                    <input type='checkbox' ref='input'/>{this.props.label}
                </label>
            </div>

        );
    }
});

module.exports = Checkbox;	