var api = require('./server-api');
api = new api();

var CategorySection = React.createClass({

    getInitialState: function () {
        return {
            categories: []
        };
    },

    loadCategories: function (categories) {
        var newElements = [];
        categories.forEach(function(category, index){
            newElements.push(<Category name={category.service_name}/>);
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
            <div className='form-group'>
                <label>Category</label>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">
                        other
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        {this.state.categories}
                    </ul>
                </div>
            </div>
        );
    }
});

var Category = React.createClass({
    render: function() {
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">{this.props.name}</a></li>
    }
})



module.exports = CategorySection;