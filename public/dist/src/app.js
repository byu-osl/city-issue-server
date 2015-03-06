'use strict';

var api = require('./server-api');
var LocationSection = require('./LocationSection');

var RequestForm = React.createClass({displayName: "RequestForm",

    submitForm: function (event) {
        event.preventDefault();
 
        var long;
        var lat;

        var description = this.refs.description.getDescription();
        var location = this.refs.location.getLocation();

        if (this.refs.location.usedDetection) {
            long = this.refs.location.getLong();
            lat  = this.refs.location.getLat();
        }

        api.postRequest({
            lat:lat,
            long:long
        }, function (data){
            console.log('Saved!');
            console.log(data);
        });
    },


    render: function () {return (
        React.createElement("div", null, 
            React.createElement("div", {className: "row"}, 
                React.createElement("h1", null, "Submit an issue")
            ), 
            React.createElement("form", {className: "request-form", onSubmit: this.submitForm}, 
                React.createElement(LocationSection, {ref: "location"}), 
                React.createElement(DescriptionSection, {ref: "description"}), 
                React.createElement(CategorySection, {ref: "category"}), 
                React.createElement("input", {type: "submit", className: "btn btn-fault"})
            )
        )
    )}
});

var DescriptionSection = React.createClass({displayName: "DescriptionSection",
    getDescription: function (){return this.state.description},

    getInitialState: function () {
        return {
              description: ''
        };
    },

    handleChange: function (){
        this.setState({description:event.target.value})
    },

    render: function() {return(
        React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, "Description"), 
            React.createElement("button", {className: "btn btn-default btn-xs location-button"}, 
                React.createElement("span", {className: "glyphicon glyphicon-camera"}), 
                "take a picture"
            ), 
            React.createElement("textarea", {
                name: "description", 
                className: "form-control", 
                value: this.state.description, 
                onChange: this.handleChange, 
                placeholder: "Additional location details, severity, etc."})
        )
    )}
});

var CategorySection = React.createClass({displayName: "CategorySection",

    getInitialState: function () {
        return {
            categories: []  
        };
    },

    loadCategories: function (data) {
        console.log('Loaded categories: ')
        console.log(data)
    },

    componentDidMount: function () {
        api.getCategories(this.loadCategories);
    },

    render: function() {
        var categories = {};
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Category"), 
                React.createElement("div", {className: "dropdown"}, 
                    React.createElement("button", {className: "btn btn-default dropdown-toggle", type: "button", "data-toggle": "dropdown", "aria-expanded": "true"}, 
                        "other", 
                        React.createElement("span", {className: "caret"})
                    ), 
                    React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                        categories
                    )
                )
            )
        );
    }
});

var Category = React.createClass({displayName: "Category",
    render: function(){return(
        React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#"}, this.props.name))
    )}
})

React.render(React.createElement(RequestForm, null), $('.app-container')[0]);

///////////////////////////////
