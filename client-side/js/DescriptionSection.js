var DescriptionSection = React.createClass({
    getDescription: function (){return this.state.description;},

    getInitialState: function () {
        return {
              description: ''
        };
    },

    handleChange: function (){
        this.setState({description:event.target.value});
    },

    render: function() {
        return (
            <div className='form-group'>
                <label>Description</label>
                <button className='btn btn-default btn-xs location-button'>
                    <span className='glyphicon glyphicon-camera'/>
                    take a picture
                </button>
                <textarea 
                    name='description' 
                    className='form-control' 
                    value={this.state.description} 
                    onChange={this.handleChange}
                    placeholder='Additional location details, severity, etc.'></textarea>
            </div>
        );
    }
}); 

module.exports = DescriptionSection;