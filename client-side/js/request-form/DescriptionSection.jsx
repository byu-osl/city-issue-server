'use strict';
var React  = require('react');

var styles = require('../styles');

var DescriptionSection = React.createClass({

    getInitialState: function () {
        return  {
              description: '',
              imageSrc: '',
              imageLoaded: false,
              isValid: undefined
        };
    },

    validate: function() {
        var isValid = this.state.description.length > 0 || this.getImage().length > 0
        this.setState({isValid:isValid});
        return isValid;
    },

    handleChange: function () {
        if (typeof this.state.isValid !== 'undefined') {
            this.validate();
        }

        var value = event.target.value;
        this.setState({description:event.target.value});
    },

    handleImage: function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        var self = this;

        reader.onloadend = function showFancyStoreUgly() {
            var compressedImage;
            var preCompressed = new Image();
            preCompressed.src = reader.result;

            setTimeout(function storeCompressed() {
                compressedImage = compressAndResizeImage(preCompressed).src;
                self.setState({imageSrc: compressedImage});
            }, 0);

            React.findDOMNode(self.refs.preview).src = reader.result;
            self.setState({isValid:true});
            self.setState({imageLoaded: true});
        };

        reader.readAsDataURL(file); 
    },

    closeImage: function () {
        React.findDOMNode(this.refs.preview).src = '';
        this.setState({imageLoaded:false});
    },
    
    handlePictureClick: function () {$('.picture-input').click()},
    getDescription: function () {return this.state.description},

    getImage: function () {
        return this.state.imageSrc;
    },

    render: function() {
        var validationState = '';
        var errorStyle = styles.hidden;

        var buttonStyle = {
            marginLeft: 10
        };

        if (this.state.isValid === false) {
            validationState = ' has-error';
            errorStyle = styles.visible;
        }

        if (this.state.isValid === true) {
            validationState += ' has-success';
        }

        var imageContainerStyle = styles.visibleIf(this.state.imageLoaded);

        return (   
            <div className='form-group'>
                <div className='row'>
                    <div className={validationState}>
                        <p style={errorStyle} className='bg-warning'>Please add an image or description.</p>
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
                            tabIndex='2'
                            placeholder='Additional location details, severity, etc.'></textarea>
                    </div>
                    <div style={imageContainerStyle} className="image-container">
                        <button onClick={this.closeImage} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <img ref='preview' src=''/>
                    </div>
                </div>
            </div>
        );
    }
}); 


module.exports = DescriptionSection;

// sourceImage: 
function compressAndResizeImage(sourceImage){
    var width = sourceImage.naturalWidth;
    var height = sourceImage.naturalHeight;
    var ratio;
    var MAX_DIMENSION = 600;
    var IMAGE_QUALITY = 0.8;

    if (width >= height && width > MAX_DIMENSION) {
        width = MAX_DIMENSION;
        ratio = width/sourceImage.naturalWidth;
        height = sourceImage.naturalHeight * ratio;
    } else if (height > width) {
        height = MAX_DIMENSION;
        ratio = height / sourceImage.naturalHeight;
        width = sourceImage.naturalWidth * ratio;
    }

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
    var newImageData = canvas.toDataURL('image/jpeg', IMAGE_QUALITY);
    var result = new Image();
    result.src = newImageData;
    return result;
}

function async(fn, cb) {
    return function() {
        setTimeout(function() {
            fn();
            cb();
        }, 0);
    }
}

