'use strict';
var React     = require('react');
var Reactable = require('reactable');
var Table     = Reactable.Table;
var unsafe    = Reactable.unsafe;
var Row       = Reactable.Tr;
var Cell      = Reactable.Td;
var styles    = require('./styles.js');
var api       = require('./server-api.js');

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

    dateChanged: function (event) {
        this.setState({
            date: event.target.value
        });
    },

    descriptionChanged: function (event) {
        this.setState({
            description: event.target.value
        });
    },

    submitForm: function () {
        var data = {
            requestID: this.state.request._id,
            date: this.state.date,
            description: this.state.description
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
        if (this.state.addingAnEntry) {
            React.getDOMNode(this.refs.description).focus();
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
        var buttonClass = this.state.addingAnEntry? 'btn btn-danger' : 'btn btn-success';
        var buttonIcon  = this.state.addingAnEntry? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus';
        var buttonText  = this.state.addingAnEntry? 'cancel' : 'add an entry';

        return (
        	<div className='container'>
                <h3>History 
                    <button 
                    onClick={this.toggleAdding} type='button' 
                    className={buttonClass}
                    style={{marginLeft:10}}>
                        <span aria-hidden='true' className={buttonIcon} 
                        ></span>{buttonText}
                    </button>
                </h3>
                <div style={addRowStyle} className='col-sm-12'>
                    <div className='form-group'>
                        <label htmlFor='date' style={{marginRight:10}}>Date</label>
                        <input ref='date' value={this.state.date} type='text' 
                        onChange={this.dateChanged} 
                        style={{marginRight:20}} 
                        className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <label style={{marginRight:10}} htmlFor='description'>Description</label>
                        <input ref='description' value={this.state.description} type='text' 
                         onChange={this.descriptionChanged} 
                         className='form-control'/>
                    </div>
                    <div style={styles.visibleIf(this.state.request.status==='open')} className='checkbox'>
                        <label>
                            <input type='checkbox' ref='close'/> close this issue
                        </label>
                    </div>
                    <div style={styles.visibleIf(this.state.request.status==='closed')} className='checkbox'>
                        <label>
                            <input type='checkbox' ref='open'/> open this issue
                        </label>
                    </div>
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