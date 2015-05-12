'use strict';
var React  = require('react');
var Reactable = require('reactable');
var Table     = Reactable.Table;
var unsafe    = Reactable.unsafe;
var Row       = Reactable.Tr;
var Cell      = Reactable.Td;
var styles = require('./styles.js');


var RequestHistoryTable = React.createClass({
	getInitialState: function () {
		return {
			request: undefined,
            adding: false
		}
	},

	setRequest: function (request) {
		this.setState({
			history: this.formatHistory(request.history)
		});
	},

    addEntry: function (event) {
        this.setState({adding:true});
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

        var addRowStyle = styles.visibleIf(this.state.adding)

        return (
        	<div>
	        	<Table 
	            className = 'table-responsive table-hover table' 
	        	data={this.state.history}
	        	sortable={sortOptions}
	        	defaultSort={defaultSort}
	        	>
                <Row style={addRowStyle}>   
                    <Cell></Cell>
                </Row>
	          
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