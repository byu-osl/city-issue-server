'use strict';
var React           = require('react');
var {Table, Tr, Td} = require('reactable');
var _               = require('_');
var IconButton      = require('IconButton.jsx');
var Input           = require('Input.jsx');

var FancyTable = React.createClass({

	getDefaultProps: function () {
		return {
			sortOptions:     {},
			editable:        true,
			editableColumns: [],
			filterBy:        null,
			itemsPerPage:    100,
			transform:       null,
			onRowClick:      null,
			onRowSave:       function(){}
		}
	},

	getInitialState: function (){
		return {
			rowBeingEdited: null
		}
	},

	handleRowClick: function (id, event) {
		if (this.props.onRowClick) {
			this.props.onRowClick(id, event);
		}
	},

	handleEditClick: function (item, event) {
		event.stopPropagation(); // prevent the row being clicked
		var id = item._id;

		if (this.state.rowBeingEdited === id) {
			var newObject = {}
			this.props.editableColumns.forEach((columnName, index) => {
				// probably the worst bit of code in the codebase. Grabs the inputs using jQuery. Didn't figure out how to get input values in a clean way.
				// TODO: cleanup editableColumnKeys
					newObject[this.props.editableColumnKeys[index]] = $(`input[data-ref='${columnName}']`).val()
			});

			newObject._id = item._id;

			this.setState({
				rowBeingEdited: null
			}, () => {

			});

			this.props.onRowSave(newObject, event)
		} else {
			this.setState({rowBeingEdited:id})                      
		}
	},

    render: function() {
        return (
        	<div className='table-responsive'>
	        	<Table className = 'table-hover table'
        		filterable       = {this.props.filterBy}
        		sortable         = {this.props.sortOptions}
        		defaultSort      = {this.props.defaultSort}
        		itemsPerPage     = {this.props.itemsPerPage}
        		ref='table'>
	        	{this.props.data.map(this.renderRow)}
	        	</Table>
        	</div>
        );
    },

    renderRow: function (item) {
    	if (this.props.transform) {item = this.props.transform(item)}
    	var rowBeingEdited = item._id === this.state.rowBeingEdited;

    	var cells = _.keys(item).map(property => {
    		if (rowBeingEdited && this.props.editableColumns.indexOf(property) >= 0) {
    			return this.renderEditingCell(property, item[property])
    		}
			return this.renderCell(property, item[property]);
		});

    	if (this.props.editable) {
			var editCell = <Td column=' '>
					<IconButton
					iconStyle = {{color:rowBeingEdited? 'green' : 'black'}}
					onClick   = {this.handleEditClick.bind(this, item)}
					icon      = {rowBeingEdited? 'ok': 'pencil'}
					size      = 'sm'
					label     = {rowBeingEdited? 'save' : 'edit'}/>
				</Td>
    		cells = [editCell].concat(cells);
    	}

    	return (
    		<Tr 
    		style   = {(this.props.onRowClick && !rowBeingEdited) ? {cursor: 'pointer'} : {}} 
    		key     = {item._id}
    		onClick = {rowBeingEdited? ()=>{} : this.handleRowClick.bind(this, item._id)}
    		ref     = {item._id}>
    			{cells}
    		</Tr>
    	)
    },

    renderCell: function (key, value) {
    	if (isUndefined(value)) {
    		value = ' ' 
    	}

    	return (
    		<Td column={key}>{value}</Td>
    	)
    },

    renderEditingCell: function (key, value) {
    	if (isUndefined(value)) {
    		value = ' '
    	}

    	return (
    		<Td column={key} value={value}>
    			<Input
    			data-ref={key}
    			initialValue={value}
    			label={key}
    			/>
    		</Td>
    	)
    },
});

module.exports = FancyTable;