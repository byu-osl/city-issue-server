'use strict';
var React  = require('react');
var reactable  = require('reactable');
var {Table, Tr, Td} = reactable;
var _ = require('_');
var IconButton = require('IconButton.jsx');

var FancyTable = React.createClass({

	getDefaultProps: function () {
		return {
			sortOptions:  {},
			editable:     true,
			editableColumns: [],
			filters:      [],
			itemsPerPage: 100,
			transform:    null,
			onRowClick:   null,
			onEditClick:  function(){}
		}
	},

	handleRowClick: function (id, event) {
		
		if (this.props.onRowClick) {
			this.props.onRowClick(id, event);
		}
	},

	handleEditClick: function (id, event) {
		event.stopPropagation(); // prevent the row being clicked

		if (id = this.state.editingRow) {

		}

		this.setState({editingRow:id})                         
		this.props.onEditClick(id, event);
	},

    render: function() {
        return (
        	<div className='table-responsive'>
	        	<Table className='table-hover table'
        		filterable={this.props.filterBy}
        		sortable={this.props.sortOptions}
        		defaultSort={this.props.defaultSort}
        		itemsPerPage={this.props.itemsPerPage}>
	        	{this.props.data.map(this.renderRow)}
	        	</Table>
        	</div>
        );
    },

    renderRow: function (item) {
    	if (this.props.transform) {item = this.props.transform(item)}

    	var properties = _.keys(item);

    	var cells = properties.map(property => {
			return this.renderCell(property, item[property]);
		});

		var editCell = <Td column=' '>
			<IconButton
			onClick={this.handleEditClick.bind(this, item._id)}
			icon={item._id === this.state.editingRow? 'ok': 'pencil'}
			size='lg'/>
		</Td>

		var rowStyle = this.props.onRowClick ? {cursor: 'pointer'} : {}

    	return (
    		<Tr 
    		style={rowStyle} 
    		key={item._id}
    		onClick={this.handleRowClick.bind(this, item._id)}
    		>
    			{this.props.editable ? editCell : []}
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
});

module.exports = FancyTable;