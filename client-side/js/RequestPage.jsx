'use strict';
var React      = require('react');
var Router     = require('react-router');
var StateMixin = Router.State;
var api = require('./server-api.js');
var SingleRequestMap = require('./SingleRequestMap.jsx');

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
		}, this);
	},

    render: function() {
    	if (isUndefined(this.state.request)) {
    		return;
    	}

    	var request = this.state.request;
        return (
        	<div className='col-md-6'>
        		<h1>{request.service_name}</h1>
        		<SingleRequestMap ref='map'></SingleRequestMap>
        	</div>
        );
    }
});

module.exports = RequestPage;