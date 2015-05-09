'use strict';
var React  = require('react');

var api = require('../server-api');
var styles = require('../styles');

var CategorySection = React.createClass({

    getInitialState: function () {
        return {
            services:            [],
            selectedService:     '',
            selectedServiceName: '',
            isValid:             undefined
        };
    },

    getSelectedService:     function() {return this.state.selectedService},
    getSelectedServiceName: function() {return this.state.selectedServiceName},

    validate: function() {
        var isValid = this.state.selectedService.length > 0;
        this.setState({isValid:isValid});
        return isValid;
    },

    serviceClicked: function(event) {
        var value = $('input', event.target).val();
        var name  = $('input', event.target).attr('data-service-name');

        if (isUndefined(value)) {
            var parent = $(event.target).parent() 
            value = $('input', parent).val();
            name  = $('input', parent).attr('data-service-name');
        }

        this.setState({
            selectedService:     value,
            selectedServiceName: name,
            isValid:             true
        });
    },

    componentDidMount: function () {
        api.getServices(function gotServices(services) {
            this.setState({
                services: services
            });
        }, this);
    },
 
    render: function() {
        var errorStyle = styles.visibleIf(this.state.isValid === false);

        return (
        <div className='form-group'>
            <p style={errorStyle} className="bg-warning">Please choose a category.</p>
            <label style={styles.block} className='control-label'>Issue type:</label> 
            <div className='btn-group' data-toggle='buttons'>
                {this.state.services.map(function (service){
                    return (
                        <label className='btn btn-primary' key={service.service_name} onClick={this.serviceClicked}>
                            <input type='radio' name='options' data-service-name={service.service_name} value={service.service_code} autoComplete='off'/>{service.service_name}
                        </label>
                    );
                }, this)}
            </div>
        </div>
        );
    }
});

module.exports = CategorySection;