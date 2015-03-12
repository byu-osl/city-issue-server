var api = require('./server-api');
api = new api();

var CategorySection = React.createClass({

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
            <div className='form-group'>
                <h4>Pick a Category</h4> 
                <div className='btn-group' data-toggle='buttons'>
                    {this.state.categories.map(function(category, index){
                        return (
                            <label className='btn btn-primary active' key={category.service_name} onClick={this.categoryClicked}>
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