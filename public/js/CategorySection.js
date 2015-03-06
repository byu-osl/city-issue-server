var api = require('./server-api');
api = new api();

var CategorySection = React.createClass({

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
            <div className='form-group'>
                <label>Category</label>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">
                        other
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        {categories}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = CategorySection;