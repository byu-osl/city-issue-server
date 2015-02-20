var RequestForm = React.createClass({
    render: function () {return (
        <div className='container'>
            <h1>Submit an issue</h1>
            <form>
                <label>Location</label>
                <input className='form-control' type='text'/>
            </form>
        </div>
    )}
});

React.render(<RequestForm />, $('.app-container')[0]);