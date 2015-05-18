'use strict';
var React        = require('react');
var Reactable    = require('reactable');
var Table        = Reactable.Table;
var Row          = Reactable.Tr;
var styles       = require('styles');
var api          = require('server-api');
var ToggleButton = require('ToggleButton.jsx');
var Checkbox     = require('Checkbox.jsx');
var Input        = require('Input.jsx');
var _            = require('_');
var formatDate     = require('utils').formatDate;

// TODO: if something is submitted on the same day it can be out of order
var RequestHistoryTable = React.createClass({
	getInitialState: function () {
		return {
			request: undefined,
            addingAnEntry: false,
		}
	},

	setRequest: function (request) {
		this.setState({
			history: request.history,
            request: request
		});
	},

    toggleAdding: function () {
        var addingAnEntry = !this.state.addingAnEntry;
        this.setState({addingAnEntry: addingAnEntry}, function (){
            if (this.state.addingAnEntry) {
                this.refs.description.focus();
            }
        });
    },

    submitForm: function () {
        var status = this.state.request.status;

        if (this.refs.close.isChecked()) {
            status = 'closed';
        } else if (this.refs.open.isChecked()) {
            status = 'open';
        }

        var data = {
            _id: this.state.request._id,
            date: this.refs.date.value(),
            description: this.refs.description.value(),
            status: status
        }

        api.addHistoryEntry(data, function historySubmitted (newHistory) {
            this.setState({
                history: newHistory,
                addingAnEntry:  false,
            });
            this.refs.description.value('');
        }, this)


        if (this.state.request.status !== status) {
            var updatedRequest = _.assign(this.state.request, {status:status});
            api.updateRequest(updatedRequest, function (request){
                this.setState({request: request});
                this.props.setRequest(request);
            }, this);
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
                <Input ref='date' label='Date' 
                initialValue={formatDate(new Date())}/>
                <Input ref='description' label='Description'/>
                <Checkbox style={styles.visibleIf(this.state.request.status==='open')} 
                label='close this issue'
                ref='close'/>
                <Checkbox style={styles.visibleIf(this.state.request.status==='closed')}
                label='open this issue' 
                ref='open'/>
                <button onClick={this.submitForm} type="submit" className="btn btn-primary">Submit</button>
            </div>
        	<Table 
            className = 'table-responsive table-hover table' 
        	sortable={sortOptions}
        	defaultSort={defaultSort}>
            {this.state.history.map(this.renderRow, this)}
        	</Table>
        </div>
                );
     },

    renderRow: function (entry) {
        var newEntry = {};
        newEntry.Date = formatDate(new Date(entry.date));
        newEntry.Description = entry.description;

        return (
            <Row key={entry} data={newEntry}></Row>
        )
    },

});

module.exports = RequestHistoryTable;