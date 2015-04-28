'use strict';

React.getDOMNode = React.findDOMNode;

var RequestForm = require('./request-form/RequestForm');
var AdminPage   = require('./admin/AdminPage.js');

var TheApp = React.createClass({

    render: function() {
        var page = $('.app-container').attr('current-page');
        switch (page) {
            case 'AdminPage':   return <AdminPage />; 
            case 'RequestForm': return <RequestForm />;
        }
    }
});


React.render(<TheApp />, $('.app-container')[0]);