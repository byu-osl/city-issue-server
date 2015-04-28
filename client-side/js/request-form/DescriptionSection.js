'use strict';

var DescriptionSection = React.createClass({

    isValid: function() {return this.state.isValid},

    getDescription: function () {return this.state.description},

    getInitialState: function () {
        return  {
              description: '',
              image: '',
              isValid: false
        };
    },

    getImage: function () {return this.state.image},

    handleChange: function () {
        var value = event.target.value;
        if (value.length === 0 && this.getImage().length === 0) {
            this.setState({isValid:false});
        } else {
            this.setState({isValid:true});
        }
        this.setState({description:event.target.value});
    },

    handlePictureClick: function () {$('.picture-input').click(); },

    handleImage: function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        var self = this;

        reader.onloadend = function() {
            React.findDOMNode(self.refs.preview).src = reader.result;
            self.state.image = reader.result;
            this.setState({isValid:true});
        };

        reader.readAsDataURL(file); 
    },

    markInvalid: function () {

    },

    render: function() {
        return (
            <div className='form-group'>
                <label>Description</label>
                <button 
                    className='btn btn-default btn-xs location-button' 
                    onClick={this.handlePictureClick}>
                    <span className='glyphicon glyphicon-camera'/>
                    take a picture
                </button>
                <input onChange={this.handleImage} className='picture-input' type="file" accept="image/*" capture="camera"/>
                <img ref='preview'/>
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