'use strict';

var api = require('../server-api');
var styles = require('../styles');

var CategorySection = React.createClass({

    getInitialState: function () {
        return {
            categories: [],
            selectedCategory: '',
            isValid: undefined
        };
    },

    validate: function() {
        var isValid = this.state.selectedCategory.length > 0;
        this.setState({isValid:isValid});
        return isValid;
    },

    categoryClicked: function(event) {
        // in case the target is the label
        var value = $('input', event.target).val();

        // it may target a span that react inserts
        if (typeof value === 'undefined') {
            var parent = $(event.target).parent() 
            value = $('input', parent).val();
        }

        this.setState({
            selectedCategory: value,
            isValid: true
        });
    },

    getSelectedCategory: function() {return this.state.selectedCategory},
 
    receivedCategories: function (categories) {
        this.setState({
            categories: categories
        });
    },

    componentDidMount: function () {
        api.getCategories(this.receivedCategories);
    },

    render: function() {
        var errorStyle = 
            this.state.isValid === false ? styles.visible : styles.hidden;

        return (
            <div className='form-group'>
                <p style={errorStyle} className="bg-warning">Please choose a category.</p>
                <label style={styles.block} className='control-label'>Pick a category:</label> 
                <div className='btn-group' data-toggle='buttons'>
                    {this.state.categories.map(function (category, index){
                        return (
                            <label className='btn btn-primary' key={category.service_name} onClick={this.categoryClicked}>
                                <input type='radio' name='options' value={category.service_code} autoComplete='off'/>{category.service_name}
                            </label>
                        );
                    }, this)}
                </div>
            </div>
        );
    }
});

module.exports = CategorySection;