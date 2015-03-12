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
        var category = this.refs.category.getSelectedCategory();

        if (this.refs.location.usedDetection) {
            long = this.refs.location.getLong();
            lat  = this.refs.location.getLat();
        }

        api.postRequest({
            lat:lat,
            long:long,
            service_code: category
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

    categoryClicked: function(event) {
        this.setState({
            selectedCategory: $('input', event.currentTarget).val()
        });
    },

    getInitialState: function () {
        return {
            categories: [],
            selectedCategory: ''
        };
    },

    getSelectedCategory: function() {return this.state.selectedCategory; },
 
    receivedCategories: function (categories) {
        this.setState({
            categories: categories
        });
    },

    componentDidMount: function () {
        api.getCategories(this.receivedCategories);
    },
 
    render: function() {
        return (
            React.createElement("div", {className: "form-group"}, 
                React.createElement("h4", null, "Pick a Category"), 
                React.createElement("div", {className: "btn-group", "data-toggle": "buttons"}, 
                    this.state.categories.map(function(category, index){
                        return (
                            React.createElement("label", {className: "btn btn-primary active", key: category.service_name, onClick: this.categoryClicked}, 
                                React.createElement("input", {type: "radio", name: "options", value: category.service_code, autoComplete: "off"}), category.service_name
                            )
                        )
                    }, this)
                )
            )
        );
    }
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvYXBwLmpzIiwiL2hvbWUvY2hyaXMvY2l0eS1pc3N1ZS1zZXJ2ZXIvcHVibGljL2pzL0NhdGVnb3J5U2VjdGlvbi5qcyIsIi9ob21lL2NocmlzL2NpdHktaXNzdWUtc2VydmVyL3B1YmxpYy9qcy9EZXNjcmlwdGlvblNlY3Rpb24uanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvTG9jYXRpb25TZWN0aW9uLmpzIiwiL2hvbWUvY2hyaXMvY2l0eS1pc3N1ZS1zZXJ2ZXIvcHVibGljL2pzL3NlcnZlci1hcGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ25ELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ25ELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7O0FBRXpELElBQUksaUNBQWlDLDJCQUFBO0lBQ2pDLFVBQVUsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNqQyxRQUFRLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7UUFFdkIsSUFBSSxJQUFJLENBQUM7QUFDakIsUUFBUSxJQUFJLEdBQUcsQ0FBQzs7UUFFUixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFD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QSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsWUFBYSxDQUFFLENBQUE7UUFDcEgsQ0FBQTtLQUNULENBQUM7Q0FDTCxDQUFDOzs7QUNoREYsU0FBUyxTQUFTLElBQUksRUFBRTs7QUFFeEIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxJQUFJLEVBQUUsUUFBUSxFQUFFO0lBQ3hELENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzdDLENBQUM7O0FBRUQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsVUFBVSxRQUFRLEVBQUU7S0FDbkQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN2QyxDQUFDOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhcGkgPSByZXF1aXJlKCcuL3NlcnZlci1hcGknKTtcbmFwaSA9IG5ldyBhcGkoKTtcbnZhciBMb2NhdGlvblNlY3Rpb24gPSByZXF1aXJlKCcuL0xvY2F0aW9uU2VjdGlvbicpO1xudmFyIENhdGVnb3J5U2VjdGlvbiA9IHJlcXVpcmUoJy4vQ2F0ZWdvcnlTZWN0aW9uJyk7XG52YXIgRGVzY3JpcHRpb25TZWN0aW9uID0gcmVxdWlyZSgnLi9EZXNjcmlwdGlvblNlY3Rpb24nKTtcbiBcbnZhciBSZXF1ZXN0Rm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiBcbiAgICAgICAgdmFyIGxvbmc7XG4gICAgICAgIHZhciBsYXQ7XG5cbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpcy5yZWZzLmRlc2NyaXB0aW9uLmdldERlc2NyaXB0aW9uKCk7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMucmVmcy5sb2NhdGlvbi5nZXRMb2NhdGlvbigpO1xuICAgICAgICB2YXIgY2F0ZWdvcnkgPSB0aGlzLnJlZnMuY2F0ZWdvcnkuZ2V0U2VsZWN0ZWRDYXRlZ29yeSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlZnMubG9jYXRpb24udXNlZERldGVjdGlvbikge1xuICAgICAgICAgICAgbG9uZyA9IHRoaXMucmVmcy5sb2NhdGlvbi5nZXRMb25nKCk7XG4gICAgICAgICAgICBsYXQgID0gdGhpcy5yZWZzLmxvY2F0aW9uLmdldExhdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBpLnBvc3RSZXF1ZXN0KHtcbiAgICAgICAgICAgIGxhdDpsYXQsXG4gICAgICAgICAgICBsb25nOmxvbmcsXG4gICAgICAgICAgICBzZXJ2aWNlX2NvZGU6IGNhdGVnb3J5XG4gICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTYXZlZCEnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7cmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGgxPlN1Ym1pdCBhbiBpc3N1ZTwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT0ncmVxdWVzdC1mb3JtJyBvblN1Ym1pdD17dGhpcy5zdWJtaXRGb3JtfT5cbiAgICAgICAgICAgICAgICA8TG9jYXRpb25TZWN0aW9uIHJlZj0nbG9jYXRpb24nLz5cbiAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb25TZWN0aW9uIHJlZj0nZGVzY3JpcHRpb24nLz5cbiAgICAgICAgICAgICAgICA8Q2F0ZWdvcnlTZWN0aW9uIHJlZj0nY2F0ZWdvcnknLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nc3VibWl0JyBjbGFzc05hbWU9J2J0biBidG4tZmF1bHQnPjwvaW5wdXQ+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTtcblxudmFyIENhdGVnb3J5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtyZXR1cm4oXG4gICAgICAgIDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCI+PGEgcm9sZT1cIm1lbnVpdGVtXCIgdGFiSW5kZXg9XCItMVwiIGhyZWY9XCIjXCI+e3RoaXMucHJvcHMubmFtZX08L2E+PC9saT5cbiAgICApfVxufSlcblxuUmVhY3QucmVuZGVyKDxSZXF1ZXN0Rm9ybSAvPiwgJCgnLmFwcC1jb250YWluZXInKVswXSk7IiwidmFyIGFwaSA9IHJlcXVpcmUoJy4vc2VydmVyLWFwaScpO1xuYXBpID0gbmV3IGFwaSgpO1xuXG52YXIgQ2F0ZWdvcnlTZWN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gICAgY2F0ZWdvcnlDbGlja2VkOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkQ2F0ZWdvcnk6ICQoJ2lucHV0JywgZXZlbnQuY3VycmVudFRhcmdldCkudmFsKClcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2F0ZWdvcmllczogW10sXG4gICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5OiAnJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRTZWxlY3RlZENhdGVnb3J5OiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3RlZENhdGVnb3J5OyB9LFxuIFxuICAgIHJlY2VpdmVkQ2F0ZWdvcmllczogZnVuY3Rpb24gKGNhdGVnb3JpZXMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjYXRlZ29yaWVzOiBjYXRlZ29yaWVzXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBhcGkuZ2V0Q2F0ZWdvcmllcyh0aGlzLnJlY2VpdmVkQ2F0ZWdvcmllcyk7XG4gICAgfSxcbiBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGg0PlBpY2sgYSBDYXRlZ29yeTwvaDQ+IFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCIgZGF0YS10b2dnbGU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmNhdGVnb3JpZXMubWFwKGZ1bmN0aW9uKGNhdGVnb3J5LCBpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlXCIga2V5PXtjYXRlZ29yeS5zZXJ2aWNlX25hbWV9IG9uQ2xpY2s9e3RoaXMuY2F0ZWdvcnlDbGlja2VkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJvcHRpb25zXCIgdmFsdWU9e2NhdGVnb3J5LnNlcnZpY2VfY29kZX0gYXV0b0NvbXBsZXRlPVwib2ZmXCIvPntjYXRlZ29yeS5zZXJ2aWNlX25hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXRlZ29yeVNlY3Rpb247IiwidmFyIERlc2NyaXB0aW9uU2VjdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZXNjcmlwdGlvbjogZnVuY3Rpb24gKCl7cmV0dXJuIHRoaXMuc3RhdGUuZGVzY3JpcHRpb259LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uICgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkZXNjcmlwdGlvbjpldmVudC50YXJnZXQudmFsdWV9KVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge3JldHVybihcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnPlxuICAgICAgICAgICAgPGxhYmVsPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGxvY2F0aW9uLWJ1dHRvbic+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdnbHlwaGljb24gZ2x5cGhpY29uLWNhbWVyYScvPlxuICAgICAgICAgICAgICAgIHRha2UgYSBwaWN0dXJlXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBcbiAgICAgICAgICAgICAgICBuYW1lPSdkZXNjcmlwdGlvbicgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIFxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRlc2NyaXB0aW9ufSBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J0FkZGl0aW9uYWwgbG9jYXRpb24gZGV0YWlscywgc2V2ZXJpdHksIGV0Yy4nPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTsgXG5cbm1vZHVsZS5leHBvcnRzID0gRGVzY3JpcHRpb25TZWN0aW9uOyIsIi8vIExvY2F0aW9uU2VjdGlvbiBvZiB0aGUgZm9ybVxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhdGlvbjogJycsXG4gICAgICAgICAgICB1c2VkRGV0ZWN0aW9uOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRMb2NhdGlvbjogICBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUubG9jYXRpb247IH0sXG4gICAgZ2V0TGF0OiAgICAgICAgZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnN0YXRlLmxhdDsgfSxcbiAgICBnZXRMb25nOiAgICAgICBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUubG9uZzsgfSxcbiAgICB1c2VkRGV0ZWN0aW9uOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUudXNlZERldGVjdGlvbjsgfSxcblxuICAgIHNldExvY2F0aW9uOiBmdW5jdGlvbiAocG9zaXRpb25EYXRhKSB7XG4gICAgICAgIHZhciBsYXQgPSBwb3NpdGlvbkRhdGEuY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9uZyA9IHBvc2l0aW9uRGF0YS5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgb3V0cHV0ID0gJ2xhdGl0dWRlOiAnICsgbGF0ICsgJywgbG9uZ2l0dWRlOiAnICsgbG9uZztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246b3V0cHV0fSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGF0OmxhdCwgXG4gICAgICAgICAgICBsb25nOmxvbmcsIFxuICAgICAgICAgICAgbG9jYXRpb246IG91dHB1dCxcbiAgICAgICAgICAgIHVzZWREZXRlY3Rpb246IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUxvY2F0aW9uQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc2V0TG9jYXRpb24sIG51bGwsIHtlbmFibGVIaWdoQWNjdXJhY3k6dHJ1ZX0pO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjpldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtyZXR1cm4oXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb3JtLWdyb3VwJz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkxvY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBsb2NhdGlvbi1idXR0b24nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTG9jYXRpb25DbGlja30+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZ2x5cGhpY29uIGdseXBoaWNvbi1tYXAtbWFya2VyJy8+XG4gICAgICAgICAgICAgICAgICAgIGRldGVjdCBteSBsb2NhdGlvblxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgbmFtZT0nbG9jYXRpb24nIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB0eXBlPSd0ZXh0JyB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhdGlvbn0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTsiLCJmdW5jdGlvbiBTZXJ2ZXJBUEkgKCkge31cblxuU2VydmVyQVBJLnByb3RvdHlwZS5wb3N0UmVxdWVzdCA9IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICQucG9zdCgnL3JlcXVlc3RzLmpzb24nLCBkYXRhLCBjYWxsYmFjayk7XG59XG5cblNlcnZlckFQSS5wcm90b3R5cGUuZ2V0Q2F0ZWdvcmllcyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAkLmdldCgnL3NlcnZpY2VzLmpzb24nLCBjYWxsYmFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmVyQVBJOyJdfQ==
