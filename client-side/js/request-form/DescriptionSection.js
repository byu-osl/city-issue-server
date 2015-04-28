'use strict';
var styles = require('../styles');

var DescriptionSection = React.createClass({

    validate: function() {
        var isValid = this.state.description.length > 0 || this.getImage().length > 0
        this.setState({isValid:isValid});
        return isValid;
    },

    getDescription: function () {return this.state.description},

    getInitialState: function () {
        return  {
              description: '',
              image: '',
              isValid: undefined
        };
    },

    getImage: function () {
        return React.getDOMNode(this.refs.preview).src
    },

    handleChange: function () {
        if (typeof this.state.isValid !== 'undefined') {
            this.validate();
        }

        var value = event.target.value;
        this.setState({description:event.target.value});
    },

    handlePictureClick: function () {$('.picture-input').click(); },

    handleImage: function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        var self = this;

        reader.onloadend = function() {
            React.findDOMNode(self.refs.preview).src = reader.result;
            $('button.close').show();
            self.setState({isValid:true});
        };

        reader.readAsDataURL(file); 
    },

    closeImage: function () {
        React.findDOMNode(this.refs.preview).src = '';
        $('button.close').hide();
    },

    render: function() {
        var validationState = '';

        var buttonStyle = {
            marginLeft: '10px'
        };

        if (this.state.isValid === false) {
            validationState = ' has-error';
        }

        if (this.state.isValid === true) {
            validationState += ' has-success';
         }

        return (
            <div className='form-group'>
                <div className='row'>

                    <div className={'col-md-6' + validationState}>
                        <label className='control-label'>Description</label>
                        <button 
                            style={buttonStyle}
                            className='btn btn-default btn-xs' 
                            onClick={this.handlePictureClick}>
                            <span className='glyphicon glyphicon-camera'/>
                            upload / take a picture
                        </button>
                        <input onChange={this.handleImage} className='picture-input' type="file" accept="image/*" capture="camera"/>
                        <textarea 
                            name='description' 
                            className='form-control' 
                            value={this.state.description} 
                            onChange={this.handleChange}
                            onBlur={this.validate}
                            placeholder='Additional location details, severity, etc.'></textarea>
                    </div>
                    <div className="col-md-6 image-container">
                        <button style={styles.hidden} onClick={this.closeImage} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <img ref='preview'/>
                    </div>
                </div>
            </div>
        );
    }
}); 


module.exports = DescriptionSection;