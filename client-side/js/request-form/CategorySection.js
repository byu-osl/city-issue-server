'use strict';

var api = require('../server-api');
api = new api();
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
        this.setState({
            selectedCategory: $('input', event.currentTarget).val(),
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
                <h4>Pick a Category</h4> 
                <div className='btn-group' data-toggle='buttons'>
                    {this.state.categories.map(function(category, index){
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