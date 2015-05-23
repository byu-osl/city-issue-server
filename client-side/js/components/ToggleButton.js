'use strict';
var React  = require('react');

var ToggleButton = React.createClass({

	getDefaultProps: function () {
		return {
			activeText: 'cancel'
		}
	},

    render: function() {
        var buttonClass = this.props.condition? 'btn btn-danger' : 'btn btn-success';
        var buttonIcon  = this.props.condition? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-plus';
        var buttonText = this.props.condition? this.props.activeText : this.props.actionText;

        return (
        	<button
	        	onClick={this.props.onClick} 
	        	type='button' 
	        	className={buttonClass}
	        	style={{marginLeft:10}}
	        >
        	    <span aria-hidden='true' className={buttonIcon} 
        	    ></span>{buttonText}
        	</button>

        );
    }
});

module.exports = ToggleButton;