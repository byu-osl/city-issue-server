'use strict';
var React  = require('react');
var styles = require('../styles.js');

var SegmentedControl = React.createClass({
	getDefaultProps: function () {
		return {
			required:     false,
			id:          'id',
			errorMessage: 'This field is required.',
			data:         [],
			onClick:      function(){},
			onChange:     function(){},
			label:        'Pick one:',
			buttonLabel:  'label',
		}
	},

	getInitialState: function () {
		return {
			selectedItem: null,
			isValid: undefined
		}
	},

	getSelectedItem: function () {
		return this.state.selectedItem;
	},

	validate: function () {
		if (this.props.required) {
			var isValid = !!this.state.selectedItem;
			this.setState({isValid:isValid});
			return isValid;
		} else {
			this.setState({isValid: true});
			return true;
		}
	},

	itemClicked: function (id, event) {
		this.setState({selectedItem:id});
		this.props.onChange(id, event);
		this.props.onClick(id, event);
	},

    render: function() {
    	var errorStyle = styles.visibleIf(this.state.isValid === false);

        return (
        	<div className='form-group'>
	            <p style={errorStyle} className="bg-warning">{this.props.errorMessage}</p>
	            <label style={styles.block} className='control-label'>{this.props.label}</label> 
	            <div className='btn-group' data-toggle='buttons'>
	                {this.props.data.map(this.renderButton, this)}
	            </div>
	        </div>
        );
},

    renderButton: function (item) {
    	var id = item[this.props.id];
    	var className = 'btn btn-primary';
    	if (!isUndefined(item.className)){
    		className = item.className
    	}

    	return (
	    	<label 
	    	className={className}
	    	key={id} 
	    	onClick={this.itemClicked.bind(this, id)}>
	    	    <input 
	    	    type='radio' 
	    	    name='options' 
	    	    value={id} 
	    	    autoComplete='off'/>
	    	    {item[this.props.buttonLabel]}
	    	</label>
    	)
    },
});

module.exports = SegmentedControl;