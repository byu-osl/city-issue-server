'use strict';
var React  = require('react');
var styles = require('styles');

var ImageInput = React.createClass({
	errors: {
		fileType: 'Sorry, you can only upload png or jpg files.',
		imageSize:'Sorry, this image is too big. Please try a smaller file.'
	},

	getInitialState: function () {
		return {
			errorStyle: styles.hidden,
			errorType: null,
		}
	},

	getDefaultProps: function () {
		return {
			validate: {
				widthMax: 5000,
				heightMax:5000
			},
			value: undefined
		}
	},

	value: function () {
		return this.state.value
	},

	reset: function () {
		this.setState({
			value: undefined
		});
		this.refs.input.files = null;
	},

	handleChange: function () {
		var reader = new FileReader();
		var imageFile = React.getDOMNode(this.refs.input).files[0];
		var image = new Image();

		reader.onload = function(file) {
			image.src = file.target.result;

			var width  = image.width;
			var height = image.height;
			var type   = imageFile.type;

			if (!(/png|jpg|jpeg/.test(type))){
				this.setState({
					errorType: 'fileType'
				}); this.state.errorType = 'fileType';
				this.reset();
			} else if (width > this.props.validate.widthMax || height > this.props.validate.heightMax) {
				this.setState({
					errorType: 'imageSize'
				}); this.state.errorType = 'imageSize';
				this.reset();
			} else {
				this.setState({
					errorType: null
				}); this.state.errorType = null;
			}

			if (this.state.errorType) {
				return;
			} else {
				this.setState({
					value: file.target.result
				});
			}

		}.bind(this)

		reader.onerror = function (){
			this.setState({
				errorType: 'fileType'
			});
		}

		reader.readAsDataURL(imageFile);
	},

    render: function() {
    	var errorStyle = styles.visibleIf(this.state.errorType)
        return (
        	<div className="form-group">
				<p style={errorStyle} className='bg-warning'>{this.errors[this.state.errorType]}</p>
				<label htmlFor="markerImage">{this.props.label}</label>
				<input onChange={this.handleChange} ref='input' type="file"/>
				<p className="help-block">{this.props.helpText}</p>
        	</div>
        );
    }
});

module.exports = ImageInput;