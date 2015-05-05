'use strict';
var React  = require('react');

// When the props say that there is a user, set the appropriate

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

	getContactMethod: function () {return this.state.contactMethod},
	getEmail:         function () {return this.refs.email.getEmail()},
	getPhoneNumber:   function () {return this.refs.phone.getPhoneNumber()},
	getName:          function () {return this.refs.name.getName()},
	getPassword:      function () {return this.refs.password.getPassword()},

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

    componentWillReceiveProps: function (newProps) {
    	if (typeof newProps.user.contact_method !== 'undefined') {
	    	this.setState({
	    		contactMethod: newProps.user.contact_method
	    	});
    	}
    },

	render: function () {
		var nameStyle, passwordStyle, emailStyle, phoneStyle, accountCreationStyle, autofocus;
		var contactForms = [];

		passwordStyle = styles.visibleIf(this.state.creatingAccount === true);
		nameStyle  = styles.hiddenIf(this.state.contactMethod === 'none');
		emailStyle = styles.visibleIf(this.state.contactMethod === 'email');
		phoneStyle = styles.visibleIf(this.state.contactMethod === 'text' || this.state.contactMethod === 'phone');
		if (this.state.contactMethod === 'none') {
			accountCreationStyle = styles.hidden;
		} else  {
			accountCreationStyle = styles.hiddenIf(this.props.user.loggedIn);
		}

		var activeClass = 'btn btn-primary active';
		var inactiveClass = 'btn btn-primary';
			 
		return (
			<div>
				<label style={styles.block} className='control-label'>Keep me updated:</label>
				<div style={styles.spaceBelow} className='btn-group' data-toggle='buttons'>
					<label onClick={this.optionChanged} value='none' htmlFor='none' className={this.state.contactMethod === 'none' ? activeClass : inactiveClass}>
						No thanks
						<input type='radio' value='none' />
					</label>
					<label onClick={this.optionChanged} value='email' htmlFor='email' className={this.state.contactMethod === 'email' ? activeClass : inactiveClass}>
						Email
						<input type='radio' value='email' />
					</label>
					<label onClick={this.optionChanged} value='text' htmlFor='text' className={this.state.contactMethod === 'text' ? activeClass : inactiveClass}>
						Text/SMS
						<input type='radio' value='text' />
					</label>
					<label onClick={this.optionChanged} value='phone' htmlFor='phone' className={this.state.contactMethod === 'phone' ? activeClass : inactiveClass}>Phone call
						<input type='radio' value='phone' />
					</label>
				</div>
				<Name  value={this.props.user.name}  ref='name'  style={nameStyle}></Name>
				<Email value={this.props.user.email} ref='email' style={emailStyle}></Email>
				<Phone value={this.props.user.phone_number} ref='phone' style={phoneStyle}></Phone>
				<div style={accountCreationStyle} className='checkbox'>
                    <label>
                        <input type='checkbox' onChange={this.toggleAccountCreation}/> Create an account <span className="small">(save your information for the next time you submit an issue)</span>
                    </label>
                </div>
                <Password creatingAccount={this.state.creatingAccount} style={passwordStyle} ref='password'/>
			</div>
		)
	},
});

module.exports = ContactInfo;