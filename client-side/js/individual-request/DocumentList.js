'use strict';
var React  = require('react');
var ToggleButton = require('ToggleButton')
var api = require('server-api');
var FileInput = require('FileInput');

var DocumentList = React.createClass({

	getInitialState: function () {
		return {
			addingADocument: false
		}
	},
	
	toggleAdding: function () {
		this.setState({
			addingADocument: !this.state.addingADocument
		});
	},

	fileAdded: function (file, event) {
		api.addDocument({
			_id: this.props.request._id,
			file: file
		}, (documentList) => {

		});
	},

    render: function() {
        return (

        	<div>
        		<h3>Documents
	        		<ToggleButton
	        			condition={this.state.addingADocument}
	        			actionText='add a document'
	        			onClick={this.toggleAdding}
	        		/>
        		</h3>
        		<FileInput
        			label='File'
        			onChange={this.fileAdded}
        		/>
        	</div>

        );
    }
});

module.exports = DocumentList;