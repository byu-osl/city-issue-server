(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./js/app.js":[function(require,module,exports){
'use strict';

var api = require('./server-api');
var LocationSection = require('./LocationSection');
var CategorySection = require('./CategorySection');
 
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

var Category = React.createClass({displayName: "Category",
    render: function(){return(
        React.createElement("li", {role: "presentation"}, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#"}, this.props.name))
    )}
})

React.render(React.createElement(RequestForm, null), $('.app-container')[0]);

///////////////////////////////


},{"./CategorySection":"/home/chris/city-issue-server/public/js/CategorySection.js","./LocationSection":"/home/chris/city-issue-server/public/js/LocationSection.js","./server-api":"/home/chris/city-issue-server/public/js/server-api.js"}],"/home/chris/city-issue-server/public/js/CategorySection.js":[function(require,module,exports){
var api = require('./server-api');
api = new api();

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
    	debugger;
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

module.exports = CategorySection;

},{"./server-api":"/home/chris/city-issue-server/public/js/server-api.js"}],"/home/chris/city-issue-server/public/js/LocationSection.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvYXBwLmpzIiwiL2hvbWUvY2hyaXMvY2l0eS1pc3N1ZS1zZXJ2ZXIvcHVibGljL2pzL0NhdGVnb3J5U2VjdGlvbi5qcyIsIi9ob21lL2NocmlzL2NpdHktaXNzdWUtc2VydmVyL3B1YmxpYy9qcy9Mb2NhdGlvblNlY3Rpb24uanMiLCIvaG9tZS9jaHJpcy9jaXR5LWlzc3VlLXNlcnZlci9wdWJsaWMvanMvc2VydmVyLWFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbEMsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDbkQsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRW5ELElBQUksaUNBQWlDLDJCQUFBOztJQUVqQyxVQUFVLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDakMsUUFBUSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBRXZCLElBQUksSUFBSSxDQUFDO0FBQ2pCLFFBQVEsSUFBSSxHQUFHLENBQUM7O1FBRVIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDakUsUUFBUSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFFaEQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDbEMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BD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Q3ZCLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsd0NBQUEsRUFBd0MsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsbUJBQXFCLENBQUEsRUFBQTtvQkFDMUYsb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxnQ0FBZ0MsQ0FBRSxDQUFBLEVBQUE7QUFBQSxvQkFBQSxvQkFBQTtBQUFBLGdCQUU3QyxDQUFBO1lBQ1AsQ0FBQSxFQUFBO1lBQ04sb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxVQUFBLEVBQVUsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFBLEVBQWMsQ0FBQyxJQUFBLEVBQUksQ0FBQyxNQUFBLEVBQU0sQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxZQUFhLENBQUUsQ0FBQTtRQUNwSCxDQUFBO0tBQ1QsQ0FBQztDQUNMLENBQUM7OztBQ2hERixTQUFTLFNBQVMsSUFBSSxFQUFFOztBQUV4QixTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLElBQUksRUFBRSxRQUFRLEVBQUU7SUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0MsQ0FBQzs7QUFFRCxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFVLFFBQVEsRUFBRTtLQUNuRCxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFwaSA9IHJlcXVpcmUoJy4vc2VydmVyLWFwaScpO1xudmFyIExvY2F0aW9uU2VjdGlvbiA9IHJlcXVpcmUoJy4vTG9jYXRpb25TZWN0aW9uJyk7XG52YXIgQ2F0ZWdvcnlTZWN0aW9uID0gcmVxdWlyZSgnLi9DYXRlZ29yeVNlY3Rpb24nKTtcbiBcbnZhciBSZXF1ZXN0Rm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuIFxuICAgICAgICB2YXIgbG9uZztcbiAgICAgICAgdmFyIGxhdDtcblxuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSB0aGlzLnJlZnMuZGVzY3JpcHRpb24uZ2V0RGVzY3JpcHRpb24oKTtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5yZWZzLmxvY2F0aW9uLmdldExvY2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVmcy5sb2NhdGlvbi51c2VkRGV0ZWN0aW9uKSB7XG4gICAgICAgICAgICBsb25nID0gdGhpcy5yZWZzLmxvY2F0aW9uLmdldExvbmcoKTtcbiAgICAgICAgICAgIGxhdCAgPSB0aGlzLnJlZnMubG9jYXRpb24uZ2V0TGF0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhcGkucG9zdFJlcXVlc3Qoe1xuICAgICAgICAgICAgbGF0OmxhdCxcbiAgICAgICAgICAgIGxvbmc6bG9uZ1xuICAgICAgICB9LCBmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2F2ZWQhJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7cmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGgxPlN1Ym1pdCBhbiBpc3N1ZTwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT0ncmVxdWVzdC1mb3JtJyBvblN1Ym1pdD17dGhpcy5zdWJtaXRGb3JtfT5cbiAgICAgICAgICAgICAgICA8TG9jYXRpb25TZWN0aW9uIHJlZj0nbG9jYXRpb24nLz5cbiAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb25TZWN0aW9uIHJlZj0nZGVzY3JpcHRpb24nLz5cbiAgICAgICAgICAgICAgICA8Q2F0ZWdvcnlTZWN0aW9uIHJlZj0nY2F0ZWdvcnknLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0nc3VibWl0JyBjbGFzc05hbWU9J2J0biBidG4tZmF1bHQnPjwvaW5wdXQ+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTtcblxudmFyIERlc2NyaXB0aW9uU2VjdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZXNjcmlwdGlvbjogZnVuY3Rpb24gKCl7cmV0dXJuIHRoaXMuc3RhdGUuZGVzY3JpcHRpb259LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJ1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uICgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkZXNjcmlwdGlvbjpldmVudC50YXJnZXQudmFsdWV9KVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge3JldHVybihcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnPlxuICAgICAgICAgICAgPGxhYmVsPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLWRlZmF1bHQgYnRuLXhzIGxvY2F0aW9uLWJ1dHRvbic+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdnbHlwaGljb24gZ2x5cGhpY29uLWNhbWVyYScvPlxuICAgICAgICAgICAgICAgIHRha2UgYSBwaWN0dXJlXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBcbiAgICAgICAgICAgICAgICBuYW1lPSdkZXNjcmlwdGlvbicgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIFxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmRlc2NyaXB0aW9ufSBcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J0FkZGl0aW9uYWwgbG9jYXRpb24gZGV0YWlscywgc2V2ZXJpdHksIGV0Yy4nPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTsgXG5cbnZhciBDYXRlZ29yeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7cmV0dXJuKFxuICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiPjxhIHJvbGU9XCJtZW51aXRlbVwiIHRhYkluZGV4PVwiLTFcIiBocmVmPVwiI1wiPnt0aGlzLnByb3BzLm5hbWV9PC9hPjwvbGk+XG4gICAgKX1cbn0pXG5cblJlYWN0LnJlbmRlcig8UmVxdWVzdEZvcm0gLz4sICQoJy5hcHAtY29udGFpbmVyJylbMF0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4iLCJ2YXIgYXBpID0gcmVxdWlyZSgnLi9zZXJ2ZXItYXBpJyk7XG5hcGkgPSBuZXcgYXBpKCk7XG5cbnZhciBDYXRlZ29yeVNlY3Rpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhdGVnb3JpZXM6IFtdICBcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgbG9hZENhdGVnb3JpZXM6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2FkZWQgY2F0ZWdvcmllczogJylcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBcdGRlYnVnZ2VyO1xuICAgICAgICBhcGkuZ2V0Q2F0ZWdvcmllcyh0aGlzLmxvYWRDYXRlZ29yaWVzKTtcbiAgICB9LFxuIFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYXRlZ29yaWVzID0ge307XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9ybS1ncm91cCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkNhdGVnb3J5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1leHBhbmRlZD1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjYXRlZ29yaWVzfVxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2F0ZWdvcnlTZWN0aW9uOyIsIi8vIExvY2F0aW9uU2VjdGlvbiBvZiB0aGUgZm9ybVxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhdGlvbjogJycsXG4gICAgICAgICAgICB1c2VkRGV0ZWN0aW9uOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRMb2NhdGlvbjogICBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUubG9jYXRpb247IH0sXG4gICAgZ2V0TGF0OiAgICAgICAgZnVuY3Rpb24gKCkge3JldHVybiB0aGlzLnN0YXRlLmxhdDsgfSxcbiAgICBnZXRMb25nOiAgICAgICBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUubG9uZzsgfSxcbiAgICB1c2VkRGV0ZWN0aW9uOiBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXMuc3RhdGUudXNlZERldGVjdGlvbjsgfSxcblxuICAgIHNldExvY2F0aW9uOiBmdW5jdGlvbiAocG9zaXRpb25EYXRhKSB7XG4gICAgICAgIHZhciBsYXQgPSBwb3NpdGlvbkRhdGEuY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9uZyA9IHBvc2l0aW9uRGF0YS5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgb3V0cHV0ID0gJ2xhdGl0dWRlOiAnICsgbGF0ICsgJywgbG9uZ2l0dWRlOiAnICsgbG9uZztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9jYXRpb246b3V0cHV0fSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGF0OmxhdCwgXG4gICAgICAgICAgICBsb25nOmxvbmcsIFxuICAgICAgICAgICAgbG9jYXRpb246IG91dHB1dCxcbiAgICAgICAgICAgIHVzZWREZXRlY3Rpb246IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGhhbmRsZUxvY2F0aW9uQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc2V0TG9jYXRpb24sIG51bGwsIHtlbmFibGVIaWdoQWNjdXJhY3k6dHJ1ZX0pO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2NhdGlvbjpldmVudC50YXJnZXQudmFsdWV9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtyZXR1cm4oXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb3JtLWdyb3VwJz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsPkxvY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1kZWZhdWx0IGJ0bi14cyBsb2NhdGlvbi1idXR0b24nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTG9jYXRpb25DbGlja30+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZ2x5cGhpY29uIGdseXBoaWNvbi1tYXAtbWFya2VyJy8+XG4gICAgICAgICAgICAgICAgICAgIGRldGVjdCBteSBsb2NhdGlvblxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgbmFtZT0nbG9jYXRpb24nIGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB0eXBlPSd0ZXh0JyB2YWx1ZT17dGhpcy5zdGF0ZS5sb2NhdGlvbn0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICl9XG59KTsiLCJmdW5jdGlvbiBTZXJ2ZXJBUEkgKCkge31cblxuU2VydmVyQVBJLnByb3RvdHlwZS5wb3N0UmVxdWVzdCA9IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICQucG9zdCgnL3JlcXVlc3RzLmpzb24nLCBkYXRhLCBjYWxsYmFjayk7XG59XG5cblNlcnZlckFQSS5wcm90b3R5cGUuZ2V0Q2F0ZWdvcmllcyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAkLmdldCgnL3NlcnZpY2VzLmpzb24nLCBjYWxsYmFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmVyQVBJOyJdfQ==
