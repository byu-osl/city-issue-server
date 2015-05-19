'use strict';
var React  = require('react');
var styles = require('styles');
var IconButton = require('IconButton.jsx')

var DescriptionSection = React.createClass({

    getInitialState: function () {
        return  {
              description: '',
              imageSrc:    '',
              imageLoaded: false,
              isValid:     undefined
        };
    },

    validate: function() {
        var isValid = this.state.description.length > 0;
        this.setState({isValid:isValid});
        return isValid;
    },

    handleChange: function () {
        if (!isUndefined(this.state.isValid)) {
            this.validate();
        }

        this.setState({description:event.target.value});
    },

    handleImage: function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onloadend = () => {
            var compressedImage;
            var preCompressed = new Image();
            preCompressed.src = reader.result;

            setTimeout(() => {
                compressedImage = compressAndResizeImage(preCompressed).src;
                this.setState({imageSrc: compressedImage});
            }, 0);

            React.findDOMNode(this.refs.preview).src = reader.result;
            this.setState({isValid:true});
            this.setState({imageLoaded: true});
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


        if (this.state.isValid === false) {
            validationState = ' has-error';
            errorStyle = styles.visible;
        }

        if (this.state.isValid === true) {
            validationState += ' has-success';
        }

        var imageContainerStyle = styles.visibleIf(this.state.imageLoaded);
        imageContainerStyle = styles.mix(imageContainerStyle, {maxWidth: '100%'});

        return (   
            <div className='form-group'>
                <div className='row'>
                    <div className={validationState + 'col-md-6'}>
                        <p style={errorStyle} className='bg-warning'>Please add a description.</p>
                        <label className='control-label'>Description</label>
                        <IconButton 
                            onClick={this.handlePictureClick}
                            icon='camera'
                            label='upload / take a picture'/>
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
                    <div style={imageContainerStyle} className="image-container col-md-6">
                        <button onClick={this.closeImage} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <img style={{maxWidth:'100%'}}ref='preview' src=''/>
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

