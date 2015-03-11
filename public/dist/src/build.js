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
        })
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
        })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvYXBwLmpzIiwiL2hvbWUvY2hyaXMvY2l0eS1pc3N1ZS1zZXJ2ZXIvcHVibGljL2pzL0NhdGVnb3J5U2VjdGlvbi5qcyIsIi9ob21lL2NocmlzL2NpdHktaXNzdWUtc2VydmVyL3B1YmxpYy9qcy9EZXNjcmlwdGlvblNlY3Rpb24uanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvTG9jYXRpb25TZWN0aW9uLmpzIiwiL2hvbWUvY2hyaXMvY2l0eS1pc3N1ZS1zZXJ2ZXIvcHVibGljL2pzL3NlcnZlci1hcGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ25ELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ25ELElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7O0FBRXpELElBQUksaUNBQWlDLDJCQUFBO0lBQ2pDLFVBQVUsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNqQyxRQUFRLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7UUFFdkIsSUFBSSxJQUFJLENBQUM7QUFDakIsUUFBUSxJQUFJLEdBQUcsQ0FBQzs7UUFFUixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFD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RSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxZQUFhLENBQUUsQ0FBQTtRQUNwSCxDQUFBO0tBQ1QsQ0FBQztDQUNMLENBQUM7OztBQ2hERixTQUFTLFNBQVMsSUFBSSxFQUFFOztBQUV4QixTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLElBQUksRUFBRSxRQUFRLEVBQUU7SUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0MsQ0FBQzs7QUFFRCxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFVLFFBQVEsRUFBRTtLQUNuRCxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFwaSA9IHJlcXVpcmUoJy4vc2VydmVyLWFwaScpO1xuYXBpID0gbmV3IGFwaSgpO1xudmFyIExvY2F0aW9uU2VjdGlvbiA9IHJlcXVpcmUoJy4vTG9jYXRpb25TZWN0aW9uJyk7XG52YXIgQ2F0ZWdvcnlTZWN0aW9uID0gcmVxdWlyZSgnLi9DYXRlZ29yeVNlY3Rpb24nKTtcbnZhciBEZXNjcmlwdGlvblNlY3Rpb24gPSByZXF1aXJlKCcuL0Rlc2NyaXB0aW9uU2VjdGlvbicpO1xuIFxudmFyIFJlcXVlc3RGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuIFxuICAgICAgICB2YXIgbG9uZztcbiAgICAgICAgdmFyIGxhdDtcblxuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSB0aGlzLnJlZnMuZGVzY3JpcHRpb24uZ2V0RGVzY3JpcHRpb24oKTtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5yZWZzLmxvY2F0aW9uLmdldExvY2F0aW9uKCk7XG4gICAgICAgIHZhciBjYXRlZ29yeSA9IHRoaXMucmVmcy5jYXRlZ29yeS5nZXRTZWxlY3RlZENhdGVnb3J5KCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVmcy5sb2NhdGlvbi51c2VkRGV0ZWN0aW9uKSB7XG4gICAgICAgICAgICBsb25nID0gdGhpcy5yZWZzLmxvY2F0aW9uLmdldExvbmcoKTtcbiAgICAgICAgICAgIGxhdCAgPSB0aGlzLnJlZnMubG9jYXRpb24uZ2V0TGF0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhcGkucG9zdFJlcXVlc3Qoe1xuICAgICAgICAgICAgbGF0OmxhdCxcbiAgICAgICAgICAgIGxvbmc6bG9uZyxcbiAgICAgICAgICAgIHNlcnZpY2VfY29kZTogY2F0ZWdvcnlcbiAgICAgICAgfSwgZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NhdmVkIScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtyZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8aDE+U3VibWl0IGFuIGlzc3VlPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPSdyZXF1ZXN0LWZvcm0nIG9uU3VibWl0PXt0aGlzLnN1Ym1pdEZvcm19PlxuICAgICAgICAgICAgICAgIDxMb2NhdGlvblNlY3Rpb24gcmVmPSdsb2NhdGlvbicvPlxuICAgICAgICAgICAgICAgIDxEZXNjcmlwdGlvblNlY3Rpb24gcmVmPSdkZXNjcmlwdGlvbicvPlxuICAgICAgICAgICAgICAgIDxDYXRlZ29yeVNlY3Rpb24gcmVmPSdjYXRlZ29yeScvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdzdWJtaXQnIGNsYXNzTmFtZT0nYnRuIGJ0bi1mYXVsdCc+PC9pbnB1dD5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgKX1cbn0pO1xuXG52YXIgQ2F0ZWdvcnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe3JldHVybihcbiAgICAgICAgPGxpIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YSByb2xlPVwibWVudWl0ZW1cIiB0YWJJbmRleD1cIi0xXCIgaHJlZj1cIiNcIj57dGhpcy5wcm9wcy5uYW1lfTwvYT48L2xpPlxuICAgICl9XG59KVxuXG5SZWFjdC5yZW5kZXIoPFJlcXVlc3RGb3JtIC8+LCAkKCcuYXBwLWNvbnRhaW5lcicpWzBdKTsiLCJ2YXIgYXBpID0gcmVxdWlyZSgnLi9zZXJ2ZXItYXBpJyk7XG5hcGkgPSBuZXcgYXBpKCk7XG5cbnZhciBDYXRlZ29yeVNlY3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgICBjYXRlZ29yeUNsaWNrZWQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWRDYXRlZ29yeTogJCgnaW5wdXQnLCBldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWRDYXRlZ29yeTogJydcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2V0U2VsZWN0ZWRDYXRlZ29yeTogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXMuc3RhdGUuc2VsZWN0ZWRDYXRlZ29yeTsgfSxcbiBcbiAgICByZWNlaXZlZENhdGVnb3JpZXM6IGZ1bmN0aW9uIChjYXRlZ29yaWVzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2F0ZWdvcmllczogY2F0ZWdvcmllc1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBhcGkuZ2V0Q2F0ZWdvcmllcyh0aGlzLnJlY2VpdmVkQ2F0ZWdvcmllcyk7XG4gICAgfSxcbiBcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGg0PlBpY2sgYSBDYXRlZ29yeTwvaDQ+IFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwXCIgZGF0YS10b2dnbGU9XCJidXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmNhdGVnb3JpZXMubWFwKGZ1bmN0aW9uKGNhdGVnb3J5LCBpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlXCIga2V5PXtjYXRlZ29yeS5zZXJ2aWNlX25hbWV9IG9uQ2xpY2s9e3RoaXMuY2F0ZWdvcnlDbGlja2VkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJvcHRpb25zXCIgdmFsdWU9e2NhdGVnb3J5LnNlcnZpY2VfY29kZX0gYXV0b0NvbXBsZXRlPVwib2ZmXCIvPntjYXRlZ29yeS5zZXJ2aWNlX25hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXRlZ29yeVNlY3Rpb247IiwidmFyIERlc2NyaXB0aW9uU2VjdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZXNjcmlwdGlvbjogZnVuY3Rpb24gKCl7cmV0dXJuIHRoaXMuc3RhdGUuZGVzY3JpcHRpb259LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uICgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkZXNjcmlwdGlvbjpldmVudC50YXJnZXQudmFsdWV9KVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge3JldHVybihcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnPlxuICAgICAgICAgICAgPGxhYmVsPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGxvY2F0aW9uLWJ1dHRvbic+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdnbHlwaGljb24gZ2x5cGhpY29uLWNhbWVyYScvPlxuICAgICAgICAgICAgICAgIHRha2UgYSBwaWN0dXJlXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBcbiAgICAgICAgICAgICAgICBuYW1lPSdkZXNjcmlwdGlvbicgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIFxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRlc2NyaXB0aW9ufSBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J0FkZGl0aW9uYWwgbG9jYXRpb24gZGV0YWlscywgc2V2ZXJpdHksIGV0Yy4nPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTsgXG5cbm1vZHVsZS5leHBvcnRzID0gRGVzY3JpcHRpb25TZWN0aW9uOyIsIi8vIExvY2F0aW9uU2VjdGlvbiBvZiB0aGUgZm9ybVxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhdGlvbjogJycsXG4gICAgICAgICAgICB1c2VkRGV0ZWN0aW9uOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRMb2NhdGlvbjogICBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUubG9jYXRpb247IH0sXG4gICAgZ2V0TGF0OiAgICAgICAgZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnN0YXRlLmxhdDsgfSxcbiAgICBnZXRMb25nOiAgICAgICBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUubG9uZzsgfSxcbiAgICB1c2VkRGV0ZWN0aW9uOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUudXNlZERldGVjdGlvbjsgfSxcblxuICAgIHNldExvY2F0aW9uOiBmdW5jdGlvbiAocG9zaXRpb25EYXRhKSB7XG4gICAgICAgIHZhciBsYXQgPSBwb3NpdGlvbkRhdGEuY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9uZyA9IHBvc2l0aW9uRGF0YS5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgb3V0cHV0ID0gJ2xhdGl0dWRlOiAnICsgbGF0ICsgJywgbG9uZ2l0dWRlOiAnICsgbG9uZztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246b3V0cHV0fSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGF0OmxhdCwgXG4gICAgICAgICAgICBsb25nOmxvbmcsIFxuICAgICAgICAgICAgbG9jYXRpb246IG91dHB1dCxcbiAgICAgICAgICAgIHVzZWREZXRlY3Rpb246IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUxvY2F0aW9uQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc2V0TG9jYXRpb24sIG51bGwsIHtlbmFibGVIaWdoQWNjdXJhY3k6dHJ1ZX0pO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjpldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtyZXR1cm4oXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb3JtLWdyb3VwJz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkxvY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBsb2NhdGlvbi1idXR0b24nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTG9jYXRpb25DbGlja30+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZ2x5cGhpY29uIGdseXBoaWNvbi1tYXAtbWFya2VyJy8+XG4gICAgICAgICAgICAgICAgICAgIGRldGVjdCBteSBsb2NhdGlvblxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgbmFtZT0nbG9jYXRpb24nIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB0eXBlPSd0ZXh0JyB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhdGlvbn0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTsiLCJmdW5jdGlvbiBTZXJ2ZXJBUEkgKCkge31cblxuU2VydmVyQVBJLnByb3RvdHlwZS5wb3N0UmVxdWVzdCA9IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICQucG9zdCgnL3JlcXVlc3RzLmpzb24nLCBkYXRhLCBjYWxsYmFjayk7XG59XG5cblNlcnZlckFQSS5wcm90b3R5cGUuZ2V0Q2F0ZWdvcmllcyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAkLmdldCgnL3NlcnZpY2VzLmpzb24nLCBjYWxsYmFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmVyQVBJOyJdfQ==
