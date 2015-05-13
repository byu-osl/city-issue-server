'use strict';
var React     = require('react');
var Reactable = require('reactable');
var Table     = Reactable.Table;
var unsafe    = Reactable.unsafe;
var Row       = Reactable.Tr;
var Cell      = Reactable.Td;
var styles    = require('./styles.js');
var api       = require('./server-api.js');
var ToggleButton = require('./components/ToggleButton.jsx');
var Checkbox = require('./components/Checkbox.jsx');
var Input = require('./components/Input.jsx');

var RequestHistoryTable = React.createClass({
	getInitialState: function () {
		return {
			request: undefined,
            addingAnEntry: false,
            date: new Date().toDateString().substring(4),
            description: ''
		}
	},

	setRequest: function (request) {
		this.setState({
			history: this.formatHistory(request.history),
            request: request
		});
	},

    toggleAdding: function (event) {
        var addingAnEntry = !this.state.addingAnEntry;
        this.setState({addingAnEntry: addingAnEntry});
    },

    submitForm: function () {
        var data = {
            requestID: this.state.request._id,
            date: this.refs.date.value(),
            description: this.refs.description.value()
        }

        api.addHistoryEntry(data, function historySubmitted (newHistory) {
            this.setState({
                history: this.formatHistory(newHistory),
                addingAnEntry:  false,
                description: ''
            });
        }, this)
    },

    componentDidUpdate: function () {
        // TODO: takes focus when it shouldn't
        if (this.state.addingAnEntry) {
            this.refs.description.focus();
        }
    },

    render: function() {

if (isUndefined(this.state.history)) {return (<div> </div>) }

var sortOptions = [{column: 'Date', sortFunction: Reactable.Sort.Date}]

var defaultSort = {
column: 'Date',
direction: 'desc'
}

var addRowStyle = styles.visibleIf(this.state.addingAnEntry)

return (
<div className='container'>
    <h3>History 
        <ToggleButton
            condition={this.state.addingAnEntry}
            actionText='add an entry'
            onClick={this.toggleAdding}
        ></ToggleButton>
    </h3>
    <div style={addRowStyle} className='col-sm-12'>
        <Input
            ref='date'
            label='Date'
            initialValue={new Date().toDateString().substring(4)}
        />
        <Input
            ref='description'
            label='Description'
        />
        <Checkbox 
            style={styles.visibleIf(this.state.request.status==='open')} 
            label='close this issue'
            ref='close'
        />
        <Checkbox 
            style={styles.visibleIf(this.state.request.status==='closed')}
            label='open this issue' 
            ref='open'
        />
        <button onClick={this.submitForm} type="submit" className="btn btn-primary">Submit</button>
    </div>
	<Table 
    className = 'table-responsive table-hover table' 
	sortable={sortOptions}
	defaultSort={defaultSort}
	>
    {this.state.history.map(this.renderRow, this)}
	</Table>
</div>
        );
    },

    renderRow: function (entry) {
        return (
            <Row key={entry} data={entry}></Row>
        )
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