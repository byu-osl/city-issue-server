'use strict';
var React               = require('react');
var Router              = require('react-router');
var StateMixin          = Router.State;
var api                 = require('server-api.js');
var SingleRequestMap    = require('./SingleRequestMap.jsx');
var RequestHistoryTable = require('./RequestHistoryTable.jsx');
var formatDate     = require('utils').formatDate;

var RequestPage = React.createClass({
	mixins: [StateMixin],

	getInitialState: function () {
		return {
			request: undefined
		} 
	},

	componentWillMount: function () {
		var id = this.getParams().id;

		api.getRequest(id, (request) => {
			this.setState({request:request});
			this.refs.map.setRequest(request);
            this.refs.table.setRequest(request);
		});
	},

    setRequest: function (request) {
        this.setState({
            request: request
        });
    },

    render: function() {
    	if (isUndefined(this.state.request)) {return <div></div>; }
    	var request = this.state.request;

    	var statusStyle = {
    		fontSize: 18,
    	};

    	var statusColor = request.status === 'closed' ? 'green' : 'rgb(255, 153, 17)'
    	var status = request.status === 'closed' ? 'closed \u2713' : 'open';
    	var date = formatDate(new Date(request.requested_datetime));

        return (
    	<div className='container request-page'>
        	<div className='row'>
        		<h1>{request.service_name} <span className='small'>{date}</span></h1>
        	</div>
            <div className='row'>
                <span style={statusStyle}>status: <span style={{color:statusColor}}>{status}</span></span>
            </div>       
            <div className='row'>
                <div className='col-md-12'>
                    <RequestHistoryTable setRequest={this.setRequest} ref='table'></RequestHistoryTable>
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