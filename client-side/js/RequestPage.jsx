'use strict';
var React               = require('react');
var Router              = require('react-router');
var StateMixin          = Router.State;
var api                 = require('./server-api.js');
var SingleRequestMap    = require('./SingleRequestMap.jsx');
var RequestHistoryTable = require('./RequestHistoryTable.jsx');

var RequestPage = React.createClass({
	mixins: [StateMixin],

	getInitialState: function () {
		return {
			request: undefined
		}
	},

	componentWillMount: function () {
		var id = this.getParams().id;

		api.getRequest(id, function (request){
			this.setState({request:request});
			this.refs.map.setRequest(request);
            this.refs.table.setRequest(request);
		}, this);
	},

    addEntry: function (event) {
        this.refs.table.addEntry(event);
    },

    render: function() {
    	if (isUndefined(this.state.request)) {return <div></div>; }
    	var request = this.state.request;

    	var imgStyle = {
    		width: '100%'
    	}

    	var statusStyle = {
    		fontSize: 18,
    	};

    	var statusColor = request.status === 'closed' ? 'green' : 'rgb(255, 202, 37)'
    	var status = request.status === 'closed' ? 'closed \u2713' : 'open';
    	var date = new Date(request.requested_datetime).toDateString().substring(4);

        return (
    	<div className='container request-page'>
        	<div className='row'>
        		<h1>{request.service_name} <span className='small'>{date}</span></h1>
        	</div>
            <div className='row'>
                <span style={statusStyle}>status: <span style={{color:statusColor}}>{status}</span></span>
            </div>       
            <div className='row'>
                <h3>History <button onClick={this.addEntry} type="button" className="btn btn-success" style={{marginLeft:10}}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span>add an entry</button></h3>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <RequestHistoryTable ref='table'></RequestHistoryTable>
                </div>
            </div>
         	<div className='row'>
                <div className='col-md-12'>
        			<SingleRequestMap ref='map'></SingleRequestMap>
                </div>
            </div>
    	</div>
        );
    }
});

module.exports = RequestPage;