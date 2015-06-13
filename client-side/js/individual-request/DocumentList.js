'use strict';
var React        = require('react');
var ToggleButton = require('ToggleButton')
var api          = require('server-api');
var FileInput    = require('FileInput');
var styles       = require('styles');

var DocumentList = React.createClass({

	getInitialState: function () {
		return {
			addingADocument: false,
			// Just for initialization of this component
			documentList: this.props.request.documents
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
			this.setState({
				documentList: documentList
			});
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
        		<div style={styles.visibleIf(this.state.addingADocument)}>
	        		<FileInput
	        			label='File'
	        			onChange={this.fileAdded}
	        		/>
        		</div>
        		<ul style={{paddingLeft:0}}>
        			{this.state.documentList.map(this.renderListItem)}
        		</ul>
        	</div>
        );
    },

    renderListItem: function (document) {
    	var imgStyle = styles.mix({
    		width: '100%',
    		maxWidth: 400
    	}, styles.visibleIf(['jpg','png'].indexOf(document.filetype) > -1));


    	return (
    		<li 
    			style={{
    				listStyleType: 'none',
    				marginBottom:15
    			}}
    		>
    			<a href={document.path}>
    				{document.name}
    				<br/>
	    			<img style={imgStyle} src={document.path}></img>
    			</a>
    		</li>
    	)
    },
});

module.exports = DocumentList;