'use strict';
var React  = require('react');
var styles = require('styles');

// Used in the request form.
var IconButton = React.createClass({
	getDefaultProps: function () {
		return {
			loading: false,
			onClick: function (){},
			size:    'xs',
			label:   ''
		}
	},

	onClick: function (event) {
		this.props.onClick(event);
	},

    render: function() {
    	var buttonStyle = {
          marginLeft: 10
        }

        if (this.props.size === 'lg' && this.props.label === '') {
        	buttonStyle = styles.mix(buttonStyle, {
        		padding: '4px 6px',
        		fontSize: 18,
        		lineHeight: 0.933333,
        		borderRadius: 6
        	});
        }

        var iconStyle = styles.mix(
        	this.props.iconStyle,
        	styles.visibleIf(!this.props.loading)
        )

        iconStyle = styles.mix(iconStyle, {
        	marginRight: this.props.label === '' ? 0: 10
        });

        var loadingStyle = styles.mix({
            border: 'none',
            top: -5,
            position: 'relative',
            paddingRight: 2,
            height: 9,
            marginRight: 5
        }, styles.visibleIf(this.props.loading));

        return (

        	<button 
    	    style={styles.mix(buttonStyle, this.props.style)}
    	    className={`btn btn-default btn-${this.props.size}`} 
    	    onClick={this.onClick}>
        	    <span  
        	    style={iconStyle} 
        	    className={`glyphicon glyphicon-${this.props.icon}`}/>
        	    <img 
        	    style={loadingStyle} 
        	    src='../../images/location-loader.gif'/>
        	    {this.props.label}
        	</button>

        );
    }
});

module.exports = IconButton;