'use strict';
var React  = require('react');
var Reactable = require('reactable');
var Table     = Reactable.Table;
var unsafe    = Reactable.unsafe;
var Row       = Reactable.Tr;


var RequestHistoryTable = React.createClass({
	getInitialState: function () {
		return {
			request: undefined
		}
	},

	setRequest: function (request) {
		this.setState({
			history: this.formatHistory(request.history)
		});
	},

    render: function() {
    	if (isUndefined(this.state.history)) {
    		return (<div> </div>)
    	}

    	var sortOptions = [{column: 'Date', sortFunction: Reactable.Sort.Date}]

    	var defaultSort = {
    		column: 'Date',
    		direction: 'desc'
    	}

        return (
        	<div>
	        	<Table 
	            className = 'table-responsive table-hover table' 
	        	data={this.state.history}
	        	sortable={sortOptions}
	        	defaultSort={defaultSort}
	        	>
	          
	        	</Table>
        	</div>
        );
    },

    formatHistory: function (history) {
    	return history.map(function (entry){
    		var newEntry = {};
    		newEntry.Date = new Date(entry.date).toDateString().substring(4);
    		newEntry.Description = entry.description;
    		return newEntry;
    	});
    },
});

module.exports = RequestHistoryTable;