var Name = require('./Name.jsx');
var Email = require('./Email.jsx');
var Password = require('./Password.jsx');
var Phone = require('./Phone.jsx');
var styles = require('../styles.js');
var _ = require('../_.js');

var ContactInfo = React.createClass({

	getInitialState: function () {
		return {
			contactMethod: 'none',
			creatingAccount: false
		}
	},

	getEmail: function () {return this.refs.email.getEmail(); },
	getPhoneNumber: function () {return this.refs.phone.getPhoneNumber();},
	getName: function () {return this.refs.name.getName();},
	getPassword: function () {return this.refs.password.getPassword();},

    toggleAccountCreation: function () {
        this.setState({creatingAccount:!this.state.creatingAccount});
    },

    optionChanged: function () {
    	// in case the target is the label
    	var value = $('input', event.target).val();
    	// it may target a span that react inserts
    	if (typeof value === 'undefined') {
    		var parent = $(event.target).parent() 
			value = $('input', parent).val();
    	}
    	this.setState({contactMethod: value});
    },

	render: function () {
		var nameStyle, passwordStyle, emailStyle, phoneStyle, autofocus;

		passwordStyle = 
			this.state.creatingAccount === true ? styles.visible : styles.hidden;

		var contactForms = [];

		if (this.state.contactMethod !== 'none') {
			nameStyle = styles.visible;
		} else {
			nameStyle = styles.hidden;
		}

		nameStyle = this.state.contactMethod === 'none' ? 
			styles.hidden : styles.visible;
		emailStyle = this.state.contactMethod === 'email' ? 
			styles.visible : styles.hidden;
		phoneStyle = this.state.contactMethod === 'text' || this.state.contactMethod === 'phone' ?
			styles.visible : styles.hidden;
			 

		return (
			<div>
				<label style={styles.block} className='control-label'>Keep me updated:</label>
				<div style={styles.spaceBelow} className='btn-group' data-toggle='buttons'>
					<label onClick={this.optionChanged} value='none' htmlFor='none' className='btn btn-primary active'>
						No thanks
						<input type='radio' value='none' />
					</label>
					<label onClick={this.optionChanged} value='email' htmlFor='email' className='btn btn-primary'>
						Email
						<input type='radio' value='email' />
					</label>
					<label onClick={this.optionChanged} value='text' htmlFor='text' className='btn btn-primary'>
						Text/SMS
						<input type='radio' value='text' />
					</label>
					<label onClick={this.optionChanged} value='phone' htmlFor='phone' className='btn btn-primary'>Phone call
						<input type='radio' value='phone' />
					</label>
				</div>
				<Name ref='name' style={nameStyle}></Name>
				<Email ref='email' style={emailStyle}></Email>
				<Phone ref='phone' style={phoneStyle}></Phone>
				<div style={nameStyle} class='checkbox'>
                    <label>
                        <input type='checkbox' onChange={this.toggleAccountCreation}/> Create an account <span className="small">(save your information for the next time you submit an issue)</span>
                    </label>
                </div>
                <Password style={passwordStyle} ref='password'/>

			</div>
		)
	},
});

module.exports = ContactInfo;