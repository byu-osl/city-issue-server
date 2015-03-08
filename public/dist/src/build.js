(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./js/app.js":[function(require,module,exports){
'use strict';

var api = require('./server-api');
api = new api();
var LocationSection = require('./LocationSection');
var CategorySection = require('./CategorySection');
var DescriptionSection = require('./DescriptionSection');
 
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

var Category = React.createClass({displayName: "Category",
    render: function(){return(
        React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#"}, this.props.name))
    )}
})

React.render(React.createElement(RequestForm, null), $('.app-container')[0]);

},{"./CategorySection":"/home/chris/city-issue-server/public/js/CategorySection.js","./DescriptionSection":"/home/chris/city-issue-server/public/js/DescriptionSection.js","./LocationSection":"/home/chris/city-issue-server/public/js/LocationSection.js","./server-api":"/home/chris/city-issue-server/public/js/server-api.js"}],"/home/chris/city-issue-server/public/js/CategorySection.js":[function(require,module,exports){
var api = require('./server-api');
api = new api();

var CategorySection = React.createClass({displayName: "CategorySection",

    getInitialState: function () {
        return {
            categories: []
        };
    },

    loadCategories: function (categories) {
        var newElements = [];
        categories.forEach(function(category, index){
            newElements.push(React.createElement(Category, {name: category.service_name}));
        })
        debugger;
        this.setState({
            categories: newElements
        })
    },

    componentDidMount: function () {
        api.getCategories(this.loadCategories);
    },
 
    render: function() {
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement("label", null, "Category"), 
                React.createElement("div", {className: "dropdown"}, 
                    React.createElement("button", {className: "btn btn-default dropdown-toggle", type: "button", "data-toggle": "dropdown", "aria-expanded": "true"}, 
                        "other", 
                        React.createElement("span", {className: "caret"})
                    ), 
                    React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                        this.state.categories
                    )
                )
            )
        );
    }
});

var Category = React.createClass({displayName: "Category",
    render: function() {
        React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabindex: "-1", href: "#"}, this.props.name))
    }
})



module.exports = CategorySection;

},{"./server-api":"/home/chris/city-issue-server/public/js/server-api.js"}],"/home/chris/city-issue-server/public/js/DescriptionSection.js":[function(require,module,exports){
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

module.exports = DescriptionSection;

},{}],"/home/chris/city-issue-server/public/js/LocationSection.js":[function(require,module,exports){
// LocationSection of the form
module.exports = React.createClass({displayName: "exports",
    getInitialState: function () {
        return {
            location: '',
            usedDetection: false
        };
    },

    getLocation:   function () {return this.state.location; },
    getLat:        function () {return this.state.lat; },
    getLong:       function () {return this.state.long; },
    usedDetection: function () {return this.state.usedDetection; },

    setLocation: function (positionData) {
        var lat = positionData.coords.latitude;
        var long = positionData.coords.longitude;
        var output = 'latitude: ' + lat + ', longitude: ' + long;
        this.setState({location:output});
        this.setState({
            lat:lat, 
            long:long, 
            location: output,
            usedDetection: true
        });
    },

    handleLocationClick: function (event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(this.setLocation, null, {enableHighAccuracy:true});
    },

    handleChange: function (event) {
        this.setState({location:event.target.value});
    },

    render: function() {return(
        React.createElement("div", {className: "form-group"}, 
            React.createElement("div", null, 
                React.createElement("label", null, "Location"), 
                React.createElement("button", {className: "btn btn-default btn-xs location-button", onClick: this.handleLocationClick}, 
                    React.createElement("span", {className: "glyphicon glyphicon-map-marker"}), 
                    "detect my location"
                )
            ), 
            React.createElement("input", {name: "location", className: "form-control", type: "text", value: this.state.location, onChange: this.handleChange})
        )
    )}
});

},{}],"/home/chris/city-issue-server/public/js/server-api.js":[function(require,module,exports){
function ServerAPI () {}

ServerAPI.prototype.postRequest = function (data, callback) {
    $.post('/requests.json', data, callback);
}

ServerAPI.prototype.getCategories = function (callback) {
     $.get('/services.json', callback);
}

module.exports = ServerAPI;

},{}]},{},["./js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvYXBwLmpzIiwiL2hvbWUvY2hyaXMvY2l0eS1pc3N1ZS1zZXJ2ZXIvcHVibGljL2pzL0NhdGVnb3J5U2VjdGlvbi5qcyIsIi9ob21lL2NocmlzL2NpdHktaXNzdWUtc2VydmVyL3B1YmxpYy9qcy9EZXNjcmlwdGlvblNlY3Rpb24uanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvTG9jYXRpb25TZWN0aW9uLmpzIiwiL2hvbWUvY2hyaXMvY2l0eS1pc3N1ZS1zZXJ2ZXIvcHVibGljL2pzL3NlcnZlci1hcGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ25ELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ25ELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7O0FBRXpELElBQUksaUNBQWlDLDJCQUFBO0lBQ2pDLFVBQVUsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNqQyxRQUFRLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7UUFFdkIsSUFBSSxJQUFJLENBQUM7QUFDakIsUUFBUSxJQUFJLEdBQUcsQ0FBQzs7UUFFUixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNqRSxRQUFRLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUVoRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQy9DLFNBQVM7O1FBRUQsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUNaLEdBQUcsQ0FBQyxHQUFHO1lBQ1AsSUFBSSxDQUFDLElBQUk7U0FDWixFQUFFLFVBQVUsSUFBSSxDQUFDO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCLENBQUMsQ0FBQztBQUNYLEtBQUs7O0lBRUQsTUFBTSxFQUFFLFlBQVksQ0FBQztRQUNqQixvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO1lBQ0Qsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxLQUFNLENBQUEsRUFBQTtnQkFDakIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxpQkFBb0IsQ0FBQTtZQUN0QixDQUFBLEVBQUE7WUFDTixvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGNBQUEsRUFBYyxDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxVQUFZLENBQUEsRUFBQTtnQkFDdEQsb0JBQUMsZUFBZSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxVQUFVLENBQUUsQ0FBQSxFQUFBO2dCQUNqQyxvQkFBQyxrQkFBa0IsRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsYUFBYSxDQUFFLENBQUEsRUFBQTtnQkFDdkMsb0JBQUMsZUFBZSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxVQUFVLENBQUUsQ0FBQSxFQUFBO2dCQUNqQyxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLFFBQUEsRUFBUSxDQUFDLFNBQUEsRUFBUyxDQUFDLGVBQWdCLENBQVEsQ0FBQTtZQUNwRCxDQUFBO1FBQ0wsQ0FBQTtLQUNULENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQzs7QUFFSCxJQUFJLDhCQUE4Qix3QkFBQTtJQUM5QixNQUFNLEVBQUUsVUFBVSxDQUFDO1FBQ2Ysb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxjQUFlLENBQUEsRUFBQSxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLFVBQUEsRUFBVSxDQUFDLFFBQUEsRUFBUSxDQUFDLElBQUEsRUFBSSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUksQ0FBQSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBUyxDQUFLLENBQUE7S0FDL0YsQ0FBQztBQUNOLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLFdBQVcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUNyRHJELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsSUFBSSxxQ0FBcUMsK0JBQUE7O0lBRXJDLGVBQWUsRUFBRSxZQUFZO1FBQ3pCLE9BQU87WUFDSCxVQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFDO0FBQ1YsS0FBSzs7SUFFRCxjQUFjLEVBQUUsVUFBVSxVQUFVLEVBQUU7UUFDbEMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxRQUFRLEVBQUUsS0FBSyxDQUFDO1lBQ3hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxRQUFRLENBQUMsWUFBYSxDQUFFLENBQUEsQ0FBQyxDQUFDO1NBQzlELENBQUM7UUFDRixTQUFTO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLFVBQVUsRUFBRSxXQUFXO1NBQzFCLENBQUM7QUFDVixLQUFLOztJQUVELGlCQUFpQixFQUFFLFlBQVk7UUFDM0IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDL0MsS0FBSzs7SUFFRCxNQUFNLEVBQUUsV0FBVztRQUNmO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQTtnQkFDeEIsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQSxVQUFnQixDQUFBLEVBQUE7Z0JBQ3ZCLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7b0JBQ3RCLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsaUNBQUEsRUFBaUMsQ0FBQyxJQUFBLEVBQUksQ0FBQyxRQUFBLEVBQVEsQ0FBQyxhQUFBLEVBQVcsQ0FBQyxVQUFBLEVBQVUsQ0FBQyxlQUFBLEVBQWEsQ0FBQyxNQUFPLENBQUEsRUFBQTtBQUFBLHdCQUFBLE9BQUEsRUFBQTtBQUFBLHdCQUUxRyxvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLE9BQVEsQ0FBTyxDQUFBO29CQUMxQixDQUFBLEVBQUE7b0JBQ1Qsb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxlQUFBLEVBQWUsQ0FBQyxJQUFBLEVBQUksQ0FBQyxNQUFPLENBQUEsRUFBQTt3QkFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFXO29CQUN0QixDQUFBO2dCQUNILENBQUE7WUFDSixDQUFBO1VBQ1I7S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILElBQUksOEJBQThCLHdCQUFBO0lBQzlCLE1BQU0sRUFBRSxXQUFXO1FBQ2Ysb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxjQUFlLENBQUEsRUFBQSxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLFVBQUEsRUFBVSxDQUFDLFFBQUEsRUFBUSxDQUFDLElBQUEsRUFBSSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUksQ0FBQSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBUyxDQUFLLENBQUE7S0FDL0Y7QUFDTCxDQUFDLENBQUM7QUFDRjtBQUNBOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZTs7O0FDcERoQyxJQUFJLHdDQUF3QyxrQ0FBQTtBQUM1QyxJQUFJLGNBQWMsRUFBRSxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7SUFFMUQsZUFBZSxFQUFFLFlBQVk7UUFDekIsT0FBTztjQUNELFdBQVcsRUFBRSxFQUFFO1NBQ3BCLENBQUM7QUFDVixLQUFLOztJQUVELFlBQVksRUFBRSxXQUFXO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2RCxLQUFLOztJQUVELE1BQU0sRUFBRSxXQUFXLENBQUM7UUFDaEIsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQTtZQUN4QixvQkFBQSxPQUFNLEVBQUEsSUFBQyxFQUFBLGFBQW1CLENBQUEsRUFBQTtZQUMxQixvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHdDQUF5QyxDQUFBLEVBQUE7Z0JBQ3ZELG9CQUFBLE1BQUssRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsNEJBQTRCLENBQUUsQ0FBQSxFQUFBO0FBQUEsZ0JBQUEsZ0JBQUE7QUFBQSxZQUV6QyxDQUFBLEVBQUE7WUFDVCxvQkFBQSxVQUFTLEVBQUEsQ0FBQTtnQkFDTCxJQUFBLEVBQUksQ0FBQyxhQUFBLEVBQWE7Z0JBQ2xCLFNBQUEsRUFBUyxDQUFDLGNBQUEsRUFBYztnQkFDeEIsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUM7Z0JBQzlCLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxZQUFZLEVBQUM7Z0JBQzVCLFdBQUEsRUFBVyxDQUFDLDZDQUE4QyxDQUFXLENBQUE7UUFDdkUsQ0FBQTtLQUNULENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQjs7O0FDOUJuQyw4QkFBOEI7QUFDOUIsb0NBQW9DLHVCQUFBO0lBQ2hDLGVBQWUsRUFBRSxZQUFZO1FBQ3pCLE9BQU87WUFDSCxRQUFRLEVBQUUsRUFBRTtZQUNaLGFBQWEsRUFBRSxLQUFLO1NBQ3ZCLENBQUM7QUFDVixLQUFLOztJQUVELFdBQVcsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ3pELE1BQU0sU0FBUyxZQUFZLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQ3BELE9BQU8sUUFBUSxZQUFZLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pELElBQUksYUFBYSxFQUFFLFlBQVksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7O0lBRTlELFdBQVcsRUFBRSxVQUFVLFlBQVksRUFBRTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxJQUFJLE1BQU0sR0FBRyxZQUFZLEdBQUcsR0FBRyxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixHQUFHLENBQUMsR0FBRztZQUNQLElBQUksQ0FBQyxJQUFJO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUFDO0FBQ1gsS0FBSzs7SUFFRCxtQkFBbUIsRUFBRSxVQUFVLEtBQUssRUFBRTtRQUNsQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDcEcsS0FBSzs7SUFFRCxZQUFZLEVBQUUsVUFBVSxLQUFLLEVBQUU7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckQsS0FBSzs7SUFFRCxNQUFNLEVBQUUsV0FBVyxDQUFDO1FBQ2hCLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBYSxDQUFBLEVBQUE7WUFDeEIsb0JBQUEsS0FBSSxFQUFBLElBQUMsRUFBQTtnQkFDRCxvQkFBQSxPQUFNLEVBQUEsSUFBQyxFQUFBLFVBQWdCLENBQUEsRUFBQTtnQkFDdkIsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyx3Q0FBQSxFQUF3QyxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxtQkFBcUIsQ0FBQSxFQUFBO29CQUMxRixvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGdDQUFnQyxDQUFFLENBQUEsRUFBQTtBQUFBLG9CQUFBLG9CQUFBO0FBQUEsZ0JBRTdDLENBQUE7WUFDUCxDQUFBLEVBQUE7WUFDTixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLFVBQUEsRUFBVSxDQUFDLFNBQUEsRUFBUyxDQUFDLGNBQUEsRUFBYyxDQUFDLElBQUEsRUFBSSxDQUFDLE1BQUEsRUFBTSxDQUFDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLENBQUMsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLFlBQWEsQ0FBRSxDQUFBO1FBQ3BILENBQUE7S0FDVCxDQUFDO0NBQ0wsQ0FBQzs7O0FDaERGLFNBQVMsU0FBUyxJQUFJLEVBQUU7O0FBRXhCLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRTtJQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM3QyxDQUFDOztBQUVELFNBQVMsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVUsUUFBUSxFQUFFO0tBQ25ELENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkMsQ0FBQzs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXBpID0gcmVxdWlyZSgnLi9zZXJ2ZXItYXBpJyk7XG5hcGkgPSBuZXcgYXBpKCk7XG52YXIgTG9jYXRpb25TZWN0aW9uID0gcmVxdWlyZSgnLi9Mb2NhdGlvblNlY3Rpb24nKTtcbnZhciBDYXRlZ29yeVNlY3Rpb24gPSByZXF1aXJlKCcuL0NhdGVnb3J5U2VjdGlvbicpO1xudmFyIERlc2NyaXB0aW9uU2VjdGlvbiA9IHJlcXVpcmUoJy4vRGVzY3JpcHRpb25TZWN0aW9uJyk7XG4gXG52YXIgUmVxdWVzdEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgc3VibWl0Rm9ybTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gXG4gICAgICAgIHZhciBsb25nO1xuICAgICAgICB2YXIgbGF0O1xuXG4gICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHRoaXMucmVmcy5kZXNjcmlwdGlvbi5nZXREZXNjcmlwdGlvbigpO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLnJlZnMubG9jYXRpb24uZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5yZWZzLmxvY2F0aW9uLnVzZWREZXRlY3Rpb24pIHtcbiAgICAgICAgICAgIGxvbmcgPSB0aGlzLnJlZnMubG9jYXRpb24uZ2V0TG9uZygpO1xuICAgICAgICAgICAgbGF0ICA9IHRoaXMucmVmcy5sb2NhdGlvbi5nZXRMYXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwaS5wb3N0UmVxdWVzdCh7XG4gICAgICAgICAgICBsYXQ6bGF0LFxuICAgICAgICAgICAgbG9uZzpsb25nXG4gICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTYXZlZCEnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7cmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGgxPlN1Ym1pdCBhbiBpc3N1ZTwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT0ncmVxdWVzdC1mb3JtJyBvblN1Ym1pdD17dGhpcy5zdWJtaXRGb3JtfT5cbiAgICAgICAgICAgICAgICA8TG9jYXRpb25TZWN0aW9uIHJlZj0nbG9jYXRpb24nLz5cbiAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb25TZWN0aW9uIHJlZj0nZGVzY3JpcHRpb24nLz5cbiAgICAgICAgICAgICAgICA8Q2F0ZWdvcnlTZWN0aW9uIHJlZj0nY2F0ZWdvcnknLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nc3VibWl0JyBjbGFzc05hbWU9J2J0biBidG4tZmF1bHQnPjwvaW5wdXQ+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTtcblxudmFyIENhdGVnb3J5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtyZXR1cm4oXG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgcm9sZT1cIm1lbnVpdGVtXCIgdGFiSW5kZXg9XCItMVwiIGhyZWY9XCIjXCI+e3RoaXMucHJvcHMubmFtZX08L2E+PC9saT5cbiAgICApfVxufSlcblxuUmVhY3QucmVuZGVyKDxSZXF1ZXN0Rm9ybSAvPiwgJCgnLmFwcC1jb250YWluZXInKVswXSk7IiwidmFyIGFwaSA9IHJlcXVpcmUoJy4vc2VydmVyLWFwaScpO1xuYXBpID0gbmV3IGFwaSgpO1xuXG52YXIgQ2F0ZWdvcnlTZWN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYXRlZ29yaWVzOiBbXVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBsb2FkQ2F0ZWdvcmllczogZnVuY3Rpb24gKGNhdGVnb3JpZXMpIHtcbiAgICAgICAgdmFyIG5ld0VsZW1lbnRzID0gW107XG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChmdW5jdGlvbihjYXRlZ29yeSwgaW5kZXgpe1xuICAgICAgICAgICAgbmV3RWxlbWVudHMucHVzaCg8Q2F0ZWdvcnkgbmFtZT17Y2F0ZWdvcnkuc2VydmljZV9uYW1lfS8+KTtcbiAgICAgICAgfSlcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2F0ZWdvcmllczogbmV3RWxlbWVudHNcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBpLmdldENhdGVnb3JpZXModGhpcy5sb2FkQ2F0ZWdvcmllcyk7XG4gICAgfSxcbiBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbD5DYXRlZ29yeTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FyZXRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5jYXRlZ29yaWVzfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbnZhciBDYXRlZ29yeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIHJvbGU9XCJtZW51aXRlbVwiIHRhYmluZGV4PVwiLTFcIiBocmVmPVwiI1wiPnt0aGlzLnByb3BzLm5hbWV9PC9hPjwvbGk+XG4gICAgfVxufSlcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2F0ZWdvcnlTZWN0aW9uOyIsInZhciBEZXNjcmlwdGlvblNlY3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0RGVzY3JpcHRpb246IGZ1bmN0aW9uICgpe3JldHVybiB0aGlzLnN0YXRlLmRlc2NyaXB0aW9ufSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJydcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGVzY3JpcHRpb246ZXZlbnQudGFyZ2V0LnZhbHVlfSlcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtyZXR1cm4oXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb3JtLWdyb3VwJz5cbiAgICAgICAgICAgIDxsYWJlbD5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBsb2NhdGlvbi1idXR0b24nPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZ2x5cGhpY29uIGdseXBoaWNvbi1jYW1lcmEnLz5cbiAgICAgICAgICAgICAgICB0YWtlIGEgcGljdHVyZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8dGV4dGFyZWEgXG4gICAgICAgICAgICAgICAgbmFtZT0nZGVzY3JpcHRpb24nIFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5kZXNjcmlwdGlvbn0gXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdBZGRpdGlvbmFsIGxvY2F0aW9uIGRldGFpbHMsIHNldmVyaXR5LCBldGMuJz48L3RleHRhcmVhPlxuICAgICAgICA8L2Rpdj5cbiAgICApfVxufSk7IFxuXG5tb2R1bGUuZXhwb3J0cyA9IERlc2NyaXB0aW9uU2VjdGlvbjsiLCIvLyBMb2NhdGlvblNlY3Rpb24gb2YgdGhlIGZvcm1cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9jYXRpb246ICcnLFxuICAgICAgICAgICAgdXNlZERldGVjdGlvbjogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0TG9jYXRpb246ICAgZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnN0YXRlLmxvY2F0aW9uOyB9LFxuICAgIGdldExhdDogICAgICAgIGZ1bmN0aW9uICgpIHtyZXR1cm4gdGhpcy5zdGF0ZS5sYXQ7IH0sXG4gICAgZ2V0TG9uZzogICAgICAgZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnN0YXRlLmxvbmc7IH0sXG4gICAgdXNlZERldGVjdGlvbjogZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnN0YXRlLnVzZWREZXRlY3Rpb247IH0sXG5cbiAgICBzZXRMb2NhdGlvbjogZnVuY3Rpb24gKHBvc2l0aW9uRGF0YSkge1xuICAgICAgICB2YXIgbGF0ID0gcG9zaXRpb25EYXRhLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgdmFyIGxvbmcgPSBwb3NpdGlvbkRhdGEuY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgICAgdmFyIG91dHB1dCA9ICdsYXRpdHVkZTogJyArIGxhdCArICcsIGxvbmdpdHVkZTogJyArIGxvbmc7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvY2F0aW9uOm91dHB1dH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxhdDpsYXQsIFxuICAgICAgICAgICAgbG9uZzpsb25nLCBcbiAgICAgICAgICAgIGxvY2F0aW9uOiBvdXRwdXQsXG4gICAgICAgICAgICB1c2VkRGV0ZWN0aW9uOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBoYW5kbGVMb2NhdGlvbkNsaWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLnNldExvY2F0aW9uLCBudWxsLCB7ZW5hYmxlSGlnaEFjY3VyYWN5OnRydWV9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246ZXZlbnQudGFyZ2V0LnZhbHVlfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7cmV0dXJuKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9ybS1ncm91cCc+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbD5Mb2NhdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J0biBidG4tZGVmYXVsdCBidG4teHMgbG9jYXRpb24tYnV0dG9uJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUxvY2F0aW9uQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tbWFwLW1hcmtlcicvPlxuICAgICAgICAgICAgICAgICAgICBkZXRlY3QgbXkgbG9jYXRpb25cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGlucHV0IG5hbWU9J2xvY2F0aW9uJyBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdHlwZT0ndGV4dCcgdmFsdWU9e3RoaXMuc3RhdGUubG9jYXRpb259IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICApfVxufSk7IiwiZnVuY3Rpb24gU2VydmVyQVBJICgpIHt9XG5cblNlcnZlckFQSS5wcm90b3R5cGUucG9zdFJlcXVlc3QgPSBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICAkLnBvc3QoJy9yZXF1ZXN0cy5qc29uJywgZGF0YSwgY2FsbGJhY2spO1xufVxuXG5TZXJ2ZXJBUEkucHJvdG90eXBlLmdldENhdGVnb3JpZXMgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgJC5nZXQoJy9zZXJ2aWNlcy5qc29uJywgY2FsbGJhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZlckFQSTsiXX0=
